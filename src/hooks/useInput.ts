'use client';
import { useState, ChangeEventHandler } from 'react';
import useValidator, { ValidatorConfig } from './useValidator';

interface UseInputParams<T = string> {
  init: T;
  type?: 'number';
  validators?: ValidatorConfig<T>[];
}

const useInput = function <T extends string | string[] | number | Date = string>({
  init: initValue,
  type,
  validators = []
}: UseInputParams<T>) {
  const [inputValue, setInputValue] = useState<T>(initValue);

  const { runValidators, validationErrors, setValidationErrors, pushValidationError } =
    useValidator<T>({ inputValue, validators });

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = ev => {
    if (type === 'number') !isNaN(+ev.target.value) && setInputValue(ev.target.value as T);
    else setInputValue(ev.target.value as T);
    setValidationErrors([]); // Clear validation errors when user continues to input
  };

  return {
    inputValue,
    setInputValue,
    handleChange,
    onChange: handleChange,
    runValidators,
    validationErrors,
    setValidationErrors,
    pushValidationError,
    clearInput: setInputValue.bind(null, initValue),
    clearValidationErrors: setValidationErrors.bind(null, [])
  };
};

export default useInput;
