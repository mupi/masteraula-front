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
  const statement = sanitizeHtml(html, {
    allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'span'],
    allowedClasses: {
      p: ['texto_associado_questao'],
    },
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'style'],
      p: ['style'],
      span: ['style'],
      div: ['style'],
    },
  });
  return statement;
};

export const getCleanExtractStatement = (html) => {
  const extractStatement = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {
      a: [],
    },
  });
  return extractStatement;
};

export const getCleanAlternativeText = (alternative) => {
  const clean = sanitizeHtml(alternative, {
    allowedTags: ['img'],
    allowedAttributes: {
      a: [],
      img: ['src'],
      p: ['style'],
    },
  });
  return clean;
};

export const getOrderAlternative = (order) => {
  const letters = 'abcdef';
  const letterOrder = letters.charAt(order);
  return letterOrder;
};

export const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();

  return [day.length < 2 ? `0${day}` : day, month.length < 2 ? `0${month}` : month, year].join('/');
};
