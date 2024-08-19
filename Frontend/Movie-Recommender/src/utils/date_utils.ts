export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    // Add suffix to day
    const getDayWithSuffix = (day: number): string => {
      const j = day % 10,
            k = day % 100;
      if (j === 1 && k !== 11) {
        return `${day}st`;
      }
      if (j === 2 && k !== 12) {
        return `${day}nd`;
      }
      if (j === 3 && k !== 13) {
        return `${day}rd`;
      }
      return `${day}th`;
    };
  
    return `${getDayWithSuffix(day)} ${month} ${year}`;
};