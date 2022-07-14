import React from 'react';
import $ from 'jquery';

var addAnswer = (props) => (
  <div className="answer-modal">
    <div className="answer-modal-content">
      <div className="answer-modal-header">
        <span className="answer-close" onClick={() => { $('.answer-modal').css('display', 'none'); }}>&times;</span>
        <h2>Add a question</h2>
      </div>
      <div className="answer-modal-body">
        <form>
          <label>Username:</label>
          <input type="text" className="qa-name" name="name"></input><br></br><br></br>
          <label>Answer:</label>
          <input type="text" className="qa-body" name="body"></input><br></br><br></br>
          <label>Email:</label>
          <input type="text" className="qa-email" name="email"></input><br></br><br></br>
          <input type="submit" value="Submit" onClick={props.submitAnswer}></input>
        </form>
      </div>
    </div>
  </div>
);

export default addAnswer;





