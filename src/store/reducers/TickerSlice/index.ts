import { ITicker } from '@/models/ITicker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    fetchingSuccess(state, action: PayloadAction<ITicker[]>) {
      state.tickers = action.payload;
    },
  },
});

export default tickerSlice.reducer;
