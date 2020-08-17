import React from 'react';

import {
  Alert, Row, Col, Button, Form, Label, UncontrolledAlert, UncontrolledTooltip,
} from 'reactstrap';
import { Link, Prompt } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MAMultiSelectTag from 'components/tags/MAMultiSelectTag';
import {
  requiredValidator, minLength3Tags,
} from 'helpers/validators';

import BackUsingHistory from 'components/question/BackUsingHistory';
import QuestionTextRichEditor from 'components/textricheditor/QuestionTextRichEditor';

import { Field } from 'redux-form';

const renderTextEditor = (props) => {
  const {
    placeholderEditor,
    input: { onChange, value }, disabled, id,
    meta: { touched, error, warning },
  } = props;

  return (
    <div>
      <QuestionTextRichEditor
        id={id}
        disabled={disabled}
        placeholder={placeholderEditor}
        onChange={onChange}
        value={value}
      />
      { touched
            && ((error && (
            <span className="error-message-text">
              {error}
            </span>
            ))
            || (warning && (
            <span>
              {' '}
              {warning}
              {' '}
            </span>
            )))
          }
    </div>
  );
};

// Multiselect for Tags field
// touche is not working with multiselectTag
const renderMAMultiSelectTag = ({
  input,
  placeholder,
  meta: {
    error,
  },
}) => (
  <div className="c-create-question__tags">
    <MAMultiSelectTag
      input={input}
      onChange={value => input.onChange(value)}
      placeholder={placeholder}
    />
    { error && (
      <span className="error-message-text">
        {error}
      </span>
    )
       }
  </div>
);


export const fieldFile = ({
  input, type,

  meta: {
    error,
  },
}) => {
  const newInput = input;
  delete newInput.value;

  return (
    <div>
      <label htmlFor={input.name}>
        <input {...newInput} type={type} placeholder="Carregar imagem" />
      </label>
      { error && (
      <span className="error-message-text">
        {error}
      </span>
      )
       }
    </div>
  );
};

/* learning object's structure

owner: 26
source: teste fonte
image: (binary)
folder_name:
text: teste text
object_types: T,I
tags: testetag

*/

