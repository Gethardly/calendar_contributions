import { DateContributions } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchContributions } from './calendarThunks';
import { RootState } from '../../app/store';

interface calendarState {
  contributions: DateContributions;
  getContributionsLoading: boolean;
}

const initialState: calendarState = {
  contributions: {},
  getContributionsLoading: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContributions.pending, (state) => {
      state.getContributionsLoading = true;
    });
    builder.addCase(fetchContributions.fulfilled, (state, { payload: contributions }) => {
      state.getContributionsLoading = false;
      state.contributions = contributions;
    });
    builder.addCase(fetchContributions.rejected, (state) => {
      state.getContributionsLoading = false;
    });
  },
});

export const contributionsReducer = calendarSlice.reducer;
export const selectDateContributions = (state: RootState) => state.contributions.contributions;
