'use client'

import { useEffect, useState } from "react";
import { QuestionsSelector } from "../QuestionSelector/QuestionsSelector";
import styles from "./TestMakerWrapper.module.scss";
import { TestPreview } from "../TestPreview/TestPreview";
import QuestionForm from "../QuestionForm/QuestionForm";
import { getQuestions } from "@/utils/api";


const TestMakerWrapper = (): JSX.Element => {
	const [ questionList, setQuestionList ] = useState<Array<QuestionData>>([]);
	const [ questionFormEnabled, setQuestionFormEnabled ] = useState<boolean>(false);
	const [ testQuestionList, setTestQuestionList ] = useState<Array<QuestionData>>([]);
	const handleCreateQuestionClick = () => {
		setQuestionFormEnabled(true);
	}
	
	const addToTest = (questionDataToAdd:QuestionData) => {
		questionDataToAdd.used = true;
		// console.log(questionDataToAdd.used);

		const newTestQuestions:QuestionData[] = [...testQuestionList];
		newTestQuestions.push(questionDataToAdd);
		setTestQuestionList(newTestQuestions);
	}


	const addToQuestionList = (questionDataToAdd:QuestionData, autoAdd:boolean) => {
		const updatedQuestionList:QuestionData[] = [...questionList];
		questionDataToAdd.q_id = `n${(questionList.length + 1)}`
		updatedQuestionList.push(questionDataToAdd);
		
		if(autoAdd) {
			addToTest(questionDataToAdd);
		}
		setQuestionList(updatedQuestionList);
		
		
		//api function to add to database here
		
	}

	const removeFromTest = (q_id:string) => {
		const updatedTestQuestionList: QuestionData[] = testQuestionList.filter((question) => question.q_id !== q_id);
		setTestQuestionList(updatedTestQuestionList);
		
		const updatedQuestionList:QuestionData[] = [];
		questionList.map((data) => {
			if(data.q_id !== q_id) updatedQuestionList.push(data);
			else {
				const updatedData:QuestionData = {
					...data,
					used: false
				} 
				updatedQuestionList.push(updatedData);
			}
		});
		setQuestionList(updatedQuestionList);
	}

	useEffect(() => {
		
    const fetchQuestionsData = async () => {
      setQuestionList(await getQuestions());
    };
    fetchQuestionsData();
  }, []);

	
	return (
		<div className={styles.testMakerContainer}>
			<span className={styles.editor}>
				<div className={styles.editorMenu}>
					<button onClick={handleCreateQuestionClick} disabled={questionFormEnabled}>Create Question</button>
					
				</div>
				{questionFormEnabled && 
					<QuestionForm onCloseForm={()=>{setQuestionFormEnabled(false)}} addToQuestionsData={addToQuestionList}/>
				}
				<QuestionsSelector questionList={questionList} addToTest={addToTest}/>
				
			</span>
			<span className={styles.preview}>
				<TestPreview testQuestionList={testQuestionList} onRemoveQuestion={removeFromTest}/>
			</span>
			
		</div>
	);
}

export default TestMakerWrapper;