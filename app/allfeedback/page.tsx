"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Crown } from "lucide-react";

type Feedback = {
	id: number;
	title: string;
	content: string;
	date: string;
	isCrown?: boolean;
	year: string;
	month: string;
	week: string;
	day: string;
	time: string;
};

export default function AllFeedback() {
	const [crownFeedbacks, setCrownFeedbacks] = useState<Feedback[]>([]);
	const [otherFeedbacks, setOtherFeedbacks] = useState<Feedback[]>([]);
	const router = useRouter();

	const handleNavigate = (fb: Feedback) => {
		router.push(
			`/timefeedback?year=${fb.year}&month=${fb.month}&week=${fb.week}&day=${fb.day}&time=${fb.time}&title=${encodeURIComponent(fb.title)}`
		);
	};

	// mockData (props 값 포함)
	const mockData: Feedback[] = [
		{
			id: 1,
			title: "8/24 (1) 작성 완료",
			content: "안녕하세요 트레이너님! ...",
			date: "2025.8.3.21:51",
			isCrown: true,
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "21:51:00",
		},
		{
			id: 2,
			title: "8/24 (2) 작성 완료",
			content: "이번엔 다르게 기업을 골라봤...",
			date: "2025.8.3.23:35",
			isCrown: true,
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "23:35:59",
		},
		{
			id: 3,
			title: "8/24 (2) 작성 완료",
			content: "이번엔 다르게 기업을 골라봤...",
			date: "2025.8.3.23:35",
			isCrown: true,
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "23:35:59",
		},
		{
			id: 4,
			title: "8/24 (3) 작성 완료",
			content: "또 다른 피드백입니다...",
			date: "2025.8.3.23:59",
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "23:59:59",
		},
		{
			id: 5,
			title: "8/24 (3) 작성 완료",
			content: "또 다른 피드백입니다...",
			date: "2025.8.3.23:59",
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "23:59:59",
		},
		{
			id: 6,
			title: "8/24 (3) 작성 완료",
			content: "또 다른 피드백입니다...",
			date: "2025.8.3.23:59",
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "23:59:59",
		},
		{
			id: 7,
			title: "8/24 (3) 작성 완료",
			content: "또 다른 피드백입니다...",
			date: "2025.8.3.23:59",
			year: "2025",
			month: "8",
			week: "셋째 주",
			day: "24",
			time: "23:59:59",
		},
	]

	useEffect(() => {
		const crowns = mockData.filter((f) => f.isCrown);
		const others = mockData.filter((f) => !f.isCrown);
		setCrownFeedbacks(crowns);
		setOtherFeedbacks(others);
	}, []);

	return (
		<div className="max-w-6xl mx-auto p-6 pt-20">
			<h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl mb-20 text-center">
				TPT의 실시간 트레이딩 피드백을 둘러보세요.
			</h1>

			{/* 상단 베스트 피드백 */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
				{crownFeedbacks.map((fb) => (
					<button
						key={fb.id}
						onClick={() => handleNavigate(fb)}
						className="cursor-pointer relative bg-gray-100 rounded-lg p-4 flex flex-col justify-between text-left hover:shadow-md transition-shadow"
					>
						{/* Crown 아이콘 */}
						<div className="absolute -top-3 left-4 z-10">
							<Crown size={24} className="text-yellow-500 drop-shadow-md" />
						</div>

						{/* 카드 본문 */}
						<div className="mt-4">
							<span className="font-semibold block mb-2">{fb.title}</span>
							<p className="text-sm text-gray-700 mb-4">{fb.content}</p>
							<p className="text-xs text-gray-500 text-right">{fb.date}</p>
						</div>
					</button>
				))}
			</div>

			{/* 일반 피드백 */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{otherFeedbacks.map((fb) => (
					<button
						key={fb.id}
						onClick={() => handleNavigate(fb)}
						className="cursor-pointer bg-gray-100 rounded-lg p-4 flex flex-col justify-between text-left hover:shadow-md transition-shadow"
					>
						<span className="font-semibold mb-2">{fb.title}</span>
						<p className="text-sm text-gray-700 mb-4">{fb.content}</p>
						<p className="text-xs text-gray-500 text-right">{fb.date}</p>
					</button>
				))}
			</div>
		</div>
	);
}
