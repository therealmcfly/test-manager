import { useEffect, useState } from 'react';
import styles from './PreviewQuestionItem.module.scss';
import { QuestionData } from '@/app/common.types';

interface PreviewQuestionItemProps {
	index: number;
	questionData: QuestionData;
	answerVisible: boolean;
	difficultyVisible:boolean;
	onRemove?:(id:string) => void;
}

export const PreviewQuestionItem = ({ index, questionData, answerVisible,difficultyVisible, onRemove }:PreviewQuestionItemProps):JSX.Element => {
	const [ deleteButtonEnabled, setDeleteButtonEnabled ] = useState<boolean>(false);

	// useEffect(() => {
	// 	console.log(questionData.question);
	// })
	
	return (
		<div 
			className={styles.previewItemContainer}
			onMouseEnter={() => setDeleteButtonEnabled(true)}
			onMouseLeave={() => setDeleteButtonEnabled(false)}
		>
			<span>
				<div className={styles.itemHeading}>
					{/* <span >{`Question ID : ${questionData.q_id}, `}</span> */}
					{difficultyVisible && <span >{`Difficulty : ${questionData.difficulty}`}</span>}
				</div>
				<div className={styles.itemContent}>
					<a style={{ fontWeight : 600}}>
						{`Q${Number(index+1)}: ${questionData.question}`}
					</a>
					{answerVisible && <a style={{marginLeft:15, color:"blue"}}>{`Answer : ${questionData.answer}`}</a>}
					</div>
				<div className={styles.itemAnswer}>
					{
						questionData.choices.map((choice, index) => {
							return (
								<div key={index}>
									<span>{`(${String.fromCharCode(97 + index).toUpperCase()}) `}</span>
									{choice}
								</div>
							)
						})
					}
				</div>
			</span>
			<span>
				{onRemove && deleteButtonEnabled && <button onClick={() => onRemove(questionData.q_id)}>
					remove
				</button>}
			</span>
		</div>
	);
}

export default PreviewQuestionItem;