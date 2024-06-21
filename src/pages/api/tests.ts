// pages/api/tests.ts
import { ResponseData } from '@/app/common.types';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Prisma.TestCreateInput | Prisma.TestMaxAggregateOutputType | Prisma.TestMaxAggregateOutputType[]>>
) {
	if (req.method === 'GET') {
		const result:Prisma.TestMaxAggregateOutputType[] = await prisma.test.findMany();
		const response: ResponseData<Prisma.TestMaxAggregateOutputType[]> = {
			success: 'true',
			message: 'Questions fetched successfully',
			data: result
			
		}
		res.status(200).json(response);
	}
	if (req.method === 'POST') {
		const { 
			questions
		 }:Prisma.TestCreateInput = req.body;
		//  console.log(questions);

		const result = await prisma.test.create({
			data: {
				questions : questions
			}
		});
		const response: ResponseData<Prisma.TestMaxAggregateOutputType> = {
			success: 'true',
			message: 'Test created successfully',
			data: result
		}
		
		res.status(200).json(response);
	}
}