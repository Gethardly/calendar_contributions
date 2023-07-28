import React from 'react';
import { Box, createTheme, ThemeProvider, Tooltip, Typography } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'black', // Set the desired background color
          width: '145px',
          height: '42px',
        },
      },
    },
  },
});

interface Props {
  contributionsCount: number;
  dayName: string;
  formattedDate: string;
}

const CalendarTooltip: React.FC<Props> = ({ contributionsCount, formattedDate, dayName }) => {
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const day = date.getDate();
  const month_name = date.toLocaleDateString('ru-RU', { month: 'long' });
  const getCellClassName = (contributions: number): string => {
    if (contributions === 0) {
      return '#EDEDED';
    } else if (contributions >= 1 && contributions <= 9) {
      return '#ACD5F2';
    } else if (contributions >= 10 && contributions <= 19) {
      return '#7FA8C9';
    } else if (contributions >= 20 && contributions <= 29) {
      return '#527BA0';
    } else {
      return '#254E77';
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Tooltip
        title={
          <Box component="div" sx={{ paddingX: '9px', paddingY: '5px', textAlign: 'center' }}>
            <Box component="div">
              <Typography component="span" sx={{ fontSize: '12px' }}>
                {contributionsCount} contributions
              </Typography>
            </Box>
            <Typography component="span" sx={{ fontSize: '10px' }} color="#7C7C7C">
              {dayName}, {month_name} {day}, {year}
            </Typography>
          </Box>
        }
        arrow
      >
        <Box
          component="div"
          sx={{
            backgroundColor: `${getCellClassName(contributionsCount ? contributionsCount : 0)}`,
            width: '15px',
            height: '15px',
            margin: '2px',
            cursor: 'pointer',
          }}
        />
      </Tooltip>
    </ThemeProvider>
  );
};

export default CalendarTooltip;
