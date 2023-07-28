import React from 'react';
import { makeStyles } from '@mui/styles';
import { addDays, format, isMonday, startOfWeek, subWeeks } from 'date-fns';
import { DateContributions } from '../../types';
import { Box } from '@mui/material';
import CalendarTooltip from './components/Tooltop/Tooltip';

const useStyles = makeStyles(() => ({
  graphContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 867,
  },
  row: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  cell: {
    width: 15,
    height: 15,
    margin: 2,
  },
  dayLabel: {
    width: 30,
    height: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'Inter, sans-serif',
    color: '#959494',
  },
}));

interface Props {
  contributions: DateContributions;
}

const Calendar: React.FC<Props> = ({ contributions }) => {
  const classes = useStyles();

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const today = new Date();
  const endDate = isMonday(today) ? today : startOfWeek(today);
  const startDate = subWeeks(endDate, 50);

  const monthNames: string[] = [];
  let currentMonthName = '';
  for (let i = 0; i < 51 * 7; i++) {
    const date = addDays(startDate, i);
    const monthName = date.toLocaleDateString('ru-RU', { month: 'long' });
    if (monthName !== currentMonthName) {
      monthNames.push(monthName.charAt(0).toUpperCase() + monthName.slice(1, 3) + '.');
      currentMonthName = monthName;
    }
  }

  return (
    <Box component="div" className={classes.graphContainer}>
      <Box component="div" className={classes.row} sx={{ pl: '25px' }}>
        {monthNames.map((monthName, index) => (
          <Box key={index} className={classes.dayLabel} sx={{ mr: '40px' }}>
            {monthName}
          </Box>
        ))}
      </Box>
      {daysOfWeek.map((day, rowIndex) => (
        <Box component="div" key={rowIndex} className={classes.row}>
          <Box component="div" className={classes.dayLabel}>
            {day}
          </Box>
          {Array.from({ length: 51 }).map((_, colIndex) => {
            const date = addDays(startDate, rowIndex + colIndex * 7);
            const formattedDate = format(date, 'yyyy-MM-dd');
            const contribution = contributions[formattedDate] ? contributions[formattedDate] : 0;

            return (
              <CalendarTooltip
                key={formattedDate}
                contributionsCount={contribution}
                dayName={day}
                formattedDate={formattedDate}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default Calendar;
