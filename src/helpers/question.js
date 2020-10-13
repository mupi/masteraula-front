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
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'ins', 'span', 'sup', 'sub', 'small', 'u'],
    allowedClasses: {
      p: ['text-center', 'text-justify'],
      div: ['text-center', 'text-justify', 'video-responsive'],
    },
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'style'],
      p: ['style'],
      span: ['style'],
      div: ['style'],
      iframe: ['src', 'width', 'height', 'allowfullscreen', 'allow'],
    },
    allowedIframeHostnames: ['www.youtube.com'],
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
  // return extractStatement;
  return extractStatement.replace(/&quot;/g, '\'');
};

export const getCleanAlternativeText = (alternative) => {
  const clean = sanitizeHtml(alternative, {
    allowedTags: ['img', 'sup', 'sub', 'b', 'p', 'br', 'strong', 'u', 'em', 'i'],
    allowedAttributes: {
      a: [],
      img: ['src'],
      p: ['style'],
    },
  });
  return clean;
};

export const getCleanLearningObjectSource = (source) => {
  const clean = sanitizeHtml(source, {
    allowedTags: ['sup', 'sub', 'b', 'p', 'br', 'strong', 'u', 'em', 'i', 'a'],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      p: ['style'],
    },
  });
  return `Fonte: ${clean}`;
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

export const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const time = `${hours}:${minutes}`;
  return time;
};

export const diffDateInMinutes = (dt1, dt2) => {
  const dtIni = new Date(dt1);
  const dtEnd = new Date(dt2);
  let diff = (dtEnd.getTime() - dtIni.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};
