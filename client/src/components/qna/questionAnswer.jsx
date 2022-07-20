import React from 'react';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';

var questionAnswer = (props) => {
  if (props.questions.length > 0) {
    var id1 = Object.keys(props.questions[0].answers);
    var sort = (id, index) => {
      if (id.length > 1) {
        id.sort(function(a, b) {
          return props.questions[index].answers[b].helpfulness - props.questions[index].answers[a].helpfulness;
        });
      }
    };
    var sellerCheck = (id, index) => {
      var sellers = [];
      for (var i = 0; i < id.length; i++) {
        if (props.questions[index].answers[id[i]].answerer_name === 'Seller') {
          sellers.push(id[i]);
          id.splice(i, 1);
          i--;
        }
      }
      sellers = sellers.concat(id);
      return sellers;
    };
    sort(id1, 0);
    id1 = sellerCheck(id1, 0);
    if (props.questions.length >= 1) {
      var id2 = Object.keys(props.questions[1].answers);
      sort(id2, 1);
      id2 = sellerCheck(id2, 1);
    }
    return (
      <div className='questions'>
        <div className='question0'>
          <Question
            questions={props.questions[0]}
            yesQuestion={props.yesQuestion}
            addAnswer={props.addAnswer}/>
          <Answer
            answers={props.questions[0].answers}
            answersid={id1}
            id={props.questions[0].question_id}
            yesAnswer={props.yesAnswer}
            reportAnswer={props.reportAnswer}
            moreAnswers={props.moreAnswers}/>
        </div>
        {props.questions.length > 1 ?
          <div>
            <br></br>
            <div className='question1'>
              <Question
                questions={props.questions[1]}
                yesQuestion={props.yesQuestion}
                addAnswer={props.addAnswer}/>
              <Answer
                answers={props.questions[1].answers}
                answersid={id2}
                id={props.questions[1].question_id}
                yesAnswer={props.yesAnswer}
                reportAnswer={props.reportAnswer}
                moreAnswers={props.moreAnswers}/>
            </div>
          </div> :
          <div></div>}
      </div>
    );
  }
};

export default questionAnswer;