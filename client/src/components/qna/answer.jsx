import React from 'react';
import Userhelpful from './userhelpful.jsx';
import $ from 'jquery';
import Picture from './pictures.jsx';

var count = 0;

var answer = (props) => {
  if (props.answersid && props.answersid.length > 0) {
    return (
      <div className={`${props.id} all`}>
        <div className={`${props.id} normal`}>
          <div>
            <div>
              <div className='qa-paddingleft qa-paddingbottom qa-paddingtop'>
                <div className='qa-bold qa-float'>A:</div>
                <div>{props.answers[props.answersid[0]].body}</div>
              </div>
              <div className='qa-thumbnail-list qa-paddingleft'>
                <Picture picture={props.answers[props.answersid[0]].photos}/>
              </div>
              <br></br>
              <Userhelpful
                answer={props.answers[props.answersid[0]]}
                yesAnswer={props.yesAnswer}
                reportAnswer={props.reportAnswer}/>
            </div>
            {props.answersid && props.answersid.length > 1 ?
              <div>
                <div className='qa-paddingleft qa-paddingbottom qa-paddingtop'>
                  <div className='qa-bold qa-float'>A:</div>
                  <div>{props.answers[props.answersid[1]].body}</div>
                </div>
                <div className='qa-thumbnail-list qa-paddingleft'>
                  <Picture picture={props.answers[props.answersid[1]].photos}/>
                </div>
                <br></br>
                <Userhelpful
                  answer={props.answers[props.answersid[1]]}
                  yesAnswer={props.yesAnswer}
                  reportAnswer={props.reportAnswer}/>
              </div> :
              <></>}
          </div>
          {props.answersid && props.answersid.length > 2 ?
            <div className={`qa-paddingleft moreanswer ${props.id}`}>
              <button onClick={(e) => { props.moreAnswers(props.id); }}>SEE MORE ANSWERS</button>
            </div> :
            <></>}
        </div>
      </div>
    );
  } else if (props.more) {
    var moreAnswers = (answers) => {
      return answers.map((answer, index) => {
        return (
          <div key={index}>
            <div className='qa-paddingleft qa-paddingbottom qa-paddingtop'>
              <div className='qa-bold qa-float'>A:</div>
              <div>{answer.body}</div>
            </div>
            <div className='qa-thumbnail-list qa-paddingleft'>
              <Picture picture={answer.photos}/>
            </div>
            <br></br>
            <Userhelpful
              answer={answer}
              yesAnswer={props.yesAnswer}
              reportAnswer={props.reportAnswer}/>
          </div>
        );
      });
    };
    return (
      <div className={`${props.id} more`}>
        {moreAnswers(props.answers)}
        <div className={`qa-paddingleft moreanswer ${props.id}`}>
          <button onClick={(e) => { props.moreAnswers(props.id); }}>COLLAPSE ANSWERS</button>
        </div>
      </div>
    );
  }
};

export default answer;