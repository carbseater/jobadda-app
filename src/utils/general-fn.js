function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const formatIndianCurrency = number => {
  if (!number) return;
  const crore = 10000000;
  const lakh = 100000;

  if (number >= crore) {
    return (
      (number / crore).toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,') + ' Cr'
    );
  } else if (number >= lakh) {
    return (
      (number / lakh).toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,') + ' lakh'
    );
  } else {
    return formatNumberWithCommas(number);
  }
};

export const truncateString = (str, maxLength) => {
  if (!str) return null;
  if (typeof str !== 'string' || typeof maxLength !== 'number') {
    return '';
  }

  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '..';
  }

  return str;
};

export const getRelativeDate = timestamp => {
  // Convert Firestore timestamp to a JavaScript Date object
  try {
    const postDate = timestamp.toDate();

    // Get the current date
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - postDate;

    // Calculate the number of days
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(hoursDifference / 24);
    if (hoursDifference <= 0) {
      return 'Just now';
    } else if (hoursDifference <= 24) {
      return `${hoursDifference} hr ago`;
    } else if (daysDifference <= 0) {
      return 'Today';
    } else if (daysDifference <= 30) {
      return `${daysDifference} d ago`;
    } else {
      const monthsDifference = Math.floor(daysDifference / 30);
      if (monthsDifference <= 12) {
        return `${monthsDifference} mon ago`;
      } else {
        const yearsDifference = Math.floor(monthsDifference / 12);
        return `${yearsDifference} yr ago`;
      }
    }
  } catch (e) {
    // console.log(e);
  }
};

export const isObjectNullOrEmpty = obj => {
  // Check if the object is null or undefined
  // console.log('Check', obj);
  if (obj === null || typeof obj === 'undefined') {
    return true;
  }

  if (typeof obj !== 'object') {
    return obj == null;
  }
  // Check if the object has no properties (is empty)
  return Object.keys(obj).length === 0;
};
