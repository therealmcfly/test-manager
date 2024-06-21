"use client"
import { ChangeEvent, useState } from "react";
import styles from "./page.module.scss"
import TestCreator from "@/components/TestCreator/TestCreator";
import TestViewer from "@/components/TestViewer/TestViewer";
import { TestManagerMode, TestViewerMode } from "../common.types";

export default function TestManagerPage() {
	const [ mode, setMode ] = useState<TestManagerMode>(TestManagerMode.create);

	const handleModeSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const mode = event.target.value;
    setMode(Number(mode));
	}

	return (
		<div>
			<div className={styles.header}>
				<a className={styles.logo}>Illinois Education Test Manager</a>
				<span>
					<select value={mode} onChange={handleModeSelectChange}>
						<option value={TestManagerMode.create}>create mode</option>
						<option value={TestManagerMode.view}>view mode</option>
					</select>
				</span>
			</div>
			
			<div className={styles.content}>
				{mode === TestManagerMode.create && <TestCreator />}
				{mode === TestManagerMode.view && <TestViewer mode={TestViewerMode.view}/>}
			</div>
		</div>
	);
}