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

export const getCleanCompleteStatement = (html) => {
  const extractStatement = sanitizeHtml(html, {
    allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img'],
    allowedClasses: {
      p: ['texto_associado_questao'],
    },
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
    },
  });
  return extractStatement;
};

export const getCleanExtractStatement = (html) => {
  const statement = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {
      a: [],
    },
  });
  return statement;
};

export const getCleanAlternativeText = (alternative) => {
  const clean = sanitizeHtml(alternative, {
    allowedTags: ['img', 'br'],
    allowedAttributes: {
      a: [],
      img: ['src'],
    },
  });
  return clean;
};

export const getOrderAlternative = (order) => {
  const letters = 'abcdef';
  const letterOrder = letters.charAt(order);
  return letterOrder;
};
