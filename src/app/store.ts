import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contributionsReducer } from '../features/calendar/calendarSlice';

const rootReducer = combineReducers({
  contributions: contributionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
