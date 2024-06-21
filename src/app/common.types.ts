export interface QuestionData {
	q_id: string,
	difficulty: string,
	question: string,
	choices: Array<string>,
	answer: string,
	// source: {
	// 	book_name: string,
	// 	chapter: string,
	// 	sub_chapter?: string
	// 	content_key:string
	// },
	used?:boolean
}

export interface TestData {
	test_id?: string;
	questions: Array<string>;

}


export type ResponseData<T> = {
	success: string;
	message: string;
	error_code?: string;
	data: T;
}

export enum TestManagerMode {
	create,
	view
}
export enum TestViewerMode {
	edit,
	view,
	test
}