import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { customerFeedbackValidationSchema } from 'validationSchema/customer-feedbacks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.customer_feedback
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCustomerFeedbackById();
    case 'PUT':
      return updateCustomerFeedbackById();
    case 'DELETE':
      return deleteCustomerFeedbackById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCustomerFeedbackById() {
    const data = await prisma.customer_feedback.findFirst(convertQueryToPrismaUtil(req.query, 'customer_feedback'));
    return res.status(200).json(data);
  }

  async function updateCustomerFeedbackById() {
    await customerFeedbackValidationSchema.validate(req.body);
    const data = await prisma.customer_feedback.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteCustomerFeedbackById() {
    const data = await prisma.customer_feedback.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
