import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticker } from './types';

interface TickerState {
  tickers: Ticker[];
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
    fetchingSuccess(state, action: PayloadAction<Ticker[]>) {
      state.tickers = action.payload;
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
