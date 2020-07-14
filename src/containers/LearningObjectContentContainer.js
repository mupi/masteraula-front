import { connect } from 'react-redux';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';
import { addSelectedObjectToQuestion, setObjectIdToNewQuestion } from 'actions/questionAction';
import {
  addSelectedObjectToActivity,
  setObjectIdToNewActivity,
} from 'actions/activityAction';


// state.<reducer's name>.<property>
const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  setObjectIdToNewQuestion: id => dispatch(setObjectIdToNewQuestion(id)),
  addSelectedObjectToQuestion: object => dispatch(addSelectedObjectToQuestion(object)),
  setObjectIdToNewActivity: id => dispatch(setObjectIdToNewActivity(id)),
  addSelectedObjectToActivity: object => dispatch(addSelectedObjectToActivity(object)),
});


const LearningObjectContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningObjectContent);


export default LearningObjectContentContainer;
