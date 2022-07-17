import React from 'react';
import $ from 'jquery';

var addQuestion = (props) => (
  <div className="question-modal">
    <div className="question-modal-content">
      <div className="question-modal-header">
        <span className="question-close" onClick={() => { $('.question-modal').css('display', 'none'); }}>&times;</span>
        <h2>Add a question</h2>
      </div>
      <div className="question-modal-body">
        <form>
          <label>Username:</label>
          <input type="text" className="question-name" name="name"></input><br></br><br></br>
          <label>Answer:</label>
          <input type="text" className="question-body" name="body"></input><br></br><br></br>
          <label>Email:</label>
          <input type="text" className="question-email" name="email"></input><br></br><br></br>
          <input type="submit" value="Submit" onClick={props.submitQuestion}></input>
        </form>
      </div>
    </div>
  </div>
);

export default addQuestion;
