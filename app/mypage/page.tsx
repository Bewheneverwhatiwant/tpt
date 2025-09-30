"use client";
import { useEffect, useState } from "react";
import MyPageSidebar from "./MyPageSidebar";
import MyPageMain from "./MyPageMain";
import MyPageSidebarSkeleton from "./MyPageSidebarSkeleton";

import { UserStatus } from "../mocks/status";
import { useAuth } from "../hooks/useAuth";

// "UID_REVIEW_PENDING"
// "UID_REJECTED"
// "UID_APPROVED"
// "PAID_BEFORE_TEST"
// "PAID_AFTER_TEST_TRAINER_ASSIGNING"
// "TRAINER_ASSIGNED"

// mockData
const state: UserStatus = "UID_APPROVED"; // 바꿔가면서 테스트
// 로그인한 계정의 status에 따라 바뀌도록 수정할 것 

// mockData
const mockUser = {
	name: "김개똥",
	email: "apple123@gmail.com",
	phone: "010-1234-5678",
	profileImage: null,
};

export default function MyPage() {

	const { myInfo } = useAuth();
	const [userData, setUserData] = useState<{
		name: string;
		username: string,
		email: string;
		phone?: string | null;
		profileImage?: string | null;
		userStatus: UserStatus,
	} | null>(null);

	useEffect(() => {
		const fetchUserInfo = async () => {
			const res = await myInfo();
			console.log("마이페이지 내 정보:", res);

			if (res && res.data) {
				setUserData({
					name: res.data.name,
					username: res.data.username, // 닉네임
					email: res.data.username,    // API에 email 필드 없으니 임시로 username
					phone: null,                 // 아직 전화번호 없음
					profileImage: null,          // 아직 프사 없음
					userStatus: res.data.userStatus as UserStatus,
				});
			}
		};

		fetchUserInfo();
	}, []);

	return (
		<div className="flex bg-white flex-col md:flex-row h-auto md:h-screen">
			{/* 테스트용으로, 위의 mockData 바꿔서 볼 수 있는 컴포넌트입니다 */}
			{/* <MyPageSidebar name={mockUser.name} email={mockUser.email} phone={mockUser.phone} /> */}

			{/* 로그인한 계정의 실제 status에 따른 컴포넌트입니다 */}
			{userData ? (
				<MyPageSidebar
					name={userData.name}
					email={mockUser.email}
					phone={mockUser.phone}
				/>
			) : (
				<MyPageSidebarSkeleton /> // ✅ 로딩 중일 때
			)}

			{/* 테스트용으로, 위의 mockData 바꿔서 볼 수 있는 컴포넌트입니다 */}
			<MyPageMain state={state} />

			{/* 로그인한 계정의 실제 status에 따른 컴포넌트입니다 */}
			{/* {userData && <MyPageMain state={userData.userStatus} />} */}
		</div>
	);
}
