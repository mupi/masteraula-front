export const alphaNumericValidator = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined);

export const userNameValidator = value => (value && !/^[A-Za-zÀ-ÿ-´' ]+$/i.test(value)
  ? 'Informe um nome com caracteres válidos'
  : undefined);

export const emailValidator = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Email inválido'
  : undefined);

export const requiredValidator = value => (value ? undefined : 'Campo obrigatório');


export const requiredSelectValidator = value => ((value === '-1' || value === '0' || value === undefined) ? 'Campo obrigatório' : undefined);
;

export const requiredMultiSelectValidator = value => (value && value.length !== 0 ? undefined : 'Campo obrigatório');
export const minLengthTags = value => (value && value.length !== 0 ? undefined : 'Campo obrigatório');


export const requiredHeaderNameValidator = value => (value ? undefined : 'Digite um nome para o novo cabeçalho');

export const mustBeNumber = value => (value && isNaN(Number(value)) ? 'Insira um valor numérico' : undefined);

const maxLength = (max, text) => value => (value && value.length > max ? `Insira máximo ${max} ${text}` : undefined);
export const maxLength5 = (maxLength(5, 'alternativas'));
const minLength = (min, text) => value => (value && value.length < min ? `Insira minimo ${min} ${text}` : undefined);
export const minLength3Alternatives = (minLength(3, 'alternativas'));
export const minLength1Topics = (minLength(1, 'tópico'));


export const minLength2Tags = value => (((value && (value.split(',').length < 2)) || value === undefined) ? 'Insira no minimo 2 tags' : undefined);

const maxValue = max => value => (value && value > max ? `O valor máximo permitido é ${max}` : undefined);
export const maxYearValue = maxValue(2019);
