import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';


const ExportDocumentButton = ({documentId}) =>
<div className="btn-float">
        <Button title="Exportar documento">
          <i className="fa fa-plus"></i>
        </Button>
</div>

export default ExportDocumentButton
