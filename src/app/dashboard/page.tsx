import Link from "next/link";

export default function DashboardPage() {
	return (
		<>
		<div>
			<h1>Student</h1>
			
		</div>
		<div>
			<ul>
				<li>
					<Link href="/Tests">Tests</Link>
				</li>
				<li>
					<Link href="/student/grades">Grades</Link>
				</li>
			</ul>
		</div>
		</>
	);
}