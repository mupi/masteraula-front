import { connect } from 'react-redux';
import { setObjectIdToNewQuestion } from 'actions/learningObjectAction';
import LearningObjectContent from 'components/learningObject/LearningObjectContent';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

  setObjectIdToNewQuestion: () => dispatch(setObjectIdToNewQuestion()),

});


const LearningObjectContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningObjectContent);


export default LearningObjectContentContainer;
