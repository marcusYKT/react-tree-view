import React, {useState, useEffect} from 'react';
import './styles/CSSVariables.css';
import './styles/App.css';
import './styles/SortBy.css';
import data from './SortData/SortData';
import Tree from './Tree/Tree';

const WEEK = 'Week 🗓️';
const AUTHOR = 'Author ✍🏻';
const LOCATION = 'Location 📍';

function App() {
  const [sortByTitle, setSortByTitle] = useState(WEEK);
  const [sortByWeek, setSortByWeek] = useState([]);
  const [sortByAuthor, setSortByAuthor] = useState([]);
  const [sortByLocation, setSortByLocation] = useState([]);

  function sortByWeekHandler () {
    const weekdayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const weekdayArray = new Array(7).fill(null).map((_, index) => ({
      day: weekdayOrder[index],
      entries: []
    }));

    data.forEach(entry => {
      const weekday = entry.time.split(', ')[0];
      const weekdayIndex = weekdayOrder.indexOf(weekday);
      
      weekdayArray[weekdayIndex].entries.push(entry);
    });

    setSortByWeek(weekdayArray);
    setSortByTitle(WEEK);
  }

  function sortByAuthorHandler () {    
    const authorArray = {};

    for (const entry of data) {
      if (!authorArray[entry.author]) {
        authorArray[entry.author] = [];
      }
      authorArray[entry.author].push(entry);
    }

    setSortByTitle(AUTHOR);
    setSortByAuthor(authorArray);
  }

  function sortByLocationHandler () {
    const locationArray = {};

    for (const entry of data) {
      if(!locationArray[entry.location]){
        locationArray[entry.location] = [];
      }
      locationArray[entry.location].push(entry);
    }

    setSortByLocation(locationArray);
    setSortByTitle(LOCATION);
  }

  useEffect(() => {
    sortByWeekHandler();
  }, []);

  return (
    <div className="App">
      <div className="app__wrapper">
        <div className="sort-by">
          <button onClick={sortByWeekHandler}>Sort By Week</button>
          <button onClick={sortByAuthorHandler}>Sort By Author</button>
          <button onClick={sortByLocationHandler}>Sort By Location</button>
        </div>

        <h1>Sorting by: {sortByTitle}</h1>

        {sortByTitle === WEEK && 
          <div>
            {sortByWeek.map(post => (
              <div key={post.day}>
                <h2>{post.day} ({post.entries.length})</h2>
                {post.entries.map(post => <Tree key={post.id} post={post}/>)}
              </div>
            ))}
          </div>
        }

        {sortByTitle === AUTHOR && 
          <div>
            {Object.keys(sortByAuthor).map(post => (
              <div key={post}>
                <h2>{post} ({sortByAuthor[post].length})</h2>
                <div>
                  {sortByAuthor[post].map(post => <Tree key={post.id} post={post}/>)}
                </div>
              </div>
            ))}
          </div>
        }

        {sortByTitle === LOCATION && 
          <div>
            {Object.keys(sortByLocation).map(post => (
              <div key={post}>
                <h2>{post} ({sortByLocation[post].length})</h2>
                <div>
                  {sortByLocation[post].map(post => <Tree key={post.id} post={post}/>)}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
