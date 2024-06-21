// pages/api/questions.ts
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

type ResponseData<T> = {
	success: string;
	message: string;
	error_code?: string;
	data: T;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Prisma.QuestionCreateInput[] | Prisma.QuestionMaxAggregateOutputType | null>>
) {
	if (req.method === 'GET') {
		if (req.query.hasOwnProperty('q_id')) {
			const q_id = req.query["q_id"];
			const result:Prisma.QuestionMaxAggregateOutputType|null = await prisma.question.findUnique({
					where: {
					// q_id:1
					q_id: Number(q_id)
					}
			});
			let response: ResponseData<Prisma.QuestionMaxAggregateOutputType|null> = {
				success: 'true',
				message: `Question fetched successfully`,
				data: result
			}
			if(result) {
				res.status(200).json(response);
			}
			else {
				response.success = 'false';
				response.message = `q_id : ${q_id} does not exist in questions table`;
				res.status(404).json(response);
			}
		}
		else {
			const result:Prisma.QuestionCreateInput[] = await prisma.question.findMany();
			const response: ResponseData<Prisma.QuestionCreateInput[]> = {
				success: 'true',
				message: 'Questions fetched successfully',
				data: result
				
			}
			res.status(200).json(response);
		}
	}

	
	if (req.method === 'POST') {
		const { 
			difficulty,
			question,
			answer,
			choices,
		 }:Prisma.QuestionCreateInput = req.body;
		const result = await prisma.question.create({
			data: {
				difficulty,
				question,
				answer,
				choices
			}
		});
		const response: ResponseData<Prisma.QuestionCreateInput[]> = {
			success: 'true',
			message: 'Question created successfully',
			data: [result]
		}
		res.status(200).json(response);
	}
}