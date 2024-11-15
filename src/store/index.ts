import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tickerReducer from './reducers/TickerSlice';
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
  tickerReducer,
  userReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
