const data = require('../json/data.json');

const sortData = data.map(entry => {
  const postingDate = new Date(entry.time * 1000);
  
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const formattedDate = postingDate.toLocaleDateString('en-US', options);

  return {
    ...entry,
    time: formattedDate
  };
});

export default sortData;
