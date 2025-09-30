"use client";

import TimeFeedback from "./TimeFeedback";
import BasicOrBeforeView from "./forms/BasicOrBeforeView";
import DayAfterView from "./forms/DayAfterView";
import SwingAfterView from "./forms/SwingAfterForm";
import ScalpingAfterView from "./forms/ScalpingAfterView";
import { mockUsers } from "../mocks/user";

type TradeType = "SWING" | "DAY" | "SCALPING" | "BASIC";

export default function Page() {
	// const Type: TradeType = "SWING"; // Type 은 유니온 타입 중 하나
	const Type = mockUsers[1].investmentType;

	return (
		<div className="w-full p-6 mt-20 flex flex-col items-center">
			<TimeFeedback
				year="2025"
				month="8"
				week="셋째 주"
				day="24"
				time="23:35:59"
				title="8/24 (1) 작성 완료"
			/>

			{Type === "SWING" && <SwingAfterView />}
			{Type === "DAY" && <DayAfterView />}
			{Type === "SCALPING" && <ScalpingAfterView />}

			{Type === "SWING" && <BasicOrBeforeView />}
		</div>
	);
}


