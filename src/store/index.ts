import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tickerReducer from './reducers/TickerSlice';

const rootReducer = combineReducers({
  tickerReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
