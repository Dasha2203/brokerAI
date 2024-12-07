import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticker, TickerResponse } from './types';

interface TickerState {
  tickers: Ticker[];
  error: string;
  total: number;
}
const initialState: TickerState = {
  tickers: [],
  error: '',
  total: 0,
};

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    fetchingSuccess(state, action: PayloadAction<TickerResponse>) {
      state.tickers = action.payload.data;
      state.total = action.payload.total;
    },
    addToBookmark(state, action: PayloadAction<string>) {
      const id = action.payload;

      const idx = state.tickers.findIndex((i) => i.stockId === id);

      if (idx !== -1) {
        state.tickers[idx].bookmarked = !state.tickers[idx].bookmarked;
      }
    },
    deleteFromBookmark(state, action: PayloadAction<string>) {
      const id = action.payload;

      const idx = state.tickers.findIndex((i) => i.stockId === id);

      if (idx !== -1) {
        state.tickers[idx].bookmarked = !state.tickers[idx].bookmarked;
      }
    },
  },
});

export default tickerSlice.reducer;
