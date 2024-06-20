import PreviewQuestionItem from './PreviewQuestionItem/PreviewQuestionItem';
import styles from './TestPreview.module.scss';

interface TestPreviewProps {
	testQuestionList: Array<QuestionData>;
	onRemoveQuestion:(id:string) => void
}

export const TestPreview = ({testQuestionList, onRemoveQuestion}:TestPreviewProps):JSX.Element => {

	return (
		<div className={styles.previewContainer}>
			<div>

			</div>
			<div>
				{testQuestionList.map((questionData, index) => {
					return(
						<PreviewQuestionItem 
							key={index}
							questionData={questionData}
							onRemove={onRemoveQuestion}
						/>
					)
				})}
			</div>
			
		</div>
	);
}

export default TestPreview;