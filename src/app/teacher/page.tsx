import Link from "next/link";

export default function Teacher() {
	return (
		<>
			<div>
				<h1>Teacher</h1>
			</div>
			<div>
				<ul>
					<li>
						<Link href="/testmaker">Create Test</Link>
					</li>
					<li>
						<Link href="/teacher/grades">Grades</Link>
					</li>
				</ul>
			</div>
		</>
	);
}