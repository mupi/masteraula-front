import React from 'react';
import { Button, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { maxDocxFreePlan } from 'helpers/config';

const ExportDocumentButton = ({
  documentId, color, text, documentName, documentTotalQuestions, styleCustomize, isLink = false,
  showAlertModal, showExportDocumentModalProps, quantityDocxDownloaded, isPremium,
}) => {
  const noQuestionString = `Não é possível exportar porque a prova "${documentName}" não tem questões`;
  const freePlanLimitString = `Você atingiu seu limite máximo de ${maxDocxFreePlan} downloads (*.docx) por mês. Atualize seu plano gratuito para Premium`;
  const documentTooLongString = 'Não é possível fazer um download de uma prova com mais de 30 questões. Retire algumas questões e tente novamente';

  const handleClick = () => {
    if (!isPremium && quantityDocxDownloaded === maxDocxFreePlan) {
      showAlertModal(freePlanLimitString);
      return;
    }

    if (documentTotalQuestions <= 0) {
      showAlertModal(noQuestionString);
    } else if (documentTotalQuestions > 30) {
      showAlertModal(documentTooLongString);
    } else {
      showExportDocumentModalProps(documentId, documentName);
    }
  };

  return (
    !isLink
      ? (
        <Button color={color} onClick={handleClick} className={styleCustomize} title="Exportar prova">
          {text ? <FontAwesomeIcon icon="file-word" className="btn__icon" /> : <FontAwesomeIcon icon="file-word" />}
          {text}
        </Button>
      ) : (
        <DropdownItem color={color} onClick={handleClick} className={styleCustomize} title="Exportar prova">
          {text ? <FontAwesomeIcon icon="file-word" className="btn__icon" /> : <FontAwesomeIcon icon="file-word" />}
          {text}
        </DropdownItem>
      )

  );
};
export default ExportDocumentButton;
