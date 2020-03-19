import { connect } from 'react-redux';
import ClassPlanSelectTypeForm from 'components/classplan/ClassPlanSelectTypeForm';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  selectedClassPlanType: state.classPlan.selectedClassPlanType,
});

const ClassPlanSelectTypeFormContainer = connect(
  mapStateToProps,
)(ClassPlanSelectTypeForm);

export default ClassPlanSelectTypeFormContainer;
