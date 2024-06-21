import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const INITIAL_QUESTION_DATA:Prisma.QuestionCreateInput[] = [
	{
		difficulty:"D2",
		question:"What is the capital of Nigeria?",
		answer:"Abuja",
		choices: '["Lagos","Abuja","Kano","Ibadan"]',
		// creator: {
		// 	connectOrCreate: {
		// 		where: {
		// 			userId:"teacher01"
		// 		},
		// 		create: {
		// 			userId:"teacher01",
		// 			password:"0101",
		// 			userType:"teacher",
		// 			email:"teacher01@test.com",
		// 			firstName:"01",
		// 			lastName:"teacher"
		// 		}
		// 	}
		// }
	},
	{
		difficulty:"D1",
		question:"What is the capital of France?",
		answer:"Paris",
		choices: '["London","Paris","Berlin","Madrid"]',
		// creator: {
		// 	connectOrCreate: {
		// 		where: {
		// 			userId:"teacher02"
		// 		},
		// 		create: {
		// 			userId:"teacher02",
		// 			password:"0202",
		// 			userType:"teacher",
		// 			email:"teacher02@test.com",
		// 			firstName:"02",
		// 			lastName:"teacher",
		// 		}
		// 	}
		// }
	}
]

async function main() {
  console.log("Start seeding...");
	for (const data of INITIAL_QUESTION_DATA) {
		const question = await prisma.question.create({
			data,
		})
		console.log(`Created question with id: ${question.q_id}`)
	}
	console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })