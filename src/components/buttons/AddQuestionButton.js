import React from 'react'
import { Button } from 'reactstrap';


const AddQuestionButton = ({questionId}) =>
<div className="btn-float">
        <Button title="Adicionar questões" className="btn btn-default btn-circle btn-xl btn-lateral">
          <i className="fa fa-plus"></i>
        </Button>
</div>

export default AddQuestionButton
