import { connect } from 'react-redux';
import ViewActivityPage from 'pages/Activity/ViewActivityPage';

import { fetchActivity, deleteActivity } from 'actions/activityAction';
import { showModal, hideModal } from 'actions/modalAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  error: state.classPlan.error,
  activeActivity: state.activity.activeActivity,
  isFetching: state.activity.isFetching,
  userId: state.session.session.user.id,
  user: state.session.session.user,
});

const mapDispatchToProps = (dispatch) => {
  const deleteModalProps = idActivity => ({
    modalProps: {
      open: true,
      title: 'Apagar atividade',
      message: 'Você tem certeza que deseja apagar a atividade',
      id: idActivity,
      deleteAction: () => {
        dispatch(deleteActivity(idActivity, true));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const warningObjectModalProps = () => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'document',
  });

  return ({
    fetchActivity: id => dispatch(fetchActivity(id)),
    showDeleteModal: idActivity => dispatch(showModal(deleteModalProps(idActivity))),

    showWarningObjectModal: () => {
      dispatch(showModal(warningObjectModalProps()));
    },
  });
};

const ViewActivityPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewActivityPage);

export default ViewActivityPageContainer;
