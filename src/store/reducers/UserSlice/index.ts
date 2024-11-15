import { IStockPack } from '@/models/IStockPack';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateStockPackCredentials } from './types';

interface UserSlice {
  stockpacks: {
    list: IStockPack[];
    error: string;
  };
}

const initialState: UserSlice = {
  stockpacks: {
    list: [],
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
    fetchingSuccess(sate, action: PayloadAction<IStockPack[]>) {
      sate.stockpacks.list = action.payload;
      sate.stockpacks.error = '';
    },
  },
});

export default userSlice.reducer;
