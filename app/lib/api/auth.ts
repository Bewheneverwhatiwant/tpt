interface SignupRequest {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  passwordCheck: string; // 비밀번호 확인
  termsService: boolean;
  termsPrivacy: boolean;
  termsMarketing?: boolean; // 선택
  investmentType?: string;
  uids: {
    exchangeName: string;
    uid: string;
  }[]; // 거래소 UID 리스트
}


interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// 서버가 내려주는 원본 응답 구조
export interface ServerResponse<T> {
  timestamp: string;
  code: string;
  message: string;
  result: T;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 아이디 찾기 응답에 맞는 result 타입
export interface FindIdResult {
  userName: string;
}

// 아이디 찾기에서 최종적으로 사용할 타입
export type FindIdResponse = ApiResponse<FindIdResult>;

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

class AuthAPI {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // 쿠키에서 XSRF-TOKEN 꺼내기
      // const getCookie = (name: string) => {
      //   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      //   return match ? decodeURIComponent(match[2]) : null;
      // };
      // const xsrfToken = getCookie("XSRF-TOKEN");
      // console.log("📌 쿠키에서 가져온 XSRF-TOKEN:", xsrfToken);

      // const finalHeaders = {
      //   'Content-Type': 'application/json',
      //   ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
      //   ...options.headers,
      // };

      const isFormData = options.body instanceof FormData;

      // 🔹 1. 저장된 토큰 꺼내기
      const xsrfToken = localStorage.getItem("XSRF-TOKEN");
      console.log("📌 저장된 XSRF-TOKEN:", xsrfToken);

      const finalHeaders: HeadersInit = {
        ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
        ...(options.headers || {}),
      };

      if (!isFormData) {
        (finalHeaders as Record<string, string>)["Content-Type"] = "application/json";
      }

