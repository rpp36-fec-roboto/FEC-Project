import React from 'react';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';

var questionAnswer = (props) => {
  var id1 = Object.keys(props.questions[0].answers);
  var id2 = Object.keys(props.questions[1].answers);

  return (
    <div>
      <Question questions={props.questions[0]}/>
      <Answer answer={props.questions[0].answers[id1[0]]}/>
      <Userhelpful answer={props.questions[0].answers[id1[0]]}/>
      <br></br>
      <Question questions={props.questions[1]}/>
      <Answer answer={props.questions[1].answers[id2[0]]}/>
      <Userhelpful answer={props.questions[1].answers[id2[0]]}/>
    </div>
  );
};

export default questionAnswer;