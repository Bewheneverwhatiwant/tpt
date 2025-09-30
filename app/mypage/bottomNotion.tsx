"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NotionPageButton from "../components/NotionPageButton";
import { CustomDropdownButton } from "../components/CustomDropdown";

export default function BottomNotion() {
	const router = useRouter();

	// 드롭다운 연도 옵션
	const yearOptions = ["2025", "2024", "2023"];
	const [selectedYear, setSelectedYear] = useState("2025");

	// mockData: 월간 매매일지
	const mockData = [
		{ month: 2, text: "월간 매매일지" },
		{ month: 5, text: "월간 매매일지" },
		{ month: 8, text: "월간 매매일지" },
		{ month: 12, text: "월간 매매일지" },
	];

	return (
		<div className="w-full flex flex-col items-start">
			{/* 제목 */}
			<h2 className="text-xl mb-6">월간 매매일지</h2>

			{/* 드롭다운 */}
			<div className="mb-6">
				<CustomDropdownButton
					options={yearOptions}
					defaultValue={selectedYear}
					onSelect={(value) => setSelectedYear(value)}
				/>
			</div>

			{/* 버튼 리스트 */}
			<div className="flex flex-col gap-2 w-full">
				{mockData.map((item) => (
					<NotionPageButton
						key={item.month}
						number={item.month}
						text={item.text}
						onClick={() =>
							router.push(
								`/monthfeedback?year=${selectedYear}&month=${item.month}`
							)
						}
					/>
				))}
			</div>
		</div>
	);
}
