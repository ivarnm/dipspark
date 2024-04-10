function localeString(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const locale = 'nb-NO';
    const localeDateString = date?.toLocaleDateString(locale, options);
    return localeDateString?.charAt(0).toUpperCase() + localeDateString?.slice(1);
  }

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function getDateRange() {
  const today = new Date();
  const sixDaysLater = new Date(today);
  sixDaysLater.setDate(today.getDate() + 9);

  const todayFormatted = formatDate(today);
  const sixDaysLaterFormatted = formatDate(sixDaysLater);
  return [todayFormatted, sixDaysLaterFormatted]
}

function fillMissingDays(dateRange, bookingDays) {
  const startDate = new Date();
  const endDate = new Date(startDate).setDate(startDate.getDate()+9);
  const result = [];

  for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as "yyyy-mm-dd"
    const existingBooking = bookingDays.find(day => new Date(day.date+"Z").toISOString().split('T')[0] === formattedDate);

    if (existingBooking) {
      let booking = { ...existingBooking };
      booking.date = formattedDate;      
      result.push(booking);
    } else {
      result.push({ date: formattedDate, bookings: [] });
    }
  }

  return result;
}

export default {
  localeString,
  formatDate,
  getDateRange,
  fillMissingDays
};