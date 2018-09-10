import sanitizeHtml from 'sanitize-html';

export const isQuestionAdded = (activeDocument, id) => {
  if (activeDocument) {
    const questionAdded = activeDocument.questions.filter(item => item.question.id === id);
    return (questionAdded.length > 0);
  }
  return false;
};

export const getTeachingLevel = (difficulty) => {
  switch (difficulty) {
    case 'E': return 'Fácil';
    case 'M': return 'Médio';
    case 'H': return 'Difícil';
    default: return difficulty;
  }
};

export const getCleanExtractStatement = (html) => {
  const clean = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {
      a: [],
    },
  });
  return clean;
}

export const getCleanAlternativeText = (alternative) => {
  const clean = sanitizeHtml(alternative, {
    allowedTags: [],
    allowedAttributes: {
      a: [],
    },
  });
  return clean;
}

export const getOrderAlternative = (order) => {
  const letters = 'abcdef';
  const letterOrder = letters.charAt(order);
  return letterOrder;
};