import { ITicker } from "@/models/ITicker";

export type ErrorCodeResponse = {
  errorCode: string;
};

export type TickerResponse = ErrorCodeResponse & {
  data: ITicker[];
  total: number;
};
