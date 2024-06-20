import TestMakerWrapper from "../../components/TestMakerWrapper/TestMakerWrapper";
import styles from "./page.module.scss"


export default function TestMaker() {
	return (
		<div>
			<div className={styles.header}>
				TestMaker
			</div>
			
			<div className={styles.content}>
				<TestMakerWrapper />
			</div>
		</div>
	);
}