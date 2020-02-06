const newLocal = '/';

export const getTeachingLevel = (difficulty) => {
  switch (difficulty) {
    case 'E': return 'Fácil';
    case 'M': return 'Médio';
    case 'H': return 'Difícil';
    default: return difficulty;
  }
};

export const getNamePdf = (urlPdf) => {
  const lastSlash = urlPdf.lastIndexOf(newLocal);
  return urlPdf.substring(lastSlash + 1);
};
