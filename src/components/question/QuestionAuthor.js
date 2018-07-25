import React  from 'react';

const QuestionAuthor = ({author, styleTag }) => {
    const name = author ? author.name : "Anônimo"

    return (
        <span className={styleTag} >{ name }</span>
    )
}
export default QuestionAuthor;
