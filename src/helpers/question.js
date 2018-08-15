export const isQuestionAdded = (activeDocument, id) => {
  if (activeDocument) {
    const questionAdded = activeDocument.questions.filter(question => question.question === id)
    return (questionAdded.length > 0)
  }
  return false;
}
