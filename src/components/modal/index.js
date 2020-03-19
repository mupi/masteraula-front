import searchObjectModal from 'containers/SearchLearningObjectModalContainer';
import searchDocumentModal from 'containers/SearchDocumentModalContainer';

import alertModal from './AlertModal';
import confirmModal from './ConfirmModal';
import deleteModal from './DeleteModal';
import promptModal from './PromptModal';
import documentModal from './DocumentModal';
import exportDocumentModal from './ExportDocumentModal';
import last5DocumentsModal from './Last5DocumentsModal';
import register2Modal from './Register2Modal';
import login2Modal from './Login2Modal';
import createDocument from './CreateDocumentModal';
import createMyQuestionLabelModal from './CreateMyQuestionLabelModal';
import createClassPlanModal from './CreateClassPlanModal';

const modalTypes = {
  alertModal,
  confirmModal,
  deleteModal,
  promptModal,
  documentModal,
  exportDocumentModal,
  last5DocumentsModal,
  register2Modal,
  login2Modal,
  createDocument,
  searchObjectModal,
  createMyQuestionLabelModal,
  searchDocumentModal,
  createClassPlanModal,
};

export default modalTypes;
