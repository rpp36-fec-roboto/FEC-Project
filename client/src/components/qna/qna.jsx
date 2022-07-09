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