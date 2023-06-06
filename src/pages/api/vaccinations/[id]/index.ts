import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { vaccinationValidationSchema } from 'validationSchema/vaccinations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.vaccination
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVaccinationById();
    case 'PUT':
      return updateVaccinationById();
    case 'DELETE':
      return deleteVaccinationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVaccinationById() {
    const data = await prisma.vaccination.findFirst(convertQueryToPrismaUtil(req.query, 'vaccination'));
    return res.status(200).json(data);
  }

  async function updateVaccinationById() {
    await vaccinationValidationSchema.validate(req.body);
    const data = await prisma.vaccination.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteVaccinationById() {
    const data = await prisma.vaccination.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
