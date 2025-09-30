import MonthFeedback from "./MonthFeedback";

export default function Page({ searchParams }: any) {
	const year = searchParams?.year || "2025";
	const month = searchParams?.month || "8";

	const mockData = {
		beforeMonth: `${year}년 ${parseInt(month) - 1}월`,
		nowMonth: `${year}년 ${month}월`,
		weeks: [
			{ week: "첫째 주", trades: 123, weeklyPnL: 123, new: false },
			{ week: "둘째 주", trades: "-", weeklyPnL: "-", new: false },
			{ week: "셋째 주", trades: 123, weeklyPnL: 123, new: true },
			{ week: "넷째 주", trades: 123, weeklyPnL: 123, new: false },
		],
		summary: {
			winRate: "123%",
			avgProfit: "123%",
			finalPnL: "123%",
		},
	};

	return (
		<MonthFeedback
			year={year}
			month={month}
			beforeMonth={mockData.beforeMonth}
			nowMonth={mockData.nowMonth}
			weeks={mockData.weeks}
			summary={mockData.summary}
		/>
	);
}
