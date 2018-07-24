import React from 'react'
import { Button } from 'reactstrap';


const AddQuestionButton = ({questionId}) =>
<div className="l-button-add-question">
        <Button title="Adicionar questões" className="o-button-add-question-doc o-button-add-question-doc--xl">
          <i className="fa fa-plus"></i>
        </Button>
</div>

export default AddQuestionButton
