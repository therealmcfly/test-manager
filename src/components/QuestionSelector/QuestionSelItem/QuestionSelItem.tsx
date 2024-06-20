import { MouseEventHandler } from 'react';
import styles from './QuestionSelItem.module.scss';

interface QuestionSelItemProps {
	questionData: QuestionData;
	onAddClick: (questionData:QuestionData) => void;
}
export const QuestionsSelector = ({ questionData, onAddClick }:QuestionSelItemProps):JSX.Element => {

	const handleAddClick = () => {
		onAddClick(questionData);
	}

	return (
		<div 
			className={styles.selItem}
		>
			<span>
				<div>
					{`${questionData.source.book_name} Chapter ${questionData.source.chapter+(questionData.source.sub_chapter ? `.${questionData.source.sub_chapter}` : '')} Content ${questionData.source.content_key}`}
				</div>
				<div>{`Question ID : ${questionData.q_id}`}</div>
			</span>
			<span>
				<button onClick={handleAddClick}>add</button>
			</span>
			
		</div>
	);
}

export default QuestionsSelector;