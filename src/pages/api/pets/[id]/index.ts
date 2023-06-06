import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { petValidationSchema } from 'validationSchema/pets';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.pet
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPetById();
    case 'PUT':
      return updatePetById();
    case 'DELETE':
      return deletePetById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPetById() {
    const data = await prisma.pet.findFirst(convertQueryToPrismaUtil(req.query, 'pet'));
    return res.status(200).json(data);
  }

  async function updatePetById() {
    await petValidationSchema.validate(req.body);
    const data = await prisma.pet.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePetById() {
    const data = await prisma.pet.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
