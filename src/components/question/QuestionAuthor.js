import React  from 'react';
import 'font-awesome/css/font-awesome.min.css';

const QuestionAuthor = ({author, styleTag }) => {
    const name = author ? author.name : "Anônimo"

    return (
        <span className={styleTag} >{ name }</span>
    )
}
export default QuestionAuthor;
