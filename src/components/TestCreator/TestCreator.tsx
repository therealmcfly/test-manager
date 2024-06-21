'use client'

import { useEffect, useState } from "react";
import { QuestionsSelector } from "../QuestionSelector/QuestionsSelector";
import styles from "./TestCreator.module.scss";
import { TestViewer } from "../TestViewer/TestViewer";
import QuestionForm from "../QuestionForm/QuestionForm";
import { addQuestionsToDb, addTestToDb, fetchQuestionsData } from "../../lib/api";
import { QuestionData, ResponseData, TestViewerMode } from "@/app/common.types";


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
		
		addQuestionsToDb(questionDataToAdd);
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

	const resetQUsedStates = (qListToUpdate:QuestionData[]):QuestionData[] => {
		const updatedQList = qListToUpdate.map((q) => {
			if(q.used === true) q.used = false;
			return q;
		})
		return updatedQList;
	}

	const handleCreateTestClick = async () => {
		if(testQuestionList.length === 0) {
			alert('Please add questions to the test');
			return;
		}
		
		const qIdStrArr:string[] = [];
		testQuestionList.map((q)=> {
			qIdStrArr.push(q.q_id);
		});

		const result = await addTestToDb({questions:qIdStrArr});
		if(result.success) {
			alert('Test created successfully');
			setTestQuestionList([]);
			setQuestionList(resetQUsedStates(questionList));
		}
	}

	useEffect(() => {
		const setDataToQuestionsList = async () => {
			const { data, success, message }:ResponseData<QuestionData[]> = await fetchQuestionsData();
			if (success) setQuestionList(data);
			else console.log(message);
		}
		setDataToQuestionsList();
  }, []);

	
	return (
		<div className={styles.testMakerContainer}>
			<span className={styles.editor}>
				<div className={styles.editorMenu}>
					<button onClick={handleCreateQuestionClick} disabled={questionFormEnabled}>Create Question</button>
					<button onClick={handleCreateTestClick}>Create Test</button>
					
				</div>
				{questionFormEnabled && 
					<QuestionForm onCloseForm={()=>{setQuestionFormEnabled(false)}} addToQuestionsData={addToQuestionList}/>
				}
				<QuestionsSelector questionList={questionList} addToTest={addToTest}/>
				
			</span>
			<span className={styles.preview}>
				<TestViewer mode={TestViewerMode.edit} editingQuestionList={testQuestionList} onRemoveQuestion={removeFromTest}/>
			</span>
			
		</div>
	);
}

export default TestMakerWrapper;