const LearningObjectForm = (props) => {
  const {
    pristine,
    handleSubmit,
    submitting, errors,
    actionName,
    activeLearningObject,
    hideMenuOptions = false,
  } = props;
  return (

    <Form onSubmit={handleSubmit}>
      <Prompt
        when={!pristine && !submitting}
        message={`Tem certeza de sair da tela de ${actionName} objeto de aprendizagem?`}
      />
      <div className="c-online c-create-online">
        {!hideMenuOptions && (
        <Row className="c-online__row-header-options c-online__row-header-options--fixed">
          <Col className="c-online__col-header-options">
            <BackUsingHistory disabled={submitting} />
            <Button className="btn btn-secondary c-online__btn-back" type="submit" disabled={submitting}>
              <FontAwesomeIcon
                className="btn__icon"
                icon="save"
              />
              {' '}
                  Salvar
            </Button>
          </Col>
        </Row>
        )}
        <Row className={!hideMenuOptions ? 'c-online__tittle-section c-online--space-for-title' : ''}>
          <Col>
            <h4>
              <FontAwesomeIcon icon="image" />
              {` ${actionName} Objeto de aprendizagem`}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            { (!pristine && !submitting) ? (
              <Alert color="warning" className="c-online-edit__warning-message">
                      Existem mudanças ainda não salvas no objeto de aprendizagem
              </Alert>
            ) : ''
                          }
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h5>
              <FontAwesomeIcon icon="photo-video" />
              {' '}
              Textos, imagens e links
            </h5>
            <div className="border-top my-3" />

          </Col>
        </Row>
        <Row className="no-gutters">
          <Col sm="4">
            <p className="c-learning-object__form-labels">Imagem</p>
            <div className="c-learning-object__form-image-section">
              <Label for="upload-avatar" className="upload-avatar">
                <div className="thumbnail c-user-profile__avatar">
                  { activeLearningObject && activeLearningObject.image
                    && <img src={activeLearningObject.image} alt="objeto" id="objeto" />
                    }
                </div>
                <FontAwesomeIcon
                  className="btn__icon"
                  icon="image"
                />
                    Enviar objeto
              </Label>
              <div className="small-text ">
                  Tamanho máximo 1 MB. (JPG, GIF ou PNG)
              </div>
              <Field
                component={fieldFile}
                type="file"
                name="image"
                id="image"
                className="form-control"
              />
            </div>
          </Col>
          <Col sm="8">
            <p className="c-learning-object__form-labels">
              Insira trechos de textos, letras de música ou link para o vídeo
              <span href="#" id="TooltipExample">
                {' '}
                <FontAwesomeIcon icon="info-circle" size={12} />
              </span>
              <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipExample">
                Texto ou vídeo: é um editor de texto para inserir texto ou vídeos de youtube embebed.
              </UncontrolledTooltip>
            </p>
            <Field
              component={renderTextEditor}
              name="text"
              key="field"
              id="textObjectEditorText"
              disabled={false}
              placeholderEditor="Escreva trechos de textos, letras de música ou link para o vídeo aqui ..."
              // validate={requiredValidator}
            />
          </Col>
        </Row>
        <Row className="c-question__tittle-section">
          <Col>
            <h5>
              <span href="#" id="TooltipBasicInfo">
                {' '}
                <FontAwesomeIcon icon="info-circle" size={12} />
              </span>
              {' '}
              Informações básicas
              <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipBasicInfo">
              Descreva detalhadamente as informações de autoria, inclusive o link, se houver, da fonte deste objeto.
              </UncontrolledTooltip>
            </h5>
            <div className="border-top my-3" />

          </Col>
        </Row>
        <Row className="mt-2 mb-3">
          <Col>
            Fontes e referências
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="12" md="12" xs="12" className="c-question__col-full-section-details c-learning-object__form-references">
            <Field
              component={renderTextEditor}
              name="source"
              key="field"
              id="referencesEditorText"
              disabled={false}
              placeholderEditor="Escreva as referências do objeto aqui ..."
              validate={requiredValidator}
            />
          </Col>
        </Row>
        <Row className="c-create-question__row-info mt-4 align-items-center">
          <Col className="info-label" sm="4" xs="4">
            Tags
            <span href="#" id="TooltipTag">
              {' '}
              <FontAwesomeIcon icon="info-circle" size={12} />
            </span>
            <UncontrolledTooltip className="tooltip__message" placement="right" target="TooltipTag">
              {'Insira palavras-chaves que descrevam o tipo de material, como por exemplo, "poesia, letra de música, rap nacional'}
            </UncontrolledTooltip>
          </Col>
          <Col sm="8" xs="8">
            <Field
              component={renderMAMultiSelectTag}
              name="tags"
              id="tags"
              placeholder="Dê enter ou vírgula após inserir uma tag"
              className="form-control"
              validate={minLength3Tags}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {errors && errors.general_errors && !submitting && (
            <UncontrolledAlert color="danger">
              {errors.general_errors}
            </UncontrolledAlert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            { (!pristine && !submitting) ? (
              <Alert color="warning" className="c-online-edit__warning-message">
                      Existem mudanças ainda não salvas no objeto de aprendizagem
              </Alert>
            ) : ''
                          }
          </Col>
        </Row>
      </div>
      <Row className="c-online__row-footer-options text-center">
        <Col>
          <p>
            <small>
              {`Ao ${actionName.toLowerCase()} o objeto de aprendizagem você estará de acordo com os `}
              {' '}
              <Link target="_blank" to="/terms-use">termos de uso</Link>
            </small>
          </p>
        </Col>
      </Row>

      <Row className="c-online__row-footer-options text-center">
        <Col>
          <Button type="submit" title="Salvar objeto" className="btn-secondary btn-margin-right" disabled={submitting}>
            <FontAwesomeIcon
              className="btn__icon"
              icon="save"
            />
            <span>
                Salvar
            </span>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LearningObjectForm;
