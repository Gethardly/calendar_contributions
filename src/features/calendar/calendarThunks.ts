import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axios';
import { DateContributions } from '../../types';

export const fetchContributions = createAsyncThunk<DateContributions>('calendar/fetch_contributions', async () => {
  const response = await axiosApi.get<DateContributions>('');
  return response.data;
});
