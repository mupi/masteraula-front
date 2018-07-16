import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';


const AddQuestionButton = ({id}) =>
<div className="btn-float">
        <Button title="Adicionar questões" className="btn btn-default btn-circle btn-xl btn-lateral">
          <i className="fa fa-plus"></i>
        </Button>
</div>

export default AddQuestionButton
