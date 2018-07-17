import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';


const ExportDocumentButton = ({documentId}) =>
  <Button color="secondary"><i className="fa fa-download"></i> Exportar</Button>

export default ExportDocumentButton
