import React from 'react';
import $ from 'jquery';

var addQuestion = (props) => (
  <div className="question-modal" >
    <div className="question-modal-content">
      <div className="question-modal-header">
        <span className="question-close" data-testid="question" onClick={() => { $('.question-modal').css('display', 'none'); }}>&times;</span>
        <h2>Ask Your Question</h2>
        <h5>About the {props.productName.name}</h5>
      </div>
      <div className="question-modal-body">
        <form>
          <label>*What is your nickname:</label>
          <input type="text" className="question-name" name="name" placeholder="Example: jackson11!" maxLength="60" required></input>
          <h6>For privacy reasons, do not use your full name or email address</h6>
          <label>*Your Question:</label>
          <textarea type="text" className="question-body" name="body" maxLength="1000" rows="5" cols="50" required></textarea><br></br><br></br>
          <label>*Your email:</label>
          <input type="text" className="question-email" name="email" size="35" placeholder="Why did you like the product or not?" required></input>
          <h6>For authentication reasons, you will not be emailed</h6>
          <input type="submit" value="Submit question" onClick={props.submitQuestion}></input>
        </form>
      </div>
    </div>
  </div>
);

export default addQuestion;
