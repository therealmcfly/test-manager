import { useEffect, useState } from 'react';
import styles from './QuestionForm.module.scss';
import { QuestionData } from '@/app/common.types';

interface QuestionFormInput{
	book_name:string;
	chapter:string;
	sub_chapter:string;
	content_key:string;
	difficulty:string;
	question:string;
	answer:string;
	choices:Array<string>;
}

const INITIAL_FORM:QuestionFormInput = {
	book_name:'',
	chapter:'',
	sub_chapter:'',
	content_key:'',
	difficulty:'',
	question:'',
	answer:'',
	choices:['','','','']
}

interface QuestionFormProps {
	onCloseForm: () => void;
	addToQuestionsData: (questionData:QuestionData, autoAdd:boolean) => void;
}

export const QuestionForm = ({onCloseForm, addToQuestionsData }:QuestionFormProps):JSX.Element => {
	const [ formInput, setFormInput  ] = useState<QuestionFormInput>(INITIAL_FORM);
	const [ choiceCount, setChoiceCount ] = useState<number>(INITIAL_FORM.choices.length);

	const handleInputChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value} = e.target;
		if(name === 'choice_count'){
			setChoiceCount(Number(value));
		}
		else if(name.startsWith('choice_')){
			const index = Number(name.split('_')[1]);
			setFormInput((prev) => ({
				...prev,
				choices: [...prev.choices.slice(0, index), value, ...prev.choices.slice(index+1)]
			}));
		}
		else {
			// done allow chapter and sub_chapter to be non numeric
			if(name === 'chapter' || name === 'sub_chapter'){
				if(isNaN(Number(value))){
					setFormInput((prev) => ({
						...prev,
						[name]:prev[name]
					}));
					return;
				}
			}
			setFormInput((prev) => ({
				...prev,
				[name]:value
			}));
		}
		
		
	}

	const handleCloseClick = () => {
		onCloseForm();
	}

	const handleSaveClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		const questionDataTosubmit:QuestionData = {
			q_id:'',
			difficulty:formInput.difficulty,
			question:formInput.question,
			choices:formInput.choices,
			answer:formInput.answer,
			// source:{
			// 	book_name:formInput.book_name,
			// 	chapter:formInput.chapter,
			// 	sub_chapter:formInput.sub_chapter,
			// 	content_key:formInput.content_key
			// }
		}
		const buttonName = (e.target as HTMLButtonElement).name;
		addToQuestionsData(questionDataTosubmit, (buttonName === "save_add" ? true : false));
		setFormInput(INITIAL_FORM);
		
		onCloseForm();
	}

	useEffect(() => {
		if(choiceCount > formInput.choices.length ) {
			setFormInput((prev) => ({
				...prev,
				choices: [...prev.choices, ""]
			}));
		} else {
			setFormInput((prev) => ({
        ...prev,
        choices: [...prev.choices.slice(0, choiceCount)]
    	}));
		}
	}, [choiceCount])
	
	
	return (
		<div className={styles.questionFormContainer}>
			<div className={styles.formContainer}>
				{/* <div>
					<span>{`Book : `}</span><input onChange={handleInputChange} value={formInput.book_name} name='book_name'></input>
				</div>
				<div>
					<span>{`Chapter : `}</span><input onChange={handleInputChange} value={formInput.chapter} name='chapter'></input>
				</div>
				<div>
					<span>{`Sub Chapter : `}</span><input onChange={handleInputChange} value={formInput.sub_chapter} name='sub_chapter'></input>
				</div>
				<div>
					<span>{`Content ID : `}</span><input onChange={handleInputChange} value={formInput.content_key} name='content_key'></input>
				</div> */}
				<div>
					<span>{`Difficulty : `}</span><input onChange={handleInputChange} value={formInput.difficulty} name='difficulty'></input>
				</div>
				<div>
					<span>{`Question : `}</span><textarea onChange={handleInputChange} value={formInput.question} name='question' rows={4} style={{ width: '100%' }}
					></textarea>
				</div>
				<div>
					<span>{`Answer : `}</span><input onChange={handleInputChange} value={formInput.answer} name='answer'></input>
				</div>
				{formInput.answer && 
					<div>
						<div>
							<span>{`Choice Count : `}</span><input onChange={handleInputChange} value={choiceCount} name='choice_count' type='number'></input>
						</div>
						{
							
							formInput.choices.map((_, index) => {
								return (
									<div key={index}>
										<span>{`(${String.fromCharCode(97 + index).toUpperCase()}) : `}</span><input onChange={handleInputChange} value={formInput.choices[index]} name={`choice_${index}`}></input>
									</div>
								)
							})
						}
					</div>
				}
			</div>
			<div className={styles.btnContainer}>
				<button name="save" onClick={handleSaveClick}>Save</button>
				<button name="save_add" onClick={handleSaveClick}>Save & Add</button>
				<button onClick={handleCloseClick}>Close</button>
			</div>
		</div>
	);
}

export default QuestionForm;