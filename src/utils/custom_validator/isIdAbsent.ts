import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsIdAbsent(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isIdAbsent',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'undefined'; // Return true if 'id' is not present
        },
        defaultMessage(args: ValidationArguments) {
          return `'${args.property}' field is not allowed in the request body.`;
        },
      },
    });
  };
}
