import React from 'react';
import SearchBar from './searchbar.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';
import AddAnswer from './addAnswer.jsx';
import data from '../../data/sampleData.js';
import $ from 'jquery';


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
  }

  moreQuestions(e) {
    console.log('more answered button');
  }

  moreAnswers(e) {
    console.log('more answers button');
  }

  submitAnswer(e) {
    e.preventDefault();
    var name = $('.qa-name').val();
    var body = $('.qa-body').val();
    var email = $('.qa-email').val();
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



  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Qna;



// "results": [
//   {
//       "question_id": 641727,
//       "question_body": "Would this work well for deer hunting? ",
//       "question_date": "2022-06-09T00:00:00.000Z",
//       "asker_name": "Tyler93",
//       "question_helpfulness": 4,
//       "reported": false,
//       "answers": {
//           "5986024": {
//               "id": 5986024,
//               "body": "I hide in the woods all the time in my camo onesie and no one has ever noticed me!",
//               "date": "2022-06-09T00:00:00.000Z",
//               "answerer_name": "sneakyPete",
//               "helpfulness": 2,
//               "photos": []
//           },
//           "5986042": {
//               "id": 5986042,
//               "body": "Works perfect!",
//               "date": "2022-06-11T00:00:00.000Z",
//               "answerer_name": "jack543!",
//               "helpfulness": 0,
//               "photos": []
//           },
//           "5986043": {
//               "id": 5986043,
//               "body": "So well!",
//               "date": "2022-06-12T00:00:00.000Z",
//               "answerer_name": "jack543!",
//               "helpfulness": 0,
//               "photos": []
//           },
//           "5986044": {
//               "id": 5986044,
//               "body": "so awesome!",
//               "date": "2022-06-12T00:00:00.000Z",
//               "answerer_name": "jack543!",
//               "helpfulness": 0,
//               "photos": []
//           }
//       }
//   },
//   {
//       "question_id": 641722,
//       "question_body": "Why did you like the product or not?",
//       "question_date": "2022-06-07T00:00:00.000Z",
//       "asker_name": "Example: jackson11!",
//       "question_helpfulness": 2,
//       "reported": false,
//       "answers": {
//           "5986022": {
//               "id": 5986022,
//               "body": "People can't see me coming in my new camo onesie!!",
//               "date": "2022-06-09T00:00:00.000Z",
//               "answerer_name": "seakySam",
//               "helpfulness": 1,
//               "photos": []
//           }
//       }
//   }
// ]

// module.exports.answers = {
//   "question": "641727",
//   "page": 1,
//   "count": 5,
//   "results": [
//       {
//           "answer_id": 5986024,
//           "body": "I hide in the woods all the time in my camo onesie and no one has ever noticed me!",
//           "date": "2022-06-09T00:00:00.000Z",
//           "answerer_name": "sneakyPete",
//           "helpfulness": 2,
//           "photos": []
//       },
//       {
//           "answer_id": 5986042,
//           "body": "Works perfect!",
//           "date": "2022-06-11T00:00:00.000Z",
//           "answerer_name": "jack543!",
//           "helpfulness": 0,
//           "photos": []
//       },
//       {
//           "answer_id": 5986043,
//           "body": "So well!",
//           "date": "2022-06-12T00:00:00.000Z",
//           "answerer_name": "jack543!",
//           "helpfulness": 0,
//           "photos": []
//       },
//       {
//           "answer_id": 5986044,
//           "body": "so awesome!",
//           "date": "2022-06-12T00:00:00.000Z",
//           "answerer_name": "jack543!",
//           "helpfulness": 0,
//           "photos": []
//       }
//   ]
// };