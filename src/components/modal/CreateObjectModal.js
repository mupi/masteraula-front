import React from 'react';
import { connect } from 'react-redux';
import {
  reduxForm, SubmissionError,
} from 'redux-form';
import { createLearningObject } from 'actions/learningObjectAction';
import LearningObjectForm from 'components/learningObject/LearningObjectForm';

/*
  Object Form in Modal
*/
const CreateObjectModal = (props) => {
  const { closeModal } = props;

  return (
    <div className="modal-content modal__content">
      <div className="modal-header modal__header">
        <h5
          className="modal-title"
        >
          Novo objeto de aprendizagem
        </h5>
        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      <div className="modal-basic-operation__body modal-body">
        <LearningObjectForm {...props} actionName="Criar" hideMenuOptions />
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  isSendingAnswers: state.onlineTest.isSendingAnswers,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (values, d, props) => {
    const errors = [];
    const textObject = (values.text && values.text.trim() !== '<p></p>') ? values.text : '';
    const newObject = {
      text: textObject,
      source: values.source,
      image: values.image,
      object_types: [],
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
    };


    const overMaxSize = values.image && values.image instanceof FileList && values.image.length > 0 && values.image[0].size > 1048576;
    if (overMaxSize) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG de máx. 1mb';
    }

    const typeFile = values.image && values.image instanceof FileList && values.image.length > 0 && !values.image[0].type.includes('image');
    if (typeFile) {
      errors.image = 'Insira um arquivo PNG, JPG, JPEG';
    }

    const hasObject = values.image || textObject.length > 0;
    if (!hasObject) {
      errors.general_errors = 'Insira ou um texto/URL vídeo ou uma imagem';
    }

    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    dispatch(createLearningObject(newObject, 1));
    props.closeModal();
  },

});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'create-object-modal',
})(CreateObjectModal));
