export const isQuestionAdded = (activeDocument, id) => {
  if (activeDocument) {
    const questionAdded = activeDocument.questions.filter(question => question.id === id)
    return (questionAdded.length > 0)
  }
  return false;
} 


export const getTeachingLevel = (difficulty) => {
  switch (difficulty) {
    case 'E': return 'Fácil';
    case 'M': return 'Médio';
    case 'H': return 'Difícil';
    default: return difficulty;
  }
};