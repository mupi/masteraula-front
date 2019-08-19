import { connect } from 'react-redux';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';
import { addSelectedObjectToQuestion, setObjectIdToNewQuestion } from 'actions/questionAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  setObjectIdToNewQuestion: id => dispatch(setObjectIdToNewQuestion(id)),
  addSelectedObjectToQuestion: object => dispatch(addSelectedObjectToQuestion(object)),
});


const LearningObjectContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningObjectContent);


export default LearningObjectContentContainer;
