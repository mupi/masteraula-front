import React from 'react';
import {
  Button, FormGroup, Input,
} from 'reactstrap';

const CreateDocumentForm = ({messageWhenDocumentExist=null}) => (
  <div>
    {messageWhenDocumentExist}
    <p className="text-center">
      Por favor, insira um nome para o novo documento a ser criado
    </p>
    <FormGroup>
      <Input
        component="input"
        type="text"
        name="documentName"
        id="documentName"
        placeholder="Digite o nome do documento"
        className="form-control"
      />
    </FormGroup>

    <div className="document__new-document-modal-footer modal-footer">
      <Button color="" className="btn--confirm">Criar</Button>{' '}
      <Button color="secondary">Cancelar</Button>
    </div>
  </div>
);
export default CreateDocumentForm;
