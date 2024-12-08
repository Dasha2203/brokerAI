import { IStockPack } from '@/models/IStockPack';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetAnalysisStockPackResponse,
  StockPackResponse,
  UpdateStockPackCredentials,
} from './types';

interface UserSlice {
  stockpacks: {
    list: IStockPack[];
    total: number;
    analysis: GetAnalysisStockPackResponse | null;
    error: string;
  };
}

const initialState: UserSlice = {
  stockpacks: {
    list: [],
    analysis: null,
    total: 0,
    error: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addStockPack(state, action: PayloadAction<IStockPack>) {
      state.stockpacks.list = [action.payload, ...state.stockpacks.list];
    },
    updateStockPack(state, action: PayloadAction<UpdateStockPackCredentials>) {
      const { stockPackId, stockPackName, color } = action.payload;
      const idx = state.stockpacks.list.findIndex(
        (i) => i.stockPackId === stockPackId,
      );

      if (idx !== -1) {
        state.stockpacks.list[idx] = {
          ...state.stockpacks.list[idx],
          stockPackName,
          color,
        };
      }
    },
    deleteStockPack(state, action: PayloadAction<{ stockPackId: string }>) {
      const idx = state.stockpacks.list.findIndex(
        (i) => i.stockPackId === action.payload.stockPackId,
      );
      if (idx !== -1) {
        state.stockpacks.list = [
          ...state.stockpacks.list.slice(0, idx),
          ...state.stockpacks.list.slice(idx + 1),
        ];
      }
    },
    fetchingSuccess(state, action: PayloadAction<StockPackResponse>) {
      state.stockpacks.list = action.payload.data;
      state.stockpacks.total = action.payload.total;
      state.stockpacks.error = '';
    },
    fetchingAnalysisSuccess(
      state,
      action: PayloadAction<GetAnalysisStockPackResponse>,
    ) {
      state.stockpacks.analysis = action.payload;
      state.stockpacks.error = '';
    },
  },
});

export default userSlice.reducer;
