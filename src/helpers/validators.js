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


export const requiredSelectValidator = value => ((value !== '0' ) ? undefined : 'Campo obrigatório');


export const requiredHeaderNameValidator = value => (value ? undefined : 'Digite um nome para o novo cabeçalho');

