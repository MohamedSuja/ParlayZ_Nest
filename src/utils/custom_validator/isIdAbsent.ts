import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsIdAbsentConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return value === undefined || value === null; // If 'id' is undefined or null, it's valid
  }

  defaultMessage(args: ValidationArguments) {
    return 'The id field is not allowed in the request body.';
  }
}

export function IsIdAbsent(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIdAbsentConstraint,
    });
  };
}
