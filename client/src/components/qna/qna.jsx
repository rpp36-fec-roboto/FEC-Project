import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchBar from './searchbar.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';
import AddAnswer from './addAnswer.jsx';
import AddQuestion from './addQuestion.jsx';
import data from '../../mockFiles/sampleData.js';
import Answer from './answer.jsx';
import Question from './question.jsx';
import $ from 'jquery';
import imgur from '../../../../server/imgur.js';

import withTracker from '../../components/Sharables/withTracker.js';

class Qna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: data.questions.results,
      unfilteredQ: [],
      answers: {},
      questionhelpful: [],
      answerhelpful: [],
      reportAnswer: [],
      currentQuestionId: '',
      currentQuestionBody: '',
      qIndex: '',
      files: []
    };
    this.yesQuestionButton = this.yesQuestionButton.bind(this);
    this.addAnswerButton = this.addAnswerButton.bind(this);
    this.yesAnswerButton = this.yesAnswerButton.bind(this);
    this.reportAnswerButton = this.reportAnswerButton.bind(this);
    this.addQuestionButton = this.addQuestionButton.bind(this);
    this.moreQuestions = this.moreQuestions.bind(this);
    this.moreAnswers = this.moreAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.input = this.input.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
  }
  updateQNA() {
    $.ajax({
      method: 'get',
      url: '/qa/questions',
      data: {
        'product_id': this.props.productId,
        count: 50
      },
      success: (data) => {
        data.results.sort(function(a, b) {
          return b.question_helpfulness - a.question_helpfulness;
        });
        var qIndex = 1;
        if (data.results.length === 1) {
          qIndex = 0;
        }
        this.setState({
          questions: data.results,
          unfilteredQ: data.results,
          qIndex});
      }
    });
  }

  componentDidMount() {
    this.updateQNA();
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.updateQNA();
    }
  }

  input(e) {
    var query = e.target.value.toLowerCase();
    if (query.length >= 3) {
      var questions = this.state.questions;
      var filtered = [];
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].question_body.includes(query)) {
          filtered.push(questions[i]);
        }
      }
      this.setState({questions: filtered});
    } else {
      var data = this.state.unfilteredQ;
      this.setState({questions: data});
    }
  }

  yesQuestionButton(qid, num) {
    if (!this.state.questionhelpful.includes(qid)) {
      $.ajax({
        method: 'put',
        url: `/qa/questions/${qid}/helpful`,
        success: () => {
          console.log('Thank you for marking this helpful!');
          let tempState = this.state.questionhelpful;
          tempState.push(qid);
          num++;
          var text = `(${num})`;
          $(`.help.${qid}`)[0].innerText = text;
          this.setState({questionhelpful: tempState});
        }
      });
    } else {
      console.log('You have already marked this as helpful');
    }

  }

  addAnswerButton(qid, body) {
    $('.answer-modal').css('display', 'block');
    this.setState({
      currentQuestionId: qid,
      currentQuestionBody: body});
  }

  yesAnswerButton(id, num) {
    if (!this.state.answerhelpful.includes(id)) {
      $.ajax({
        method: 'put',
        url: `/qa/answer/${id}/helpful`,
        success: () => {
          console.log('Thank you for marking this helpful!');
          let tempState = this.state.answerhelpful;
          tempState.push(id);
          num++;
          var text = `(${num})`;
          $(`.helpanswer.${id}`)[0].innerText = text;
          this.setState({answerhelpful: tempState});
          // change number ++ and yes button to clicked?
        }
      });
    } else {
      console.log('You have already marked this as helpful');
    }
  }

  reportAnswerButton(id) {
    if (!this.state.reportAnswer.includes(id)) {
      $.ajax({
        method: 'put',
        url: `/qa/answer/${id}/report`,
        success: () => {
          console.log('Thank you for reporting this answer!');
          $(`.${id}`).text('Reported');
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
    $('.question-modal').css('display', 'block');
  }

  moreQuestions(e) {
    var index = this.state.qIndex;
    if (this.state.questions.length === index + 2) {
      index++;

      $('.questions').append(`<div id=question${index} data-testid="morequestions"></div>`);

      var root = ReactDOM.createRoot(document.getElementById(`question${index}`));

      var id1 = Object.keys(this.state.questions[index].answers);

      if (id1.length > 1) {
        id1.sort(function(a, b) {
          return this.state.questions[index].b.helpfulness - this.state.questions[index].a.helpfulness;
        });
      }

      root.render(
        <div className={`question${index}`}>
          <br></br>
          <Question
            questions={this.state.questions[index]}
            yesQuestion={this.yesQuestionButton}
            addAnswer={this.addAnswerButton}/>
          <Answer
            answers={this.state.questions[index].answers}
            answersid={id1}
            id={this.state.questions[index].question_id}
            yesAnswer={this.yesAnswerButton}
            reportAnswer={this.reportAnswerButton}
            moreAnswers={this.moreAnswers}/>
        </div>
      );
      $('.morequestions').hide();
    } else {
      index += 2;
      $('.questions').append(`<div id=question${index} data-testid="morequestions"></div>`);

      var root = ReactDOM.createRoot(document.getElementById(`question${index}`));

      var id1 = Object.keys(this.state.questions[index - 1].answers);
      var id2 = Object.keys(this.state.questions[index].answers);
      var questions1 = this.state.questions[index - 1];
      var questions2 = this.state.questions[index];

      if (id1.length > 1) {
        id1.sort(function(a, b) {
          return questions1.answers[b].helpfulness - questions1.answers[a].helpfulness;
        });
      }

      if (id2.length > 1) {
        id2.sort(function(a, b) {
          return questions2.answers[b].helpfulness - questions2.answers[a].helpfulness;
        });
      }

      root.render(
        <div>
          <br></br>
          <div className={`question${index - 1}`}>
            <Question
              questions={questions1}
              yesQuestion={this.yesQuestionButton}
              addAnswer={this.addAnswerButton}/>
            <Answer
              answers={questions1.answers}
              answersid={id1}
              id={questions1.question_id}
              yesAnswer={this.yesAnswerButton}
              reportAnswer={this.reportAnswerButton}
              moreAnswers={this.moreAnswers}/>
          </div><br></br>
          <div className={`question${index}`}>
            <Question
              questions={questions2}
              yesQuestion={this.yesQuestionButton}
              addAnswer={this.addAnswerButton}/>
            <Answer
              answers={questions2.answers}
              answersid={id2}
              id={questions2.question_id}
              yesAnswer={this.yesAnswerButton}
              reportAnswer={this.reportAnswerButton}
              moreAnswers={this.moreAnswers}/>
          </div>
        </div>
      );
      if (this.state.questions.length === index + 1) {
        $('.morequestions').hide();
      }
    }
    $('.questions').addClass('questions-clicked');
    this.setState({qIndex: index});
  }

  moreAnswers(id) {
    if (!this.state.answers[id]) {
      $.ajax({
        method: 'get',
        url: `/qa/questions/${id}/answers`,
        data: {count: 50},
        success: (data) => {
          var answer = {
            'question_id': data.question,
            'results': data.results
          };
          $(`.${id}.all`).append('<div id="more" data-testid="moreanswers"></div>');
          $(`.${id}.normal`).css({display: 'none'});
          if (data.results.length > 4) {
            $(`.${id}.all`).addClass('answers-clicked overflowtrue');
          }
          var root = ReactDOM.createRoot(document.getElementById('more'));
          root.render(<Answer
            answers={data.results}
            id={id}
            yesAnswer={this.yesAnswerButton}
            reportAnswer={this.reportAnswerButton}
            moreAnswers={this.moreAnswers}
            more={true}/>
          );
          var currentState = this.state.answers;
          currentState[id] = answer;
          this.setState({answers: currentState});
        }
      });
    } else {
      if ($(`.${id}.normal`).is(':hidden')) {
        if ($(`.${id}.all`).hasClass('overflowtrue')) {
          $(`.${id}.all`).removeClass('answers-clicked');
        }
        $(`.${id}.normal`).css({display: 'block'});
        $(`.${id}.more`).css({display: 'none'});
      } else {
        if ($(`.${id}.all`).hasClass('overflowtrue')) {
          $(`.${id}.all`).addClass('answers-clicked');
        }
        $(`.${id}.normal`).css({display: 'none'});
        $(`.${id}.more`).css({display: 'block'});
      }
    }
  }

  submitAnswer(e) {
    e.preventDefault();
    var name = $('.answer-name').val();
    var body = $('.answer-body').val();
    var email = $('.answer-email').val();
    var message = 'You must enter the following:';
    var nameBool = true;
    var bodyBool = true;
    var emailBool = true;
    if (!email.includes('@') ||
      (!email.includes('.com') &&
      !email.includes('.net') &&
      !email.includes('.org'))) {
      emailBool = false;
      message += '\n Your email';
    }
    if (!name) {
      nameBool = false;
      message += '\n What is your nickname';
    }
    if (!body) {
      bodyBool = false;
      message += '\n Your Question';
    }
    if (!emailBool || !nameBool || !bodyBool) {
      alert(message);
    } else {
      $.ajax({
        method: 'post',
        url: `/qa/questions/${this.state.currentQuestionId}/answers`,
        data: {
          name,
          body,
          email,
          photos: this.state.files
        },
        success: () => {
          console.log('Answer has been submitted');
          $('.answer-modal').css('display', 'none');
        }
      });
    }
  }

  submitQuestion(e) {
    e.preventDefault();
    var name = $('.question-name').val();
    var body = $('.question-body').val();
    var email = $('.question-email').val();
    var message = 'You must enter the following:';
    var nameBool = true;
    var bodyBool = true;
    var emailBool = true;
    if (!email.includes('@') ||
      (!email.includes('.com') &&
      !email.includes('.net') &&
      !email.includes('.org'))) {
      emailBool = false;
      message += '\n Your email';
    }
    if (!name) {
      nameBool = false;
      message += '\n What is your nickname';
    }
    if (!body) {
      bodyBool = false;
      message += '\n Your Question';
    }
    if (!emailBool || !nameBool || !bodyBool) {
      alert(message);
    } else {
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
  }

  fileHandler(e) {
    var file = new FormData();
    file.append('image', e.target.files[0], e.target.files[0].name);
    imgur.postData(file, (err, data) => {
      if (err) {
        console.log('Error uploading photo');
        console.log(err);
      } else {
        var picture = data.data.data.link;
        var files = this.state.files;
        files.push(picture);
        this.setState({files: files});
        console.log('uploaded picture');
        console.log(picture)
      }
    });
  }


  render() {
    return (
      <div className='qa-container'>
        <div className='qa-paddingleft'>QUESTION & ANSWERS</div><br></br>
        <SearchBar query={this.input}/>
        <br></br>
        <br></br>
        <QuestionAnswer
          questions={this.state.questions}
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
        <AddAnswer
          submitAnswer={this.submitAnswer}
          productName={this.props.productInfo}
          body={this.state.currentQuestionBody}
          fileHandler={this.fileHandler}/>
        <AddQuestion
          submitQuestion={this.submitQuestion}
          productName={this.props.productInfo} />
      </div>
    );
  }
}

const QnaWithTracker = withTracker(Qna, 'qna');

export default QnaWithTracker;