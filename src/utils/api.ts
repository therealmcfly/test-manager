
export const getQuestions = async ():Promise<QuestionData[]> => {
	try {
		const res = await fetch('/questions.json');
		const result:QuestionData[] = await res.json();
		//wait 3 seconds
		await new Promise(resolve => setTimeout(resolve, 1000));
		return result;
	} catch (error) {
		console.error(error);
    return [];
	}
}
// export const addQuestion = async (questionDataToAdd:QuestionData):Promise<Boolean> => {
// 	try{
// 		// add questionDataToAdd to questions.json file

// 	} catch (error) {

// 	} 

// }