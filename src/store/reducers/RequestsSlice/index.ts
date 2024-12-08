import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RemoveRequestCredentials, Request, RequestsResponse } from './types';

interface RequestState {
  requests: Request[];
  total: number;
  error: string;
}
const initialState: RequestState = {
  requests: [],
  total: 0,
  error: '',
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    fetchingSuccess(state, action: PayloadAction<RequestsResponse>) {
      state.requests = action.payload.data;
      state.total = action.payload.total;
    },
    remove(state, action: PayloadAction<RemoveRequestCredentials>) {
      const { requestId } = action.payload;
      const idx = state.requests.findIndex((i) => i.requestId === requestId);

      if (idx !== -1) {
        state.requests = [
          ...state.requests.slice(0, idx),
          ...state.requests.slice(idx + 1),
        ];
      }
    },
  },
});

export default requestSlice.reducer;
