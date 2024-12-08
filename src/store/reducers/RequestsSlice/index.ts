import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RemoveRequestCredentials, Request } from './types';

interface RequestState {
  requests: Request[];
  error: string;
}
const initialState: RequestState = {
  requests: [],
  error: '',
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    fetchingSuccess(state, action: PayloadAction<Request[]>) {
      state.requests = action.payload;
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
