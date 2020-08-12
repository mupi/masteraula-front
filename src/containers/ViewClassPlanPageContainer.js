import { connect } from 'react-redux';
import ViewClassPlanPage from 'pages/ClassPlan/ViewClassPlanPage';

import { fetchClassPlan, deleteClassPlan, generatePublicLink } from 'actions/classPlanAction';
import { showModal, hideModal } from 'actions/modalAction';
import {
  switchActiveDocument, fetchPreviewDocument,
} from 'actions/documentAction';
import { fetchActivity } from 'actions/activityAction';
import { fetchOnlineTest } from 'actions/onlineTestAction';

// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  error: state.classPlan.error,
  activeClassPlan: state.classPlan.activeClassPlan,
  isFetching: state.classPlan.isFetching,
  userId: state.session.session.user.id,
  user: state.session.session.user,
  publicLink: state.classPlan.activeClassPlan && state.classPlan.activeClassPlan.link_class_plan
    ? state.classPlan.activeClassPlan.link_class_plan : state.classPlan.publicLink,
  quantityUsedPublicLinks: state.classPlan.numberClassPlanPublicLinks ? state.classPlan.numberClassPlanPublicLinks.count : 0,
  isPremium: state.session.session && state.session.session.user ? state.session.session.user.subscription : null,
});

const mapDispatchToProps = (dispatch) => {
  const alertModalProps = message => ({
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
      title: 'Gerar link público',
      message,
    },
    modalType: 'alert',
  });
  const deleteModalProps = (idClassPlan, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar plano de aula',
      message: 'Você tem certeza que deseja apagar o plano de aula',
      name,
      id: idClassPlan,
      deleteAction: () => {
        dispatch(deleteClassPlan(idClassPlan, true));
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const activityModalProps = idActivity => ({
    modalProps: {
      open: true,
      idActivity,
      fetchActivity: () => {
        dispatch(fetchActivity(idActivity));
      },
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'activity',
  });

  const onlineTestModalProps = idOnlineTest => ({
    modalProps: {
      open: true,
      idOnlineTest,
      fetchOnlineTest: () => {
        dispatch(fetchOnlineTest(idOnlineTest));
      },
      closeModal: () => {
        dispatch(hideModal());
      },
    },
    modalType: 'onlineTest',
  });

  const documentModalProps = document => ({
    modalProps: {
      open: true,
      document,
      editDocument: () => {
        dispatch(switchActiveDocument(document));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'document',
  });

  return ({
    fetchClassPlan: id => dispatch(fetchClassPlan(id)),
    showDeleteModal: (idClassPlan, name) => dispatch(showModal(deleteModalProps(idClassPlan, name))),

    showDocumentModal: (id) => {
      dispatch(fetchPreviewDocument(parseInt(id, 10)));
      dispatch((_dispatch, getState) => {
        _dispatch(showModal(documentModalProps(getState().document.previewDocument)));
      });
    },
    showActivityModal: idActivity => dispatch(showModal(activityModalProps(idActivity))),
    showOnlineTestModal: idOnlineTest => dispatch(showModal(onlineTestModalProps(idOnlineTest))),
    generatePublicLink: id => dispatch(generatePublicLink(id)),
    showAlertModal: message => dispatch(showModal(alertModalProps(message))),

  });
};

const ViewClassPlanPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewClassPlanPage);

export default ViewClassPlanPageContainer;
