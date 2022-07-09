import React from 'react';
import SearchBar from './searchbar.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';
import data from '../../data/sampleData.js';
import $ from 'jquery';


class Qna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: data.questions.results,
      answers: {}
    };
    this.updateAnswers = this.updateAnswers.bind(this);
    this.yesQuestionButton = this.yesQuestionButton.bind(this);
    this.addAnswerButton = this.addAnswerButton.bind(this);
    this.yesAnswerButton = this.yesAnswerButton.bind(this);
    this.reportAnswerButton = this.reportAnswerButton.bind(this);
    this.addQuestionButton = this.addQuestionButton.bind(this);
    this.moreQuestions = this.moreQuestions.bind(this);
    this.moreAnswers = this.moreAnswers.bind(this);
  }

  componentDidMount() {
    //get request to get all question/answers
    $.ajax({
      url: '/qa/questions',
      data: {'product_id': this.props.productId},
      success: (data) => {
        data.results.sort(function(a, b) {
          return b.question_helpfulness - a.question_helpfulness;
        });
        console.log(data);
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

  yesQuestionButton(e) {
    console.log('yes question button');
  }

  addAnswerButton(e) {
    console.log('add answer button');
  }

  yesAnswerButton(e) {
    console.log('yes answer button');
  }

  reportAnswerButton(e) {
    console.log('report answer button');
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