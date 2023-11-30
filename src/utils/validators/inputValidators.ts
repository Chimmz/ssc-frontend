import { phone } from 'phone';
import { Validator, ValidationFeedback, FeedbackType } from './types';

export const createFeedback = (type: FeedbackType, msg: string): ValidationFeedback => ({
  type,
  msg
});

export class VFeedback implements ValidationFeedback {
  constructor(readonly type: 'passed' | 'failed', readonly msg: string) {
    this.type = type;
    this.msg = msg;
  }
}

// Actual validators
export const isRequired: Validator<string> = function (errMsg = 'This field is required') {
  console.log(`Checking input: ${this?.userInput}`);
  const hasError = !this?.userInput;

  return new VFeedback(hasError ? 'failed' : 'passed', (hasError && errMsg) || '');
};

export const mustBeSameAs: Validator<string> = function (compareText, errMsg) {
  const hasError = this.userInput !== compareText;
  return new VFeedback(hasError ? 'failed' : 'passed', (hasError && errMsg) || '');
};

export const mustNotBeSameAs: Validator<string> = function (compareText, errMsg) {
  const hasError = this.userInput === compareText;
  return new VFeedback(hasError ? 'failed' : 'passed', (hasError && errMsg) || '');
};

export const minLength: Validator<string> = function (
  minLength: number,
  errMsg: string = `Must be at least ${minLength}`
) {
  let hasError = this.userInput?.length < minLength;
  //   if (!this.userInput) hasError = true;
  return new VFeedback(hasError ? 'failed' : 'passed', (hasError && errMsg) || '');
};

export const maxLength: Validator<string> = function (
  maxLength: number,
  errMsg: string = `Please enter at most ${maxLength} characters`
) {
  let hasError = this.userInput?.length > maxLength;
  //   if (!this.userInput) hasError = true;
  return new VFeedback(hasError ? 'failed' : 'passed', (hasError && errMsg) || '');
};

export const containsUpperCase: Validator<string> = function (
  errMsg = 'Please include an uppercase letter'
) {
  const isAlphabet = (char: string) => /[a-zA-Z]/.test(char);

  const hasUpperCase = this.userInput
    .split('')
    .some(char => isAlphabet(char) && char === char.toUpperCase());

  const hasError = !hasUpperCase;
  return new VFeedback(hasError ? 'failed' : 'passed', hasError && errMsg);
};

export const containsDigit: Validator<string> = function (errMsg = 'Please include a digit') {
  const hasDigit = this.userInput.split('').some(char => !isNaN(+char));
  const hasError = !hasDigit;

  return new VFeedback(hasError ? 'failed' : 'passed', hasError && errMsg);
};

export const isEmail: Validator<string> = function (errMsg = 'Invalid email entered') {
  const hasError = !String(this.userInput)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return new VFeedback(hasError ? 'failed' : 'passed', hasError && errMsg);
};

export const isStrongPassword: Validator<string> = function (errMsg) {
  const strongPassword = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
  );
  const hasError = !strongPassword.test(this.userInput);
  return new VFeedback(hasError ? 'failed' : 'passed', hasError && errMsg);
};

export const hasPasswordExceptions: Validator<string> = function (errMsg) {
  const exceptions = ['-', '%'];
  const inputHasExceptions = exceptions.some(exc => this.userInput.includes(exc));
  return new VFeedback(
    inputHasExceptions ? 'failed' : 'passed',
    inputHasExceptions && errMsg
  );
};

export const isValidDate: Validator<string | Date> = function (
  errMsg = 'Invalid date entered'
) {
  console.log(this.userInput);
  const yr = new Date(this.userInput).getFullYear().toString();
  const error =
    yr.startsWith('0') || yr.length != 4 || +new Date(this.userInput) > Date.now();

  return new VFeedback(error ? 'failed' : 'passed', error && errMsg);
};

export const isValidPhone: Validator<string> = function (
  errMsg = 'Not a valid phone number'
) {
  const error = !phone(this.userInput).isValid;
  return new VFeedback(error ? 'failed' : 'passed', error && errMsg);
};
