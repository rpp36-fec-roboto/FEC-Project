import React from 'react';
import SearchBar from './searchbar.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';

class Qna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>QNA</div>
        <SearchBar />
        <QuestionAnswer />
        <BottomButtons />
      </div>
    );
  }
}

export default Qna;