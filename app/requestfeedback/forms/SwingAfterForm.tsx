"use client";

import { useState, useEffect } from "react";
import { User } from "@/app/types/user";
import WeekSelector from "../WeekSelector";
import { FixedModalButton } from "@/app/components/FixedModalButton";
import CustomDivider from "@/app/components/CustomDivider";
import EntryTable from "../EntryTable";

type Props = {
	onSubmit: (data: any) => void;
	currentUser: User;
	riskTaking?: number; // 기본값 5%
};

export default function SwingAfterForm({ onSubmit, currentUser, riskTaking = 5 }: Props) {
	const { investmentType, completion } = currentUser;
	const [selectedOption, setSelectedOption] = useState<string>('');

	// 진입타점 표 컴포넌트 관리용
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
	const [selected, setSelected] = useState<{ target: string; grade: string } | null>(null);
	const [selected2, setSelected2] = useState<{ target: string; grade: string } | null>(null);
	const [selected3, setSelected3] = useState<{ target: string; grade: string } | null>(null);

	// 진입타점 표 컴포넌트 관리용 
	const handleSelect1 = (data: { target: string; grade: string }) => {
		setSelected(data);
		setIsOpen(false);
	};

	const handleSelect2 = (data: { target: string; grade: string }) => {
		setSelected2(data);
		setIsOpen2(false);
	};

	const handleSelect3 = (data: { target: string; grade: string }) => {
		setSelected3(data);
		setIsOpen3(false);
	};

	const handleWeekChange = (data: { month: number; week: number }) => {
		console.log("현재 선택된 값:", data);
		// TODO: 필요하면 form 데이터에 포함해서 서버 전송
	};

	const handleSelectOption = (selectedValue: string) => {
		setSelectedOption(selectedValue);  // 선택된 값 업데이트
	};

	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [position, setPosition] = useState<"Long" | "Short" | null>(null);
	const [isPositive, setIsPositive] = useState(true);
	const [pl, setPl] = useState<number>(0); // P&L 입력값 (퍼센트)
	const [rr, setRr] = useState<number>(0); // R&R 값

	useEffect(() => {
		if (pl !== 0) {
			setRr(Number((riskTaking / Math.abs(pl)).toFixed(2)));
		} else {
			setRr(0);
		}
	}, [pl, riskTaking]);

	// 게이지 범위: -3 ~ +3
	const gaugeMin = -3;
	const gaugeMax = 3;
	const normalized = Math.min(Math.max(pl / riskTaking, gaugeMin), gaugeMax);

	// 화살표 색상 조건
	let arrowColor = "text-gray-500";
	if (normalized <= -2) arrowColor = "text-red-500";
	else if (normalized >= 2) arrowColor = "text-green-600";

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const imageUrl = URL.createObjectURL(file);
			setScreenshot(imageUrl);
		}
	};

	const handleUploadClick = () => {
		document.getElementById("screenshotInput")?.click();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = {
			screenshot,
			position,
			pl: isPositive ? pl : -pl,
			rr,
		};
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">

			{/* 상단: 투자유형, 완강여부, (스윙일 때 주차 선택) */}
			<div className="flex items-center gap-3 mb-6">
				<span
					className={`px-3 py-1 text-white rounded
    ${investmentType === "SWING" ? "bg-orange-400" : ""}
    ${investmentType === "DAY" ? "bg-green-400" : ""}
    ${investmentType === "SCALPING" ? "bg-sky-400" : ""}`}
				>
					{investmentType}
				</span>
				<span className="px-3 py-1 border rounded">{completion}</span>

				{investmentType === "SWING" && (
					<WeekSelector onChange={handleWeekChange} />
				)}
			</div>

			<div>
				<label className="block mb-1 font-medium">기록 날짜</label>
				<input
					type="date"
					value={new Date().toISOString().split("T")[0]}
					readOnly
					className="border border-gray-300 rounded p-2 w-full cursor-not-allowed bg-gray-100"
				/>
			</div>

			{/* 종목 */}
			<div>
				<label className="block mb-1 font-medium">종목</label>
				<input
					type="text"
					placeholder="투자 종목을 입력하세요."
					className="bg-[#F4F4F4] rounded p-2 w-full"
				/>
			</div>

			<div className="flex gap-4">
				<div className="flex-1">
					<label className="block mb-1 font-medium">포지션 진입 날짜</label>
					<input type="date" className="border border-gray-300 rounded p-2 w-full cursor-pointer" />
				</div>
				<div className="flex-1">
					<label className="block mb-1 font-medium">포지션 종료 날짜</label>
					<input type="date" className="border border-gray-300 rounded p-2 w-full cursor-pointer" />
				</div>
			</div>

			{/* 스크린샷 업로드 */}
			<div>
				<label className="block mb-1 font-medium">스크린샷 업로드</label>
				<div
					className="w-full h-40 rounded bg-[#F4F4F4] flex items-center justify-center cursor-pointer overflow-hidden"
					onClick={handleUploadClick}
				>
					{screenshot ? (
						<img
							src={screenshot}
							alt="screenshot preview"
							className="object-contain w-full h-full"
						/>
					) : (
						<span className="text-gray-400">이미지를 업로드하세요</span>
					)}
				</div>
				<input
					type="file"
					id="screenshotInput"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>

			<div className="flex gap-4">
				<div className="flex-1 flex items-center justify-center gap-2">
					<label className="block mb-1 text-sm">디렉션 프레임</label>
					<FixedModalButton
						options={['1D', '4H']}
						defaultValue="선택"
						onSelect={handleSelectOption}
					/>
				</div>
				<div className="flex-1 flex items-center justify-center gap-2">
					<label className="block mb-1 text-sm">메인 프레임</label>
					<FixedModalButton
						options={['4H', '1H']}
						defaultValue="선택"
						onSelect={handleSelectOption}
					/>
				</div>
				<div className="flex-1 flex items-center justify-center gap-2">
					<label className="block mb-1 text-sm">서브 프레임</label>
					<FixedModalButton
						options={['IH', '15M']}
						defaultValue="선택"
						onSelect={handleSelectOption}
					/>
				</div>
			</div>

			<div className="flex gap-4">
				<div className="flex flex-col flex-1 gap-10">
					<p className="text-gray-300">[포지션 진입]</p>
					<div>
						<label className="block mb-1 font-medium">추세 분석</label>
						<textarea className="bg-[#F4F4F4] rounded p-2 w-full h-12" />
					</div>

					<div className="flex flex-col w-full gap-3">
						<div className="flex flex-col w-full gap-1">
							<button
								onClick={() => setIsOpen(true)}
								className="px-4 py-2 border border-gray-300 text-black rounded text-sm cursor-pointer"
							>
								1진입타점
							</button>

							{selected && (
								<div className="text-sm">
									{selected.target}, {selected.grade}
								</div>
							)}
						</div>

						<EntryTable
							isOpen={isOpen}
							onClose={() => setIsOpen(false)}
							onSelect={handleSelect1}
						/>

						<div className="flex flex-col w-full gap-1">
							<button
								onClick={() => setIsOpen2(true)}
								className="px-4 py-2 border border-gray-300 text-black rounded text-sm cursor-pointer"
							>
								추가매수 (1)
							</button>

							{selected && (
								<div className="text-sm">
									{selected2?.target}, {selected2?.grade}
								</div>
							)}
						</div>

						<EntryTable
							isOpen={isOpen2}
							onClose={() => setIsOpen2(false)}
							onSelect={handleSelect2}
						/>

						<div className="flex flex-col w-full gap-1">
							<button
								onClick={() => setIsOpen3(true)}
								className="px-4 py-2 border border-gray-300 text-black rounded text-sm cursor-pointer"
							>
								추가매수 (2)
							</button>

							{selected && (
								<div className="text-sm">
									{selected3?.target}, {selected3?.grade}
								</div>
							)}
						</div>

						<EntryTable
							isOpen={isOpen3}
							onClose={() => setIsOpen3(false)}
							onSelect={handleSelect3}
						/>
					</div>

					<div className="flex-1">
						<label className="block mb-1 font-medium">리스크 테이킹 (%)</label>
						<input type="number" className="bg-[#F4F4F4] rounded p-2 w-full" />
					</div>

					<div className="flex-1">
						<label className="block mb-1 font-medium">레버리지 (배점)</label>
						<input type="number" className="bg-[#F4F4F4] rounded p-2 w-full" />
					</div>
				</div>
				<CustomDivider variant="vertical" height="h-150" />
				<div className="flex flex-col flex-1 gap-10">
					<p className="text-gray-300">[결과]</p>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => setPosition("Long")}
							className={`px-4 py-2 cursor-pointer rounded ${position === "Long" ? "bg-[#273042] text-white" : "bg-[#F4F4F4] text-black"
								}`}
						>
							Long
						</button>
						<button
							type="button"
							onClick={() => setPosition("Short")}
							className={`px-4 py-2 cursor-pointer rounded ${position === "Short" ? "bg-[#273042] text-white" : "bg-[#F4F4F4] text-black"
								}`}
						>
							Short
						</button>
					</div>
					{/* P&L */}
					<div className="flex items-center gap-3">
						<span className="font-semibold">P&amp;L:</span>
						<div className="flex gap-2">
							<button
								type="button"
								className={`px-3 py-1 border rounded ${isPositive ? "bg-green-500 text-white" : "bg-white text-green-500 border-green-500"
									}`}
								onClick={() => setIsPositive(true)}
							>
								+
							</button>
							<button
								type="button"
								className={`px-3 py-1 border rounded ${!isPositive ? "bg-red-500 text-white" : "bg-white text-red-500 border-red-500"
									}`}
								onClick={() => setIsPositive(false)}
							>
								-
							</button>
						</div>
						<input
							type="number"
							value={pl}
							onChange={(e) => setPl(Number(e.target.value))}
							className="w-20 border rounded p-1 text-center"
						/>
						<span>%</span>
					</div>

					{/* R&R */}
					<div className="flex items-center gap-3">
						<span className="font-semibold">R&amp;R:</span>
						<span>{rr}</span>
					</div>
				</div>
			</div>

			<div>
				<label className="block mb-1 font-medium">매매 복기</label>
				<textarea className="bg-[#F4F4F4] rounded p-2 w-full h-24" />
			</div>

			<div>
				<label className="block mb-1 font-medium">담당 트레이너 피드백 요청 사항</label>
				<textarea className="bg-[#F4F4F4] rounded p-2 w-full h-24" />
			</div>

			<button
				type="submit"
				className="bg-gradient-to-r from-[#D2C693] to-[#928346] text-white py-3 rounded mb-20"
			>
				매매일지 기록하기
			</button>
		</form>
	);
}
