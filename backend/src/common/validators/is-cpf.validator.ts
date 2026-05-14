import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

function normalizeDigits(value: string) {
  return value.replace(/\D+/g, '');
}

function validateCpfDigits(value: string) {
  const cpf = normalizeDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const calculateDigit = (base: string, factor: number) => {
    let total = 0;
    for (const digit of base) {
      total += Number(digit) * factor;
      factor -= 1;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cpf.slice(0, 9), 10);
  const secondDigit = calculateDigit(cpf.slice(0, 10), 11);
  return cpf.endsWith(`${firstDigit}${secondDigit}`);
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function validate(target: object, propertyName: string) {
    registerDecorator({
      name: 'isCpf',
      target: target.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') {
            return false;
          }

          return validateCpfDigits(value);
        },
        defaultMessage(args?: ValidationArguments) {
          return `${args?.property ?? 'CPF'} invalido`;
        },
      },
    });
  };
}
