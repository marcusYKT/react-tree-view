import React, {useState, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faXmark, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'
import './Tree.css';

const Tree = ({post}) => {
  const [isActive, setIsActive] = useState(false);
  
  const [locationText, setLocationText] = useState(post?.location);
  const [locationEditorActive, setLocationEditorActive] = useState(false);
  const inputLocationRef = useRef(null);

  const [authorText, setAuthorText] = useState(post?.author);
  const [authorEditorActive, setAuthorEditorActive] = useState(false);
  const inputAuthorRef = useRef(null);

  function showLocationInputHandler(e) {
    e.preventDefault();
    setLocationEditorActive(!locationEditorActive);
  }

  function locationFormSubmitHandler(e) {
    e.preventDefault();
    const text = (inputLocationRef.current.value).toString().toLowerCase();
    setLocationText(text);
    setLocationEditorActive(!locationEditorActive);
  }

    function showAuthorInputHandler(e) {
    e.preventDefault();
    setAuthorEditorActive(!authorEditorActive);
  }

  function authorFormSubmitHandler(e) {
    e.preventDefault();
    const text = (inputAuthorRef.current.value).toString().toLowerCase();
    setAuthorText(text);
    setAuthorEditorActive(!authorEditorActive);
  }

  return (
    <div className='post' key={post?.id}>
      <button className='post--open' onClick={() => setIsActive(!isActive)}>
        <p>{post?.text}</p>
        {isActive && <div><FontAwesomeIcon icon={faChevronUp} size="lg" /></div>}
        {!isActive && <div><FontAwesomeIcon icon={faChevronDown} size="lg" /></div>}
      </button>
      
      {isActive &&
        <div className="post__metadata">
          <div><p>Post ID: {post.id}</p></div>
          <div>
            <p>
              Location: {locationText} <button onClick={showLocationInputHandler}><FontAwesomeIcon icon={faPencil} /></button>
            </p>
            
            {locationEditorActive && 
              <form className="form--edit" onSubmit={locationFormSubmitHandler}>
                <input ref={inputLocationRef} type="text" name="location" placeholder="Enter new location" />
                <button type="submit"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={showLocationInputHandler}><FontAwesomeIcon icon={faXmark} /></button>
              </form>
            }
          </div>

          <div>
            <p>Date: {post.time}</p>
          </div>

          <div>
            <p>
              By: {authorText} <button onClick={showAuthorInputHandler}><FontAwesomeIcon icon={faPencil} /></button>
            </p>
            {authorEditorActive &&
              <form className="form--edit" onSubmit={authorFormSubmitHandler}>
                <input ref={inputAuthorRef} type="text" name="location" placeholder="Enter new location" />
                <button type="submit"><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={showAuthorInputHandler}><FontAwesomeIcon icon={faXmark} /></button>
              </form>
            }
          </div>
        </div>
      }
    </div>
  );
}

export default Tree;
