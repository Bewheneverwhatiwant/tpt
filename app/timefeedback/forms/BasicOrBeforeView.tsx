"use client";

import React from "react";

const mockData = {
	date: "2025-08-24",
	symbol: "AAPL",
	holdingTime: "2시간 30분",
	screenshot: "/mock/screenshot.png", // public 폴더에 넣거나 외부 URL
	position: "Long",
	weight: "20%",
	entry: 150,
	exit: 158,
	riskTaking: 5,
	stopLoss: 145,
	takeProfit: 165,
	pl: 8,
	rr: 1.6,
	reasonEntry: "강한 추세 돌파 확인 후 진입",
	reasonExit: "목표가 근접 및 거래량 감소로 청산",
	review: "진입 타이밍은 좋았으나 분할 매도 전략이 부족했음",
};

export default function BasicOrBeforeView() {
	const gaugeMin = -3;
	const gaugeMax = 3;
	const normalized = Math.min(Math.max(mockData.pl / mockData.riskTaking, gaugeMin), gaugeMax);

	let arrowColor = "text-gray-500";
	if (normalized <= -2) arrowColor = "text-red-500";
	else if (normalized >= 2) arrowColor = "text-green-600";

	return (
		<div className="flex flex-col gap-5 text-left p-5">
			{/* 상단 */}
			<div className="flex items-center gap-3 mb-6">
				<span className="px-3 py-1 text-white rounded bg-orange-400">스윙</span>
				<span className="px-3 py-1 border rounded">완강</span>
			</div>

			{/* 날짜 */}
			<div>
				<label className="block mb-1 font-medium">기록 날짜</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.date}</div>
			</div>

			{/* 종목 */}
			<div>
				<label className="block mb-1 font-medium">종목</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.symbol}</div>
			</div>

			{/* 포지션 홀딩 시간 */}
			<div>
				<label className="block mb-1 font-medium">포지션 홀딩 시간</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.holdingTime}</div>
			</div>

			{/* 스크린샷 */}
			<div>
				<label className="block mb-1 font-medium">스크린샷</label>
				<div className="w-full h-40 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
					<img src={mockData.screenshot} alt="screenshot" className="object-contain w-full h-full" />
				</div>
			</div>

			{/* 포지션 */}
			<div>
				<label className="block mb-1 font-medium">포지션</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.position}</div>
			</div>

			{/* 비중 */}
			<div>
				<label className="block mb-1 font-medium">비중</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.weight}</div>
			</div>

			{/* Entry / Exit */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">Entry Price</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.entry}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">Exit Price</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.exit}</div>
				</div>
			</div>

			{/* 리스크 테이킹 */}
			<div>
				<label className="block mb-1 font-medium">리스크 테이킹 (%)</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.riskTaking}%</div>
			</div>

			{/* 손절 / 익절 */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">설정 손절가</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.stopLoss}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">설정 익절가</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.takeProfit}</div>
				</div>
			</div>

			{/* P&L / R&R */}
			<div>
				<label className="block mb-1 font-medium">P&L</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.pl}%</div>
			</div>
			<div>
				<label className="block mb-1 font-medium">R&R</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.rr}</div>
			</div>

			{/* 게이지 */}
			<div className="relative w-full h-20">
				<div className="absolute top-1/2 w-full border-t border-gray-300" />
				<div className="flex justify-between text-xs text-gray-500 mt-6">
					{Array.from({ length: gaugeMax - gaugeMin + 1 }, (_, i) => (
						<span key={i}>{gaugeMin + i}</span>
					))}
				</div>
				<div
					className={`absolute top-2 ${arrowColor}`}
					style={{
						left: `${((normalized - gaugeMin) / (gaugeMax - gaugeMin)) * 100}%`,
						transform: "translateX(-50%)",
					}}
				>
					▼
				</div>
				<span className="absolute left-0 top-0 text-red-500 font-semibold">Fail</span>
			</div>

			{/* 근거 및 복기 */}
			<div>
				<label className="block mb-1 font-medium">포지션 진입 근거</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.reasonEntry}</div>
			</div>
			<div>
				<label className="block mb-1 font-medium">포지션 탈출 근거</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.reasonExit}</div>
			</div>
			<div>
				<label className="block mb-1 font-medium">최종 복기</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.review}</div>
			</div>
		</div>
	);
}
