"use client";

import React from "react";
import CustomDivider from "@/app/components/CustomDivider";

const mockData = {
	date: "2025-08-24",
	symbol: "BTCUSDT",
	holdingTime: "3시간 20분",
	screenshot: "/mock/screenshot.png",
	frames: {
		direction: "1D",
		main: "4H",
		sub: "15M",
	},
	directionResult: "O",
	trendAnalysis: "상승 추세 전환 구간 확인",
	entryPoints: [
		{ target: "지지선 돌파", grade: "A" },
		{ target: "이평선 정배열", grade: "B" },
	],
	riskTaking: 5,
	leverage: 3,
	position: "Long",
	pl: 12,
	rr: 2.4,
	review: "리스크 대비 좋은 수익. 다만 분할 익절 전략이 미흡.",
	trainerFeedback: "익절 구간 명확히 하고 분할 매도 전략을 강화하세요.",
};

export default function DayAfterView() {
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

			{/* 홀딩 시간 */}
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

			{/* 프레임 선택 */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">디렉션 프레임</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.frames.direction}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">메인 프레임</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.frames.main}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">서브 프레임</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.frames.sub}</div>
				</div>
			</div>

			<div className="flex gap-4">
				<div className="flex flex-col flex-1 gap-10">
					<p className="text-gray-300">[포지션 진입]</p>

					{/* 방향성 */}
					<div>
						<label className="block mb-1 font-medium">디렉션 프레임 방향성 유무</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.directionResult}</div>
					</div>

					{/* 추세 분석 */}
					<div>
						<label className="block mb-1 font-medium">추세 분석</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.trendAnalysis}</div>
					</div>

					{/* 진입 타점 */}
					<div>
						<label className="block mb-1 font-medium">진입 타점</label>
						<div className="flex flex-col gap-2">
							{mockData.entryPoints.map((p, i) => (
								<div key={i} className="p-2 bg-gray-100 rounded">
									{p.target} ({p.grade})
								</div>
							))}
						</div>
					</div>

					{/* 리스크 테이킹 / 레버리지 */}
					<div>
						<label className="block mb-1 font-medium">리스크 테이킹 (%)</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.riskTaking}%</div>
					</div>
					<div>
						<label className="block mb-1 font-medium">레버리지 (배점)</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.leverage}x</div>
					</div>
				</div>

				<CustomDivider variant="vertical" height="h-150" />

				{/* 결과 */}
				<div className="flex flex-col flex-1 gap-10">
					<p className="text-gray-300">[결과]</p>

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
				</div>
			</div>

			{/* 복기 */}
			<div>
				<label className="block mb-1 font-medium">매매 복기</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.review}</div>
			</div>

			{/* 트레이너 피드백 */}
			<div>
				<label className="block mb-1 font-medium">담당 트레이너 피드백 요청 사항</label>
				<div className="p-2 bg-gray-100 rounded">{mockData.trainerFeedback}</div>
			</div>
		</div>
	);
}
