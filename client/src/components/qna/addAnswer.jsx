import React from 'react';
import $ from 'jquery';

var addAnswer = (props) => (
  <div className="answer-modal">
    <div className="answer-modal-content">
      <div className="answer-modal-header">
        <span className="answer-close" onClick={() => { $('.answer-modal').css('display', 'none'); }}>&times;</span>
        <h2>Add an answer</h2>
        <h5>{props.productName.name + ': ' + props.body}</h5>
      </div>
      <div className="answer-modal-body">
        <form>
          <label>*What is your nickname:</label>
          <input type="text" className="answer-name" name="name" maxLength="60" placeholder="Example: jack543!" required></input>
          <h6>For privacy reasons, do not use your full name or email address</h6>
          <label>*Your Answer:</label>
          <textarea type="text" className="answer-body" name="body" maxLength="1000" rows="5" cols="50" required></textarea><br></br><br></br>
          <label>*Your email:</label>
          <input type="text" className="answer-email" name="email" size="35" placeholder="Example: jack@email.com" required></input>
          <h6>For authentication reasons, you will not be emailed</h6>
          <input id='data' type='file' name="data" onChange={(e) => { props.fileHandler(e); }}></input><br></br>
          <input id='data' type='file' name="data" onChange={(e) => { props.fileHandler(e); }}></input><br></br>
          <input id='data' type='file' name="data" onChange={(e) => { props.fileHandler(e); }}></input><br></br>
          <input id='data' type='file' name="data" onChange={(e) => { props.fileHandler(e); }}></input><br></br>
          <input id='data' type='file' name="data" onChange={(e) => { props.fileHandler(e); }}></input><br></br><br></br>
          <input type="submit" value="Submit" onClick={(e) => { props.submitAnswer(e); }}></input>
        </form>
      </div>
    </div>
  </div>
);

export default addAnswer;