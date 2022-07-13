import React from 'react';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';

var questionAnswer = (props) => {
  if (props.questions.length > 0) {
    var id1 = Object.keys(props.questions[0].answers);
    var sort = (id) => {
      for (var i = 0; i < props.questions.length; i++) {
        var id = Object.keys(props.questions[i].answers);
        if (id.length > 1) {
          id.sort(function(a, b) {
            return b.helpfulness - a.helpfulness;
          });
        }
      }
    };

    sort(id1);
    if (props.questions.length > 1) {
      var id2 = Object.keys(props.questions[1].answers);
      sort(id2);
      return (
        <div className='questions'>
          <div className='question0'>
            <Question
              questions={props.questions[0]}
              yesQuestion={props.yesQuestion}
              addAnswer={props.addAnswer}/>
            <Answer
              answer={props.questions[0].answers[id1[0]]}
              answers={props.questions[0].answers}
              answersid={id1}
              id={props.questions[0].question_id}
              update={props.update}
              yesAnswer={props.yesAnswer}
              reportAnswer={props.reportAnswer}
              moreAnswers={props.moreAnswers}/>
          </div>
          <br></br>
          <div className='question1'>
            <Question
              questions={props.questions[1]}
              yesQuestion={props.yesQuestion}
              addAnswer={props.addAnswer}/>
            <Answer
              answer={props.questions[1].answers[id2[0]]}
              answers={props.questions[1].answers}
              answersid={id2}
              id={props.questions[1].question_id}
              update={props.update}
              yesAnswer={props.yesAnswer}
              reportAnswer={props.reportAnswer}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className='questions'>
          <div className='question0'>
            <Question
              questions={props.questions[0]}
              yesQuestion={props.yesQuestion}
              addAnswer={props.addAnswer}/>
            <Answer
              answer={props.questions[0].answers[id1[0]]}
              answers={props.questions[0].answers}
              answersid={id1}
              id={props.questions[0].question_id}
              update={props.update}
              yesAnswer={props.yesAnswer}
              reportAnswer={props.reportAnswer}
              moreAnswers={props.moreAnswers}/>
          </div>
        </div>
      );
    }
  }
};

export default questionAnswer;