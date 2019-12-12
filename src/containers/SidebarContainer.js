import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';
import { clearSelectedFilters, clearSearch } from 'actions/filterAction';
import { showModal, hideModal } from 'actions/modalAction';
import { setQuestionIdToNewDocument } from 'actions/documentAction';
import {
  listMyQuestionLabels,
  createMyQuestionLabel,
  updateMyQuestionLabel,
  deleteMyQuestionLabel,
} from 'actions/labelAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  user: state.session.session.user,
  activeDocument: state.document.activeDocument,
  isOpenSidebar: state.menu.isOpenSidebar,
  isFetchingQuestions: state.question.isFetching,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.count : 0,

  /* Labels */
  myQuestionLabels: state.label.myQuestionLabels,
  isFetchingMyQuestionLabels: state.label.isFetchingMyQuestionLabels,
});

const mapDispatchToProps = (dispatch) => {
  const createDocumentModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createDocument',
  };

  const createMyQuestionLabelModalProps = {
    modalProps: {
      open: true,
      title: 'Criar etiqueta',
      submit: (values) => {
        dispatch(createMyQuestionLabel(values));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createMyQuestionLabelModal',
  };

  const editMyQuestionLabelModalProps = {
    modalProps: {
      open: true,
      title: 'Editar etiqueta',
      submit: (values) => {
        dispatch(updateMyQuestionLabel(values));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createMyQuestionLabelModal',
  };


  const deleteMyQuestionLabelModalProps = (idLabel, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar etiqueta',
      message: 'Você tem certeza que deseja apagar a etiqueta',
      name,
      idLabel,
      deleteAction: () => dispatch(deleteMyQuestionLabel(idLabel)),
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  return ({
    toggleMenu: isOpen => dispatch(toggleMenu(isOpen)),
    openSidebar: isOpenSidebar => dispatch(openSidebar(isOpenSidebar)),
    logout: () => dispatch(logout()),
    cleanAllSearch: () => {
      dispatch({
        type: '@@redux-form/CHANGE',
        payload: null,
        meta: { form: 'questionSearch', field: 'searchText' },
      });
      dispatch(clearSearch());
      dispatch(clearSelectedFilters());
    },
    // new way to handle modals
    showCreateDocumentModal: () => dispatch(showModal(createDocumentModalProps)),
    setQuestionIdToNewDocument: () => dispatch(setQuestionIdToNewDocument()),

    // Labels
    showCreateMyQuestionLabelModal: () => dispatch(showModal(createMyQuestionLabelModalProps)),
    showUpdateMyQuestionLabelModal: () => dispatch(showModal(editMyQuestionLabelModalProps)),
    showDeleteMyQuestionLabelModal: (idDocument, name) => dispatch(showModal(deleteMyQuestionLabelModalProps(idDocument, name))),
    listMyQuestionLabels: () => dispatch(listMyQuestionLabels()),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
