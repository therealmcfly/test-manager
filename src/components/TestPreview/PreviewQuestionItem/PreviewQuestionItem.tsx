import { useEffect, useState } from 'react';
import styles from './PreviewQuestionItem.module.scss';

interface PreviewQuestionItemProps {
	questionData: QuestionData;
	onRemove:(id:string) => void;
}

export const PreviewQuestionItem = ({ questionData, onRemove }:PreviewQuestionItemProps):JSX.Element => {
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
				<div className={styles.itemTitle}>
					<span >{`Question ID : ${questionData.q_id}, `}</span>
					<span>{`Difficulty : ${questionData.difficulty}`}</span>
				</div>
				<div className={styles.itemContent}>{questionData.question}</div>
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
				{deleteButtonEnabled && <button onClick={() => onRemove(questionData.q_id)}>
					remove
				</button>}
			</span>
		</div>
	);
}

export default PreviewQuestionItem;