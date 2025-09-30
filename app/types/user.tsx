import { UserStatus } from "../mocks/status";

export type InvestmentType = "SWING" | "DAY" | "SCALPING";
export type CompletionStatus = "FREE" | "BEFORE_COMPLETION" | "AFTER_COMPLETION";

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: UserStatus;
  investmentType: InvestmentType;
  completion: CompletionStatus;
};