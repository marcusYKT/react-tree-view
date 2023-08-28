import { render } from '@testing-library/react';
import App from './App';
import Tree from './Tree/Tree';
import TestData from './json/test.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faXmark, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'

test('renders App', () => {
  render(<App />);
});

test('renders Tree component', () => {
  render(<Tree />)
});

test('renders font awesome icons', () => {
  <div>
    <FontAwesomeIcon icon={faChevronUp}/>
    <FontAwesomeIcon icon={faChevronDown}/>
    <FontAwesomeIcon icon={faXmark}/>
    <FontAwesomeIcon icon={faPencil}/>
    <FontAwesomeIcon icon={faCheck}/>
  </div>
});

describe('sortData', () => {
  test('formats time correctly', () => {
    TestData.forEach(entry => {
      expect(entry.time).toMatch(/\w{3}, \w{3} \d{1,2}, \d{4}/);
    });
  });
});
