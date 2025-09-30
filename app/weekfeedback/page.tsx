import WeekFeedback from "./WeekFeedBack";

export default function Page({ searchParams }: { searchParams: any }) {
	const year = searchParams?.year || "2025";
	const month = searchParams?.month || "8";
	const week = searchParams?.week || "셋째 주";

	// mockData
	const mockDays = [
		{ day: "월", trades: 123, wins: 123, losses: 123, dailyPnL: 123, new: false },
		{ day: "화", trades: 123, wins: 123, losses: 123, dailyPnL: 123, new: false },
		{ day: "수", trades: "-", wins: "-", losses: "-", dailyPnL: "-", new: false },
		{ day: "목", trades: 123, wins: 123, losses: 123, dailyPnL: 123, new: true },
		{ day: "금", trades: 123, wins: 123, losses: 123, dailyPnL: 123, new: false },
		{ day: "토", trades: 123, wins: 123, losses: 123, dailyPnL: 123, new: false },
		{ day: "일", trades: 123, wins: 123, losses: 123, dailyPnL: 123, new: false },
	];

	const mockSummary = {
		winRate: "123%",
		profitLossRatio: "123%",
		weeklyPnL: "123%",
	};

	return (
		<WeekFeedback
			year={year}
			month={month}
			week={week}
			days={mockDays}
			summary={mockSummary}
		/>
	);
}
