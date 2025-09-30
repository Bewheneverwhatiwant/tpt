"use client";

import React from "react";
import CustomDivider from "@/app/components/CustomDivider";

const mockData = {
	date: "2025-08-24",
	symbol: "ETHUSDT",
	entryDate: "2025-08-20",
	exitDate: "2025-08-22",
	screenshot: "/mock/screenshot.png",
	directionFrame: "1D",
	mainFrame: "4H",
	subFrame: "1H",
	trendAnalysis: "중기 하락 추세 속 단기 반등 패턴.",
	entryPoints: [
		{ target: "지지선 반등", grade: "A" },
		{ target: "이동평균선 돌파", grade: "B" },
		{ target: "RSI 과매도 구간", grade: "C" },
	],
	risk: 7,
	leverage: 3,
	position: "Long",
	pl: 12.5,
	rr: 1.8,
	review: "지지선 근처에서 진입은 좋았으나 익절 구간을 더 길게 가져가야 함.",
	trainerFeedback: "손절 라인 명확히, 레버리지 줄일 것.",
};

export default function SwingAfterView() {
	return (
		<div className="flex flex-col gap-5 text-left p-5">
			{/* 상단 */}
			<div className="flex items-center gap-3 mb-6">
				<span className="px-3 py-1 text-white rounded bg-orange-400">스윙</span>
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

			{/* 포지션 진입/종료 날짜 */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">포지션 진입 날짜</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.entryDate}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">포지션 종료 날짜</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.exitDate}</div>
				</div>
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

			{/* 프레임 정보 */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">디렉션 프레임</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.directionFrame}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">메인 프레임</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.mainFrame}</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">서브 프레임</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.subFrame}</div>
				</div>
			</div>

			{/* 포지션 진입 */}
			<div>
				<p className="text-gray-300">[포지션 진입]</p>
				<div className="mt-2">
					<label className="block mb-1 font-medium">추세 분석</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.trendAnalysis}</div>
				</div>

				<div className="flex flex-col gap-2 mt-4">
					{mockData.entryPoints.map((e, i) => (
						<div key={i} className="p-2 bg-gray-100 rounded text-sm">
							{e.target} - {e.grade}
						</div>
					))}
				</div>
			</div>

			{/* 리스크 & 레버리지 */}
			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">리스크 테이킹 (%)</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.risk}%</div>
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">레버리지 (배점)</label>
					<div className="p-2 bg-gray-100 rounded">{mockData.leverage}x</div>
				</div>
			</div>

			<CustomDivider variant="horizontal" />

			{/* 결과 */}
			<div>
				<p className="text-gray-300">[결과]</p>
				<div className="mt-2 flex flex-col gap-3">
					<div>
						<label className="block mb-1 font-medium">포지션</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.position}</div>
					</div>

					<div>
						<label className="block mb-1 font-medium">P&L</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.pl}%</div>
					</div>

					<div>
						<label className="block mb-1 font-medium">R&R</label>
						<div className="p-2 bg-gray-100 rounded">{mockData.rr}</div>
					</div>
				</div>
			</div>

			{/* 매매 복기 */}
			<div>
				<label className="block mb-1 font-medium">매매 복기</label>
				<div className="p-2 bg-gray-100 rounded whitespace-pre-line">
					{mockData.review}
				</div>
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
