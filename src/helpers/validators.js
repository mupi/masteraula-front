export const alphaNumericValidator = value => (value && /[^a-zA-Z0-9 ]/i.test(value)
  ? 'Only alphanumeric characters'
  : undefined);

export const userNameValidator = value => (value && !/^[A-Za-zÀ-ÿ-´' ]+$/i.test(value)
  ? 'Informe um nome com caracteres válidos'
  : undefined);

export const emailValidator = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Informe um endereço de email válido'
  : undefined);

export const requiredValidator = value => (value ? undefined : 'Required');