import { UserStatus } from "@/app/mocks/status";

// basic_available은 무료 고객이 쓸 수 있는 기능의 보여짐 여부를 제어하기 위한 변수
// premium_available은 유료 고객이 쓸 수 있는 기능의 보여짐 여부를 제어하기 위한 변수 
// message는 기능이 보여지지 못할 떄 표시할 안내 문구 

// false 일 떄 blur, true 일 때 visible 

export const RENDER_RULES: Record<UserStatus, { basic_available: boolean; premium_available: boolean, message?: string }> = {
	// UID 승인 대기 상태에서는 모든 기능 blur 
	UID_REVIEW_PENDING: {
		basic_available: false,
		premium_available: false,
		message: "UID 승인 후 이용하실 수 있는 기능이에요.",
	},
	// UID 승인 거절 상태에서는 모든 기능 blur
	UID_REJECTED: {
		basic_available: false,
		premium_available: false,
		message: "UID 승인 후 이용하실 수 있는 기능이에요.",
	},
	// UID 승인 이후에는 무료 기능 사용 가능, 유료 기능 blur 
	UID_APPROVED: {
		basic_available: true,
		premium_available: false,
	},
	// 유료 결제 이후, 레벨테스트 실시 전까지 유료 기능 blur 
	PAID_BEFORE_TEST: {
		basic_available: true,
		premium_available: false,
		message: "레벨테스트 응시 후 이용하실 수 있는 기능이에요.",
	},
	// 레벨테스트 실시 후, 담당 트레이너 매칭 전까지 유료 기능 blur
	PAID_AFTER_TEST_TRAINER_ASSIGNING: {
		basic_available: true,
		premium_available: false,
		message: "담당 트레이너 매칭 후 이용하실 수 있는 기능이에요.",
	},
	// 담당 트레이너 매칭 시 모든 기능 사용 가능 
	TRAINER_ASSIGNED: {
		basic_available: true,
		premium_available: true,
	},
};
