/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
 */
const dates = [
  ['01.01.2000', '01.01.2016'],
  ['01.01.2016', '01.08.2016'],
  ['01.11.2015', '01.02.2017'],
  ['17.12.2016', '16.01.2017'],
  ['01.01.2016', '01.01.2016'],
  ['28.02.2015', '13.04.2018'],
  ['28.01.2015', '28.02.2015'],
  ['17.03.2022', '17.03.2023'],
  ['17.02.2024', '17.02.2025'],
];

function outputDate(dates) {
  const startDateArray = dates[0].split('.');
  const endDateArray = dates[1].split('.');

  let startDate = new Date(startDateArray[2], startDateArray[1] - 1, startDateArray[0]);
  let endDate = new Date(endDateArray[2], endDateArray[1] - 1, endDateArray[0]);

  let diffInMilliseconds = endDate.getTime() - startDate.getTime();
  let diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

  let years = Math.floor(diffInDays / 365.25);
  let remainingDays = diffInDays % 365.25;
  let months = Math.floor(remainingDays / 30);

  if (months === 12) {
    years++;
    months = 0;
  }

  if (diffInDays === 30) {
    months = 0;
  }

  let result = '';
  if (years > 0) {
    result += years + ' year' + (years > 1 ? 's' : '') + ', ';
  }
  if (months > 0) {
    result += months + ' month' + (months > 1 ? 's' : '') + ', ';
  }
  result += 'total ' + Math.round(diffInDays) + ' days';

  return result;
}

// This function shows incorrect output for some results, however, it is a more precise solution
// as it takes into account the number of days in each month and year. Written with the help of AI
function outputDatePrecise(dates) {
  let date1Arr = dates[0].split('.');
  let date2Arr = dates[1].split('.');

  let startYear = parseInt(date1Arr[2]);
  let startMonth = parseInt(date1Arr[1]);
  let startDay = parseInt(date1Arr[0]);

  let endYear = parseInt(date2Arr[2]);
  let endMonth = parseInt(date2Arr[1]);
  let endDay = parseInt(date2Arr[0]);

  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  if (days < 0) {
    months--;
    days += daysInMonth(startMonth, startYear);
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  let result = '';
  if (years > 0) {
    result += years + ' year' + (years > 1 ? 's' : '') + ', ';
  }
  if (months > 0) {
    result += months + ' month' + (months > 1 ? 's' : '') + ', ';
  }
  result += 'total ' + (days + daysInYear(years) + daysInMonths(months)) + ' days';
  return result;
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function daysInYear(years) {
  let days = 0;
  for (let i = 0; i < years; i++) {
    days += isLeapYear(i) ? 366 : 365;
  }
  return days;
}

function daysInMonths(months) {
  let days = 0;
  for (let i = 0; i < months; i++) {
    days += daysInMonth(i, 0);
  }
  return days;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
