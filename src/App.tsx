import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectDateContributions } from './features/calendar/calendarSlice';
import { fetchContributions } from './features/calendar/calendarThunks';
import Calendar from './features/calendar/Calendar';

function App() {
  const dispatch = useAppDispatch();
  const contributions = useAppSelector(selectDateContributions);

  useEffect(() => {
    dispatch(fetchContributions());
  }, [dispatch]);
  return (
    <Box component="main">
      <Container maxWidth={false}>
        <Calendar contributions={contributions} />
      </Container>
    </Box>
  );
}

export default App;