      console.log("📡 [REQUEST DEBUG]");
      console.log("➡️ URL:", `${API_BASE_URL}${endpoint}`);
      console.log("➡️ METHOD:", options.method || "GET");
      console.log("➡️ HEADERS:", finalHeaders);
      console.log("➡️ BODY:", options.body);
      console.log("➡️ document.cookie:", document.cookie);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: finalHeaders,
        credentials: "include",   // 세션/쿠키 포함
        ...options,
      });

      console.log("⬅️ RESPONSE STATUS:", response.status);
      console.log("⬅️ RESPONSE HEADERS:", [...response.headers.entries()]);

      // 🔹 4. 응답 헤더에서 새 XSRF-TOKEN 있으면 저장
      // const newToken = response.headers.get("XSRF-TOKEN");
      const newToken =
        response.headers.get("x-xsrf-token") ||
        response.headers.get("xsrf-token");

      console.log("newToken:", newToken);

      if (newToken) {
        console.log("📌 응답에서 새 XSRF-TOKEN 추출:", newToken);
        localStorage.setItem("XSRF-TOKEN", newToken);

      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // // 응답 Body가 있는지 확인
      // const text = await response.text();
      // const data = text ? JSON.parse(text) : {};
      // // console.log("⬅️ RESPONSE BODY:", data);

      // return { success: true, data };
      const text = await response.text();
      const raw: ServerResponse<T> = text ? JSON.parse(text) : null;

      return {
        success: true,
        data: raw?.result,   // result만 꺼내서 ApiResponse.data에 넣기
        message: raw?.message,
      };
    } catch (error) {
      console.error('❌ API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }



  // 회원가입
  async signup(signupData: SignupRequest): Promise<ApiResponse> {
    return this.request('/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    });
  }

  // 로그인
  async login(loginData: LoginRequest): Promise<ApiResponse> {
    return this.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  }

  // 전화번호 인증 코드 발송
  async sendPhoneCode(phone: string): Promise<ApiResponse> {
    return this.request('/api/v1/auth/phone/code', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }

  // 전화번호 인증 코드 확인
  async verifyPhoneCode(phone: string, code: string): Promise<ApiResponse> {
    return this.request('/api/v1/auth/phone/verify', {
      method: 'POST',
      body: JSON.stringify({
        type: "PHONE",
        value: phone,
        code
      }),
    });
  }

  // 이메일 인증 코드 발송
  async sendEmailCode(email: string): Promise<ApiResponse> {
    return this.request('/api/v1/auth/email/code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // 이메일 인증 코드 확인
  async verifyEmailCode(email: string, code: string): Promise<ApiResponse> {
    return this.request('/api/v1/auth/email/verify', {
      method: 'POST',
      body: JSON.stringify({
        type: "EMAIL",
        value: email,
        code
      }),
    });
  }

  // 사용자명 중복 확인
  async checkUsernameAvailability(username: string): Promise<ApiResponse> {
    return this.request(`/api/v1/auth/username/available?username=${encodeURIComponent(username)}`);
  }

  // 이메일로 아이디 찾기
  async findIdByEmail(email: string): Promise<FindIdResponse> {
    return this.request<FindIdResult>('/api/v1/auth/id/find', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // 사용자 프로필 가져오기
  async getUserProfile(): Promise<ApiResponse> {
    return this.request('/api/v1/auth/me');
  }

  // 소셜 로그인 기본 정보 가져오기
  async getSocialInfo(): Promise<ApiResponse<{
    userId: number;
    username: string;
    name: string;
    email: string;
    passwordHash: string;
  }>> {
    return this.request("/api/v1/auth/social-info", {
      method: "GET",
    });
  }

  // 스윙 피드백 요청
  async requestSwingFeedback(data: SwingFeedbackRequest): Promise<ApiResponse> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return this.request("/api/v1/feedback-requests/swing", {
      method: "POST",
      body: formData,
    });
  }

  // 데이 피드백 요청
  async requestDayFeedback(data: DayFeedbackRequest): Promise<ApiResponse> {
    let formData: FormData;

    // 이미 FormData라면 그대로 사용
    if (data instanceof FormData) {
      formData = data;
    } else {
      // 일반 객체라면 새 FormData 생성
      formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
    }

    // ✅ 최종 전송 FormData 디버깅
    console.log("----------- 최종 FormData (entries) -----------");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log("------------- FormData 끝 ------------------");

    return this.request("/api/v1/feedback-requests/day", {
      method: "POST",
      body: formData,
    });
  }

  // 스켈핑 피드백 요청
  async requestScalpingFeedback(data: ScalpingFeedbackRequest): Promise<ApiResponse> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    return this.request("/api/v1/feedback-requests/scalping", {
      method: "POST",
      body: formData,
    });
  }
}

export const authAPI = new AuthAPI();
export type { SignupRequest, LoginRequest, ApiResponse };

// 피드백 요청 관련 타입
export interface SwingFeedbackRequest {
  positionEndDate: string;
  feedbackYear: number;
  trainerFeedbackRequestContent: string;
  positionStartDate: string;
  positionHoldingTime: string;
  position: string;
  winLossRatio: string;
  subFrame: string;
  courseStatus: string;
  directionFrame: string;
  membershipLevel: string;
  pnl: number;
  screenshotFiles: File | string; // string은 mock 테스트용
  riskTaking: number;
  entryPoint1: string;
  preCourseFeedbackDetail: string; // JSON string
  mainFrame: string;
  entryPoint2: string;
  leverage: number;
  entryPoint3: string;
  grade: string;
  feedbackWeek: number;
  trendAnalysis: string;
  tradingReview: string;
  feedbackMonth: number;
  requestDate: string;
  category: string;
}

export interface DayFeedbackRequest {
  trainerFeedbackRequestContent: string;
  positionHoldingTime: string;
  position: string;
  directionFrameExists: boolean;
  winLossRatio: string;
  subFrame: string;
  courseStatus: string;
  directionFrame: string;
  membershipLevel: string;
  pnl: number;
  screenshotFiles: File | string;
  riskTaking: number;
  entryPoint1: string;
  preCourseFeedbackDetail: string;
  mainFrame: string;
  entryPoint2: string;
  leverage: number;
  grade: string;
  trendAnalysis: string;
  tradingReview: string;
  requestDate: string;
  category: string;
}

export interface ScalpingFeedbackRequest {
  trainerFeedbackRequestContent: string;
  dailyTradingCount: number;
  positionHoldingTime: string;
  courseStatus: string;
  membershipLevel: string;
  screenshotFiles: File | string;
  riskTaking: number;
  preCourseFeedbackDetail: string;
  leverage: number;
  totalProfitMarginPerTrades: number;
  trendAnalysis: string;
  requestDate: string;
  category: string;
  totalPositionTakingCount: number;
}