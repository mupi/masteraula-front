import { connect } from 'react-redux';
import Sidebar from 'components/sidebar/Sidebar';
import { logout } from 'actions/loginAction';
import { toggleMenu, openSidebar, sidebarOptionSelected } from 'actions/menuAction';
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

import {
  selectClassPlanType,
  resetClassPlanType,
} from 'actions/classPlanAction';


// state.<reducer's name>.<property>
const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
  user: state.session.session ? state.session.session.user : null,
  activeDocument: state.document.activeDocument,
  isOpenSidebar: state.menu.isOpenSidebar,
  idSidebar: state.menu.idSidebar,
  isFetchingQuestions: state.question.isFetching,
  quantityDocxDownloaded: state.document.numberDocxDownloaded ? state.document.numberDocxDownloaded.count : 0,

  /* Labels */
  myQuestionLabels: state.label.myQuestionLabels,
  isFetchingMyQuestionLabels: state.label.isFetchingMyQuestionLabels,

  /* Class plan */
  selectedClassPlanType: state.classPlan.selectedClassPlanType,
});

const mapDispatchToProps = (dispatch) => {
  const createDocumentModalProps = {
    modalProps: {
      open: true,
      closeModal: () => dispatch(hideModal()),
    },
    modalType: 'createDocument',
  };

  const createClassPlanModalProps = selectedClassPlanType => ({
    modalProps: {
      open: true,
      title: 'Criar plano de aula',
      nameAction: 'Criar',
      selectClassPlanType: type => dispatch(selectClassPlanType(type)),
      closeModal: () => { dispatch(hideModal()); dispatch(resetClassPlanType()); },
      selectedClassPlanType,
    },
    modalType: 'createClassPlanModal',
  });

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
    sidebarOptionSelected: idSidebar => dispatch(sidebarOptionSelected(idSidebar)),
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

    // Open Modal for selection class plan's type
    showCreateClassPlanModal: selectedClassPlanType => dispatch(showModal(createClassPlanModalProps(selectedClassPlanType))),


    /* showCreateClassPlanModal: () => {
      dispatch((_dispatch, getState) => {
        _dispatch(showModal(createClassPlanModalProps(getState().classPlan.selectedClassPlanType)));
      });
    }, */
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
