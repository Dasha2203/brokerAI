import { ITicker } from "@/models/ITicker";
import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";

interface TickerState {
  tickers: ITicker[];
  error: string;
}
const initialState: TickerState = {
  tickers: [],
  error: '',
};

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {

  }
})

export default tickerSlice.reducer;
