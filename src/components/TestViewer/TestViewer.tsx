import { ChangeEvent, useEffect, useState } from 'react';
import styles from './TestViewer.module.scss'
import PreviewQuestionItem from './PreviewQuestionItem/PreviewQuestionItem';
import { QuestionData, TestData, TestViewerMode } from '@/app/common.types';
import { fetchTestData, getQuesstionsByQId } from '@/lib/api';

interface TestViewerProps {
	mode:TestViewerMode;
	editingQuestionList?: Array<QuestionData>;
	onRemoveQuestion?:(id:string) => void
}

export const TestViewer = ({mode, editingQuestionList, onRemoveQuestion}:TestViewerProps):JSX.Element => {
	const [ testList, setTestList ] = useState<TestData[] | null>(null);
	const [ currentTest, setCurrentTest ] = useState<number>(0);
	const [ questionList, setQuestionList ] = useState<QuestionData[] | null>();
	const [ answerVisible, setAnswerVisible ] = useState<boolean>(false);
	const [ difficultyVisible, setDifficultyVisible ] = useState<boolean>(false);

	const toggleVisibility = (e:React.MouseEvent<HTMLButtonElement>) => {
		switch(e.currentTarget.name){
			case 'answer_btn':
				setAnswerVisible(!answerVisible);
				break;
			case 'diff_btn' :
				setDifficultyVisible(!difficultyVisible)
				break;
		}
		setAnswerVisible(!answerVisible);
	}
		
	const handleTestSelChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setCurrentTest(Number(event.target.value));
	};
	
	// mode control code
	useEffect(() => {
		switch(mode){
			case TestViewerMode.edit:
				if (editingQuestionList)setQuestionList(editingQuestionList);
				else throw new Error(`editingQuestionList is ${editingQuestionList}. TestViewer will not work in TestViewerMode.edit mode, without question list passed down from parent.`);
				break;
			case TestViewerMode.view:
				
				const getTests = async () => {
					const result = await fetchTestData();
					// console.log(result)
					if(result.success === 'true') setTestList(result.data);
					else alert('Failed to fetch test data. Contact admin.');
				}
				getTests();
				break;
			case TestViewerMode.test:
				break;
			default:
				throw new Error(`"${mode}" is an invalid TestViewer mode`);
				break;
		}
	},[])
	
	// this use effect is for edit mode only
	useEffect(() => {
		if(mode === TestViewerMode.edit && editingQuestionList !== undefined) setQuestionList(editingQuestionList);
	},[editingQuestionList])

	// this use effect is for view mode only
	useEffect(() => {
		if(mode !== TestViewerMode.view) return;
		if(!currentTest) return;
		if(testList) {
			const promises = testList
				.filter(test => test.test_id && currentTest === Number(test.test_id))
				.flatMap(test => test.questions.map(getQuesstionsByQId));

			Promise.all(promises).then(results => {
				const list = results
					.filter(result => result.success)
					.map(result => result.data)
					.filter((data): data is QuestionData => data !== null && data !== undefined);

				//run after all promises are resolved
				setQuestionList(list);

			});
		}
	}, [currentTest]);

	return (
		<div className={styles.previewContainer}>
			<div className={styles.previewHeader}>
				{/* <button onClick={() => {console.log(questionList)}}>test btn</button> */}
				{mode === TestViewerMode.view && 
				<span>
					<a>Select Test: </a>
					<select value={currentTest} onChange={handleTestSelChange}>
						<option value={0}>select test ID</option>
						{testList?.map((test, index) => {
							return(
								<option key={index} value={test.test_id}>{test.test_id}</option>
							)
						})}
					</select>
				</span>
				}
				<button name="answer_btn" onClick={toggleVisibility}>{`${answerVisible? 'Hide': 'Show'} Answers`}</button>
				<button name="diff_btn" onClick={toggleVisibility}>{`${answerVisible? 'Hide': 'Show'} Difficulty`}</button>
			</div>
			<div className={styles.previewContent}>
				{questionList && questionList.map((questionData, index) => {
					return(
						<PreviewQuestionItem 
							key={index}
							index={index}
							questionData={questionData}
							answerVisible={answerVisible}
							difficultyVisible={difficultyVisible}
							onRemove={onRemoveQuestion}
						/>
					)
				})}
			</div>
			
		</div>
	);
}

export default TestViewer;