import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tickerReducer from './reducers/TickerSlice';

const rootReducer = combineReducers({
  tickerReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
