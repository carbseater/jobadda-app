import moment from 'moment';

export const extendedFunctions = {
  getAgeFromDate: (date, unit = 'years') => {
    // console.log(date);
    const momentAgeDate = moment(date, moment.ISO_8601);
    if (!momentAgeDate.isValid()) return '';
    const d = moment().diff(momentAgeDate, unit);
    // console.log('Age', d);
    return d.toString();
  },
  // getDateDiff: (startDate, endDate, unit, isAbsolute = true) => {

  //   const momentStartDate = moment(startDate, moment.ISO_8601);
  //   const momentEndDate = moment(endDate, moment.ISO_8601);
  //   if (!momentStartDate.isValid() || !momentEndDate.isValid()) return '';
  //   const dateDiff = momentStartDate.diff(momentEndDate, unit);
  //   if (isAbsolute) {
  //     return Math.abs(dateDiff);
  //   }

  //   return dateDiff;
  // },

  getDateDiff: (startDate, endDate) => {
    const momentStartDate = moment(startDate, 'DD/MM/YYYY');
    const momentEndDate = moment(endDate, 'DD/MM/YYYY');

    if (!momentStartDate.isValid() || !momentEndDate.isValid()) {
      return '';
    }

    const years = momentEndDate.diff(momentStartDate, 'years');
    momentStartDate.add(years, 'years'); // Move start date forward by the years
    const months = momentEndDate.diff(momentStartDate, 'months');

    if (years > 0 && months > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} and ${months} ${
        months === 1 ? 'month' : 'months'
      }`;
    } else if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
      return '0 years'; // Default if both years and months are 0
    }
  },
};
