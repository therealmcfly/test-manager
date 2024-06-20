import { getQuestions } from "@/utils/api";
import { useEffect, useState } from "react";
import QuestionSelItem from "./QuestionSelItem/QuestionSelItem";
import styles from "./QuestionSelector.module.scss";

interface QuestionSelectorProps {
	questionList: Array<QuestionData>;
	addToTest:(questionData:QuestionData)=>void
}

export const QuestionsSelector = ({ questionList, addToTest }:QuestionSelectorProps):JSX.Element => {
	const handleItemAddClick = (questionData: QuestionData) => {
		addToTest(questionData);
	}

	return (
		<div className={styles.questionSelectorContainer}>
			{questionList ? (
				<>
					<div className={styles.titleContainer}>
						<p>Question List</p>
					</div>
					<div>
						<span>
							{`count: ${questionList.length}`}
						</span>
					</div>
					<ul>
						{questionList.map((questionData: QuestionData) => {
							// console.log(questionData)
							if(!questionData.used) return (
								<QuestionSelItem key={questionData.q_id}
									questionData={questionData}
									onAddClick={handleItemAddClick}
								/>
							)
						}
					)}
					</ul>
				</>
			) : (
				<p>Fetching questions from server...</p>
			)}
		</div>
	);
}