import React from 'react';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';

var questionAnswer = (props) => {
  var id1 = Object.keys(props.questions[0].answers);
  var id2 = Object.keys(props.questions[1].answers);

  return (
    <div>
      <Question questions={props.questions[0]}/>
      <Answer answer={props.questions[0].answers[id1[0]]}/>
      <Userhelpful answer={props.questions[0].answers[id1[0]]}/>
      <br></br>
      <Question questions={props.questions[1]}/>
      <Answer answer={props.questions[1].answers[id2[0]]}/>
      <Userhelpful answer={props.questions[1].answers[id2[0]]}/>
    </div>
  );
};

export default questionAnswer;

// module.exports.questions = {
//   "product_id": "71697",
//   "results": [
//       {
//           "question_id": 641727,
//           "question_body": "Would this work well for deer hunting? ",
//           "question_date": "2022-06-09T00:00:00.000Z",
//           "asker_name": "Tyler93",
//           "question_helpfulness": 4,
//           "reported": false,
//           "answers": {
//               "5986024": {
//                   "id": 5986024,
//                   "body": "I hide in the woods all the time in my camo onesie and no one has ever noticed me!",
//                   "date": "2022-06-09T00:00:00.000Z",
//                   "answerer_name": "sneakyPete",
//                   "helpfulness": 2,
//                   "photos": []
//               },
//               "5986042": {
//                   "id": 5986042,
//                   "body": "Works perfect!",
//                   "date": "2022-06-11T00:00:00.000Z",
//                   "answerer_name": "jack543!",
//                   "helpfulness": 0,
//                   "photos": []
//               },
//               "5986043": {
//                   "id": 5986043,
//                   "body": "So well!",
//                   "date": "2022-06-12T00:00:00.000Z",
//                   "answerer_name": "jack543!",
//                   "helpfulness": 0,
//                   "photos": []
//               },
//               "5986044": {
//                   "id": 5986044,
//                   "body": "so awesome!",
//                   "date": "2022-06-12T00:00:00.000Z",
//                   "answerer_name": "jack543!",
//                   "helpfulness": 0,
//                   "photos": []
//               }
//           }
//       },
//       {
//           "question_id": 641722,
//           "question_body": "Why did you like the product or not?",
//           "question_date": "2022-06-07T00:00:00.000Z",
//           "asker_name": "Example: jackson11!",
//           "question_helpfulness": 2,
//           "reported": false,
//           "answers": {
//               "5986022": {
//                   "id": 5986022,
//                   "body": "People can't see me coming in my new camo onesie!!",
//                   "date": "2022-06-09T00:00:00.000Z",
//                   "answerer_name": "seakySam",
//                   "helpfulness": 1,
//                   "photos": []
//               }
//           }
//       }
//   ]
// };