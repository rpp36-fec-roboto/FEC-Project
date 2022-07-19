import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchBar from './searchbar.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';
import AddAnswer from './addAnswer.jsx';
import AddQuestion from './addQuestion.jsx';
import data from '../../data/sampleData.js';
import Answer from './answer.jsx';
import $ from 'jquery';

import withTracker from '../../components/Sharables/withTracker.js';

class Qna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: data.questions.results,
      answers: {},
      questionhelpful: [],
      answerhelpful: [],
      reportAnswer: [],
      currentQuestion: ''
    };
    this.updateAnswers = this.updateAnswers.bind(this);
    this.yesQuestionButton = this.yesQuestionButton.bind(this);
    this.addAnswerButton = this.addAnswerButton.bind(this);
    this.yesAnswerButton = this.yesAnswerButton.bind(this);
    this.reportAnswerButton = this.reportAnswerButton.bind(this);
    this.addQuestionButton = this.addQuestionButton.bind(this);
    this.moreQuestions = this.moreQuestions.bind(this);
    this.moreAnswers = this.moreAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  componentDidMount() {
    //get request to get all question/answers
    $.ajax({
      method: 'get',
      url: '/qa/questions',
      data: {'product_id': this.props.productId},
      success: (data) => {
        data.results.sort(function(a, b) {
          return b.question_helpfulness - a.question_helpfulness;
        });
        this.setState({questions: data.results});
      }
    });
  }

  updateAnswers(data, id) {
    var answers = this.state.answers;
    answers.id = data;
    console.log('answer', answers);
    this.setState({answers: answers});
  }

  yesQuestionButton(qid) {
    if (!this.state.questionhelpful.includes(qid)) {
      $.ajax({
        method: 'put',
        url: `/qa/questions/${qid}/helpful`,
        success: () => {
          console.log('Thank you for marking this helpful!');
          let tempState = this.state.questionhelpful;
          tempState.push(qid);
          this.setState({questionhelpful: tempState});
        }
      });
    } else {
      console.log('You have already marked this as helpful');
    }

  }

  addAnswerButton(qid) {
    console.log('add answer button');
    $('.answer-modal').css('display', 'block');
    this.setState({currentQuestion: qid});
  }

  yesAnswerButton(id) {
    if (!this.state.answerhelpful.includes(id)) {
      $.ajax({
        method: 'put',
        url: `/qa/answer/${id}/helpful`,
        success: () => {
          console.log('Thank you for marking this helpful!');
          let tempState = this.state.answerhelpful;
          tempState.push(id);
          this.setState({answerhelpful: tempState});
        }
      });
    } else {
      console.log('You have already marked this as helpful');
    }
  }

  reportAnswerButton(id) {
    console.log('report answer button');
    if (!this.state.reportAnswer.includes(id)) {
      $.ajax({
        method: 'put',
        url: `/qa/answer/${id}/report`,
        success: () => {
          console.log('Thank you for reporting this answer!');
          let tempState = this.state.answerhelpful;
          tempState.push(id);
          this.setState({reportAnswer: tempState});
        }
      });
    } else {
      console.log('You have already reported this answer');
    }
  }

  addQuestionButton(e) {
    console.log('add question button');
    $('.question-modal').css('display', 'block');
  }

  moreQuestions(e) {
    console.log('more answered button');
  }

  moreAnswers(id) {
    if (!this.state.answers[id]) {
      $.ajax({
        method: 'get',
        url: `/qa/questions/${id}/answers`,
        data: {count: 100},
        success: (data) => {
          var answer = {
            'question_id': data.question,
            'results': data.results,
            'index': 1
          };
          if (data.results.length === 3) {
            answer.index = 2;
            $(`.${id}`).append('<div id="3"></div>');
            var root = ReactDOM.createRoot(document.getElementById('3'));
            root.render(<Answer
              answers={data.results}
              answersid={[2]}
              id={id}
              update={this.updateAnswers}
              yesAnswer={this.yesAnswerButton}
              reportAnswer={this.reportAnswerButton}
              moreAnswers={this.moreAnswers}/>
            );
            $(`.moreanswer.${id}`).hide();
          } else {
            answer.index = 3;
            $(`.${id}`).append('<div id="4"></div>');
            var root = ReactDOM.createRoot(document.getElementById('4'));
            root.render(<Answer
              answers={data.results}
              answersid={[2, 3]}
              id={id}
              update={this.updateAnswers}
              yesAnswer={this.yesAnswerButton}
              reportAnswer={this.reportAnswerButton}
              moreAnswers={this.moreAnswers}/>
            );
            if (data.results === 4) {
              $(`.moreanswer.${id}`).hide();
            }
          }
          var currentState = this.state.answers;
          currentState[id] = answer;
          this.setState({answers: currentState});
        }
      });
    } else {
      var moreAnswers = this.state.answers[id];
      if (moreAnswers.results.length === moreAnswers.index + 1) {
        moreAnswers.index++;
        $(`.${id}`).append(`<div id=${moreAnswers.index}></div>`);
        var root = ReactDOM.createRoot(document.getElementById(`${moreAnswers.index}`));
        root.render(<Answer
          answers={moreAnswers.results}
          answersid={[moreAnswers.index]}
          id={id}
          update={this.updateAnswers}
          yesAnswer={this.yesAnswerButton}
          reportAnswer={this.reportAnswerButton}
          moreAnswers={this.moreAnswers}/>
        );
        $(`.moreanswer.${id}`).hide();
      } else {
        moreAnswers.index += 2;
        $(`.${id}`).append(`<div id=${moreAnswers.index}></div>`);
        var root = ReactDOM.createRoot(document.getElementById(`${moreAnswers.index}`));
        root.render(<Answer
          answers={moreAnswers.results}
          answersid={[moreAnswers.index - 1, moreAnswers.index]}
          id={id}
          update={this.updateAnswers}
          yesAnswer={this.yesAnswerButton}
          reportAnswer={this.reportAnswerButton}
          moreAnswers={this.moreAnswers}/>
        );
        if (moreAnswers.results.length === moreAnswers.index + 1) {
          $(`.moreanswer.${id}`).hide();
        }
      }
      var currentState = this.state.answers;
      currentState[id] = moreAnswers;
      this.setState({answers: currentState}, () => {
        console.log(this.state.answers[id]);
      });
    }
  }

  submitAnswer(e) {
    e.preventDefault();
    var name = $('.answer-name').val();
    var body = $('.answer-body').val();
    var email = $('.answer-email').val();
    $.ajax({
      method: 'post',
      url: `/qa/questions/${this.state.currentQuestion}/answers`,
      data: {
        name,
        body,
        email
      },
      success: () => {
        console.log('Answer has been submitted');
        $('.answer-modal').css('display', 'none');
      }
    });
  }

  submitQuestion(e) {
    e.preventDefault();
    var name = $('.question-name').val();
    var body = $('.question-body').val();
    var email = $('.question-email').val();
    $.ajax({
      method: 'post',
      url: '/qa/questions/',
      data: {
        name,
        body,
        email,
        'product_id': this.props.productId
      },
      success: () => {
        console.log('Question has been submitted');
        $('.question-modal').css('display', 'none');
      }
    });
  }


  render() {
    return (
      <div className='qa-container'>
        <div className='qa-paddingleft'>QUESTION & ANSWERS</div><br></br>
        <SearchBar />
        <br></br>
        <br></br>
        <QuestionAnswer
          questions={this.state.questions}
          update={this.updateAnswers}
          yesQuestion={this.yesQuestionButton}
          addAnswer={this.addAnswerButton}
          yesAnswer={this.yesAnswerButton}
          reportAnswer={this.reportAnswerButton}
          moreAnswers={this.moreAnswers}/>
        <br></br>
        <BottomButtons
          questions={this.state.questions}
          addQuestion={this.addQuestionButton}
          more={this.moreQuestions}/>
        <AddAnswer submitAnswer={this.submitAnswer}/>
        <AddQuestion submitQuestion={this.submitQuestion}/>
      </div>
    );
  }
}
