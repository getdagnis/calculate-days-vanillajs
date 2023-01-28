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

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

function outputDate(dates) {
  const startDateArray = dates[0].split('.');
  const endDateArray = dates[1].split('.');
  const startDate = new Date(startDateArray[2], startDateArray[1] - 1, startDateArray[0]);
  const endDate = new Date(endDateArray[2], endDateArray[1] - 1, endDateArray[0]);

  const diffInDays = (endDate.getTime() - startDate.getTime()) / MILLISECONDS_IN_A_DAY;

  const totalMonths = calculateMonths(startDate, endDate);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

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

// This function helps avoid issues with months and years having different number of days
// It calculates the number of months between two dates and provides a way to calculate years from that
// Instead of getting it by dividing the amount of days, which is not always reliable
const calculateMonths = (startDate, endDate) => {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  let periodMonths = endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    periodMonths += -1;
  }
  if (endYear > startYear) {
    periodMonths += 12 * (endYear - startYear);
  }

  return periodMonths;
};
