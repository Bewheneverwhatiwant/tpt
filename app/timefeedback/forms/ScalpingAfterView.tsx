"use client";

import React from "react";

const mockData = {
	date: "2025-08-24",
	symbol: "BTCUSDT",
	dailyTradingCount: 12,
	risk: 5,
	leverage: 10,
	totalPositions: 15,
	totalProfitTrades: 9,
	trendAnalysis: "15분봉 기준으로 단기 상승 추세 확인됨. 이동평균선 정배열 진입.",
	trainerFeedback: "진입 횟수 조절 및 손절 구간 명확히 설정 필요.",
	screenshot: "/mock/screenshot.png",
	position: "LONG",
	pl: 7.5,
	rr: 1.2,
};

export default function ScalpingAfterView() {
	return (
		<div className="flex flex-col gap-5 text-left p-5">
			{/* 상단 */}
			<div className="flex items-center gap-3 mb-6">
				<span className="px-3 py-1 text-white rounded bg-sky-400">스켈핑</span>
				<span className="px-3 py-1 border rounded">완강</span>
			</div>

			{/* 기록 날짜 */}
			<div>
				<label className="block mb-1 font-medium">기록 날짜</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.date}</div>
			</div>

			{/* 종목 */}
			<div>
				<label className="block mb-1 font-medium">종목</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.symbol}</div>
			</div>

			{/* 하루 매매 횟수 */}
			<div>
				<label className="block mb-1 font-medium">하루 매매 횟수</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.dailyTradingCount}</div>
			</div>

			{/* 스크린샷 */}
			<div>
				<label className="block mb-1 font-medium">스크린샷</label>
				<div className="w-full h-40 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
					<img
						src={mockData.screenshot}
						alt="screenshot"
						className="object-contain w-full h-full"
					/>
				</div>
			</div>

			{/* 리스크 테이킹 */}
			<div>
				<label className="block mb-1 font-medium">리스크 테이킹 (%)</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.risk}%</div>
			</div>

			{/* 레버리지 */}
			<div>
				<label className="block mb-1 font-medium">레버리지 (배)</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.leverage}x</div>
			</div>

			{/* 총 포지션 횟수 */}
			<div>
				<label className="block mb-1 font-medium">총 포지션 잡은 횟수</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.totalPositions}</div>
			</div>

			{/* 수익 매매 횟수 */}
			<div>
				<label className="block mb-1 font-medium">총 매매횟수 대비 수익 매매횟수</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.totalProfitTrades}</div>
			</div>

			{/* 추세 분석 */}
			<div>
				<label className="block mb-1 font-medium">15분봉 기준 추세 분석</label>
				<div className="p-2 bg-gray-100 rounded whitespace-pre-line">
					{mockData.trendAnalysis}
				</div>
			</div>

			{/* 포지션 */}
			<div>
				<label className="block mb-1 font-medium">포지션</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.position}</div>
			</div>

			{/* P&L */}
			<div>
				<label className="block mb-1 font-medium">P&L</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.pl}%</div>
			</div>

			{/* R&R */}
			<div>
				<label className="block mb-1 font-medium">R&R</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.rr}</div>
			</div>

			{/* 트레이너 피드백 */}
			<div>
				<label className="block mb-1 font-medium">담당 트레이너 피드백 요청 사항</label>
				<div className="p-2 bg-gray-100 rounded whitespace-pre-line">
					{mockData.trainerFeedback}
				</div>
			</div>
		</div>
	);
}
