"use client";

import FeedbackHeader from "./FeedbackHeader";
import BasicOrBeforeForm from "./forms/BasicOrBeforeForm";
import SwingAfterForm from "./forms/SwingAfterForm";
import DayAfterForm from "./forms/DayAfterForm";
import ScalpingAfterForm from "./forms/ScalpingAfterForm";
import { mockUsers } from "../mocks/user";
import { useAuth } from "../hooks/useAuth";
import { mapSwingFormData, mapDayFormData, mapScalpingFormData } from "../utils/feedbackFormMapper";

export default function RequestFeedback() {
	// 현재 로그인된 사용자
	// 0 - 무료, 1 - 스윙, 2 - 데이, 3 - 스켈핑 
	const currentUser = mockUsers[2];
	const { requestSwingFeedback, requestDayFeedback, requestScalpingFeedback } = useAuth();

	const { investmentType, completion } = currentUser;

	console.log("User::");
	console.log(investmentType);
	console.log(completion);



	const handleSubmit = async (formData: any) => {
		console.log("서버로 전송할 데이터:", formData);

		try {
			let fd: FormData;
			let res;

			if (investmentType === "SWING") {
				fd = mapSwingFormData(formData);
				console.log("-----------정제된 데이터는 (entries):-----------");
				fd.forEach((value, key) => console.log(key, value));
				res = await requestSwingFeedback(fd);
			} else if (investmentType === "DAY") {
				fd = mapDayFormData(formData);
				console.log("-----------정제된 데이터는 (entries):-----------");
				fd.forEach((value, key) => console.log(key, value));
				console.log("-------------정제된 데이터 끝------------------");
				res = await requestDayFeedback(fd);

				// const fd = new FormData();
				// fd.append("membershipLevel", "PREMIUM");
				// fd.append("requestDate", "2025-09-28");
				// fd.append("category", "string");
				// fd.append("positionHoldingTime", "string");

				// const fakeFile = new File(["dummy content"], "test.png", { type: "image/png" });
				// fd.append("screenshotFiles", fakeFile);


				// fd.append("riskTaking", "0");
				// fd.append("leverage", "0");
				// fd.append("position", "LONG");
				// fd.append("trainerFeedbackRequestContent", "string");
				// fd.append("directionFrame", "string");
				// fd.append("mainFrame", "string");
				// fd.append("subFrame", "string");
				// fd.append("directionFrameExists", "true");
				// fd.append("trendAnalysis", "string");
				// fd.append("pnl", "-5");
				// fd.append("winLossRatio", "string");
				// fd.append("entryPoint1", "REVERSE");
				// fd.append("grade", "S_PLUS");
				// fd.append("entryPoint2", "2025-09-28");
				// fd.append("tradingReview", "string");

				// console.log("-----------하드코딩 FormData(entries):-----------");
				// fd.forEach((value, key) => console.log(key, value));
				// console.log("-------------정제된 데이터 끝------------------");

				// const res = await requestDayFeedback(fd);
				console.log("res는:", res);

			} else if (investmentType === "SCALPING") {
				fd = mapScalpingFormData(formData);
				console.log("정제된 데이터는 (entries):");
				fd.forEach((value, key) => console.log(key, value));
				res = await requestScalpingFeedback(fd);
			}

			console.log("서버 응답:", res);
		} catch (error) {
			console.error("피드백 요청 예외 발생:", error);
			alert("네트워크 오류가 발생했습니다.");
		}
	};

	const renderForm = () => {
		if (completion === "FREE" || completion === "BEFORE_COMPLETION") {
			return <BasicOrBeforeForm onSubmit={handleSubmit} currentUser={currentUser} />;
		}
		if (completion === "AFTER_COMPLETION") {
			if (investmentType === "SWING") return <SwingAfterForm currentUser={currentUser} onSubmit={handleSubmit} />;
			if (investmentType === "DAY") return <DayAfterForm currentUser={currentUser} onSubmit={handleSubmit} />;
			if (investmentType === "SCALPING") return <ScalpingAfterForm currentUser={currentUser} onSubmit={handleSubmit} />;
		}
		return <div>조건에 맞는 Form이 없습니다.</div>;
	};

	return (
		<div className="flex h-screen bg-white flex-col items-center gap-6 p-6 mt-20">
			{(completion == "BEFORE_COMPLETION" || completion == "AFTER_COMPLETION") && (
				<FeedbackHeader />
			)}

			{/* 조건부 렌더링된 폼 */}
			<div className="w-full max-w-lg p-6">
				{renderForm()}
			</div>
		</div>
	);
}
