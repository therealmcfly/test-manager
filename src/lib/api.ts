import { QuestionData, ResponseData, TestData } from "@/app/common.types";
import { Prisma } from "@prisma/client";
// Question aapi functions
export const fetchQuestionsData = async ():Promise<ResponseData<QuestionData[]>> => {
	try {
		const response = await fetch('/api/questions');
		const result = await response.json();
		const { data } = result;
		const questionList:QuestionData[] = [];
		data.map((e: any) => {
			const questionData:QuestionData = {
				q_id: e.q_id,
				difficulty : e.difficulty,
				question : e.question,
				choices : JSON.parse(e.choices),
				answer : e.answer,
			} 
			questionList.push(questionData);
		})
		if(response.ok) return { success: 'true', message: 'Questions fetched successfully', data: questionList };
		else throw new Error('Failed to fetch questions');
	} catch (error) {
		// Handle error
		console.error(error);
		return { success: 'false', message: 'Failed to fetch questions', data: []}
	}
}

export const getQuesstionsByQId = async (q_id:string):Promise<ResponseData<QuestionData|null>> => {
	// fetch question by Q_id
	try {
		const response = await fetch(`/api/questions?q_id=${q_id}`);
		const result = await response.json();
		const { data } = result;
		const questionData: QuestionData = {	
			q_id: data.q_id,
			difficulty: data.difficulty,
			question: data.question,
			choices: JSON.parse(data.choices),
			answer: data.answer,
		};
		if (response.ok) return { success: 'true', message: 'Question fetched successfully', data: questionData };
		else throw new Error(result.message);
	} catch (error) {
		// Handle error
		console.error(error);
		return { success: 'false', message: 'Failed to fetch question', data: null };
	}
	
}

export const addQuestionsToDb = async (questionData:QuestionData):Promise<ResponseData<[]>> => {
	const { difficulty, question, choices, answer } = questionData;
	const questionCreateInputData:Prisma.QuestionCreateInput = {
		difficulty: difficulty,
		question: question,
		answer: answer,
		choices: JSON.stringify(choices)
	}
	try {
		const response = await fetch('/api/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(questionCreateInputData),
		});

		if (response.ok) {
			// Handle success
			const result = await response.json();
			return result;
		} else {
			// Handle error
			const result = await response.json();
			throw new Error(result.message);
		}
	} catch (error) {
		// Handle error
		console.error(error);
		return { success: 'false', message: 'Failed to add question', data: [] };
	}
}

// Test api functions
export const fetchTestData = async ():Promise<ResponseData<TestData[]>> => {
	try {
		const response = await fetch('/api/tests');
		const result = await response.json();
		const { data } = result;
		// console.log(data)
		const testList:TestData[] = [];
		data.map((e: any) => {
			const testData:TestData = {
				test_id: e.test_id,
				questions : JSON.parse(e.questions)
			} 
			testList.push(testData);
		})
		// console.log(testList);
		if(response.ok) return { success: 'true', message: 'Tests fetched successfully', data: testList };
		else throw new Error('Failed to fetch tests');
	} catch (error) {
		// Handle error
		console.error(error);
		return { success: 'false', message: 'Failed to fetch tests', data: []}
	}
}


export const addTestToDb = async (testDataToAdd:TestData):Promise<ResponseData<[]>> => {
	const { questions } = testDataToAdd;

	const testCreateInputData:Prisma.TestCreateInput = {
		questions: JSON.stringify(questions)
	}
	try {
		const response = await fetch('/api/tests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(testCreateInputData),
		});

		if (response.ok) {
			// Handle success
			const result = await response.json();
			return result;
		} else {
			// Handle error
			const result = await response.json();
			throw new Error(result.message);
		}
	} catch (error) {
		// Handle error
		console.error(error);
		return { success: 'false', message: 'Failed to add test', data: [] };
	}
}