import React from 'react';
import Userhelpful from './userhelpful.jsx';
import $ from 'jquery';
import Picture from './pictures.jsx';

var count = 0;

var answer = (props) => {
  if (props.answersid && props.answersid.length === 1) {
    return (
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
    );
  } else if (props.answersid && props.answersid.length === 2) {
    return (
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
        </div>
      </div>
    );
  } else if (props.answersid && props.answersid.length > 2) {
    return (
      <div>
        <div className={props.id}>
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
          </div>
        </div>
        <div className={`qa-paddingleft moreanswer ${props.id}`}>
          <button onClick={(e) => { props.moreAnswers(props.id); }}>SEE MORE ANSWERS</button>
        </div>
      </div>
    );
  }
};

export default answer;