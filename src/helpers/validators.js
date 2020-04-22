export const alphaNumericValidator = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined);

export const userNameValidator = value => (value && !/^[A-Za-zÀ-ÿ-´' ]+$/i.test(value)
  ? 'Informe um nome com caracteres válidos'
  : undefined);

export const emailValidator = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Email inválido'
  : undefined);

export const linkValidator = value => (value && !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i.test(value)
  ? 'Link inválido'
  : undefined);


export const requiredValidator = value => (value ? undefined : 'Campo obrigatório');
export const requiredEmailValidator = value => (value ? undefined : 'Insira seu email');
export const requiredPasswordValidator = value => (value ? undefined : 'Insira sua senha');


export const requiredSelectValidator = value => ((value === '-1' || value === '0' || value === undefined) ? 'Campo obrigatório' : undefined);


export const requiredMultiSelectValidator = value => (value && value.length !== 0 ? undefined : 'Campo obrigatório');
export const minLengthTags = value => (value && value.length !== 0 ? undefined : 'Campo obrigatório');


export const requiredHeaderNameValidator = value => (value ? undefined : 'Digite um nome para o novo cabeçalho');

export const mustBeNumber = value => (value && isNaN(Number(value)) ? 'Insira um valor numérico' : undefined);

const maxLength = (max, text) => value => (value && value.length > max ? `Insira no máximo ${max} ${text}` : undefined);
export const maxLength5 = (maxLength(5, 'alternativas'));
export const maxLength50 = (maxLength(50, 'caracteres'));
export const maxLength200 = (maxLength(200, 'caracteres'));

const minLength = (min, text) => value => (value && value.length < min ? `Insira no minimo ${min} ${text}` : undefined);
export const minLength3Alternatives = (minLength(3, 'alternativas'));
export const minLength2Stations = (minLength(2, 'estações'));

export const minLength1Topics = (minLength(1, 'tópico'));
export const minLength3characters = (minLength(3, 'caracteres'));

export const minLength2Tags = value => (((value && (value.split(',').length < 2)) || value === undefined) ? 'Insira no minimo 2 tags' : undefined);

export const minLength2TagsForEdit = (value) => {
  let invalid;
  if (value) {
    invalid = false;
  } else {
    invalid = true;
  }
  return (((value && (value.split(',').length < 2)) || value === undefined || value === null || invalid) ? 'Insira no minimo 2 tags' : undefined);
};

const maxValue = max => value => (value && value > max ? `O valor máximo é ${max}` : undefined);
const minValue = min => value => (value && value < min ? `O valor mínimo é ${min}` : undefined);
export const mustBePositiveNumber = value => ((value && isNaN(Number(value)) && value < 0) ? 'Insira um valor numérico maior do que 0' : undefined);

export const maxYearValue = maxValue(2020);
export const minDuration = minValue(0);
