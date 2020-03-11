import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar } from 'actions/menuAction';
import { clearSelectedFilters, clearSearch, addSelectedMyQuestionLabelFilter } from 'actions/filterAction';
import { showModal, hideModal } from 'actions/modalAction';
import { setQuestionIdToNewDocument } from 'actions/documentAction';
import {
  listMyQuestionLabels,
  createMyQuestionLabel,
  updateMyQuestionLabel,
  deleteMyQuestionLabel,
} from 'actions/labelAction';
import { history } from 'helpers';


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

  /* Options for Labels */
  const createMyQuestionLabelModalProps = {
    modalProps: {
      open: true,
      title: 'Criar etiqueta',
      nameAction: 'Criar',
      submit: (values) => {
        dispatch(createMyQuestionLabel(values));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createMyQuestionLabelModal',
  };

  const updateMyQuestionLabelModalProps = label => ({
    modalProps: {
      open: true,
      title: 'Editar etiqueta',
      nameAction: 'Salvar',
      label,
      submit: (props) => {
        dispatch(updateMyQuestionLabel(props));
        dispatch(hideModal());
      },
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createMyQuestionLabelModal',
  });


  const deleteMyQuestionLabelModalProps = (idLabel, name) => ({
    modalProps: {
      open: true,
      title: 'Apagar etiqueta',
      message: 'Você tem certeza que deseja apagar a etiqueta',
      name,
      id: idLabel,
      deleteAction: () => dispatch(deleteMyQuestionLabel(idLabel)),
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'delete',
  });

  const addMyQuestionLabelFilter = (label) => {
    history.replace('/question-base/1');
    return dispatch(addSelectedMyQuestionLabelFilter(label));
  };

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
    showUpdateMyQuestionLabelModal: label => dispatch(showModal(updateMyQuestionLabelModalProps(label))),
    showDeleteMyQuestionLabelModal: (idDocument, name) => dispatch(showModal(deleteMyQuestionLabelModalProps(idDocument, name))),
    listMyQuestionLabels: () => dispatch(listMyQuestionLabels()),
    addSelectedMyQuestionLabelFilter: label => dispatch(addMyQuestionLabelFilter(label)),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
