import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { petCareValidationSchema } from 'validationSchema/pet-cares';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPetCares();
    case 'POST':
      return createPetCare();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPetCares() {
    const data = await prisma.pet_care
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'pet_care'));
    return res.status(200).json(data);
  }

  async function createPetCare() {
    await petCareValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.pet?.length > 0) {
      const create_pet = body.pet;
      body.pet = {
        create: create_pet,
      };
    } else {
      delete body.pet;
    }
    if (body?.product?.length > 0) {
      const create_product = body.product;
      body.product = {
        create: create_product,
      };
    } else {
      delete body.product;
    }
    const data = await prisma.pet_care.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
