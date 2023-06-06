import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { petCareValidationSchema } from 'validationSchema/pet-cares';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.pet_care
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPetCareById();
    case 'PUT':
      return updatePetCareById();
    case 'DELETE':
      return deletePetCareById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPetCareById() {
    const data = await prisma.pet_care.findFirst(convertQueryToPrismaUtil(req.query, 'pet_care'));
    return res.status(200).json(data);
  }

  async function updatePetCareById() {
    await petCareValidationSchema.validate(req.body);
    const data = await prisma.pet_care.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePetCareById() {
    const data = await prisma.pet_care.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
