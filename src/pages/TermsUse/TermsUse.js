import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCleanCompleteStatement } from 'helpers/question';

/* eslint-disable react/no-danger */

const TermsUse = ({ styleClass, termsUseList }) => (
  <div className={styleClass}>
    <h3>
      <FontAwesomeIcon icon="thumbs-up" />
      {' '}
      Damos boas-vindas à plataforma Masteraula.
    </h3>
    {termsUseList && (
    <>
      <div dangerouslySetInnerHTML={{ __html: getCleanCompleteStatement(termsUseList.content) }} />

      <p className="date-update-terms">
        Atualizado em:
        {' '}
        {termsUseList.last_update}
      </p>
    </>
    )
  }
  </div>
);
export default TermsUse;
