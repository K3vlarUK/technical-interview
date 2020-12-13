import React, { useState } from 'react';
import './App.css';

function App(props: any) {

  const [state, setState] = useState(props.initialState);

  const getPosts = (cb: any) => {
    try {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        const result:{id: number, title: string, body: string, userID: number}[] = [];
        
        json.forEach((record:{id: number, title: string, body: string, userID: number}) => result.push(record));
  
        cb(result);
      })
    } catch (error) {
      // Just a basic log to the console for debugging - Could be used to render Failed to load message.
      console.log(error);
    }
  }

  // Pulled out the single post loader from the main return as I feel it looks cleaner when it is all not crammed in amongst the html in the return.
  const getSinglePost = (post: number) => {
    try {
      fetch('https://jsonplaceholder.typicode.com/posts/' + post)
      .then(response => response.json())
      .then(json => {
        var updateView = {
          posts: state.posts,
          heading: state.heading,
          view: state.view,
        };
  
        updateView.view = json;
        
        setState(updateView);
      })
    } catch (error) {
      // Just a basic log to the console for debugging - Could be used to render Failed to load message.
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="heading-bar">
        <h1 className="heading">
          {state.heading}
        </h1>
        <div className="content">
          <button className="load-posts" onClick={() => getPosts((values: any) => {
            var update = {
              posts: state.posts,
              heading: state.heading,
              view: state.view,
            };

            update.posts = values;

            setState(update);
          })}>Fetch posts</button>
        </div>
      </div>
      <div className="post-board">
        <div className="post-titles">
          <ul className="posts">
            {state.posts.map((post: any, index: number) => {
              return (<div role="listitem" className="post-card" key={index}>
                <h2 className="post-title">
                  {post.title}
                </h2>
                <button className="show-post" onClick={() => getSinglePost(post.id)}>View</button>
              </div>)
            })}
          </ul>
        </div>
        <div className="articles">
          { state.view && 
          <article className="viewer">
            <h2 className="viewer-title">{state.view.title}</h2>
            <p className="viewer-content">
              {state.view.body}
            </p>
          </article>}
        </div>
      </div>
    </div>
  );
}

export default App;
