import React, { useRef, useMemo, useEffect } from 'react';
import { ValidationFeedback } from '../../../utils/validators/types';
import { Form, FormControlProps, InputGroup } from 'react-bootstrap';
import cls from 'classnames';

export interface TextFieldProps extends FormControlProps {
  as?: 'input' | 'textarea';
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'date';
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  readonly?: boolean;
  validationErrors?: ValidationFeedback[];
  label?: string;
  autoFocus?: boolean;
  onFocusSelect?: boolean;
  onInput?: React.ChangeEventHandler<HTMLInputElement> | (() => void);
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | (() => void);
  className?: string;
  maxLength?: number;
  minLength?: number;
  focusWhen?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  [key: string]: any;
}

const TextField = function (props: TextFieldProps) {
  const {
    validationErrors,
    autoFocus,
    readonly,
    onFocusSelect,
    focusWhen,
    inputClassName,
    ...nativeProps
  } = props;

  const { type = 'text', maxLength, minLength } = nativeProps;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasError = useMemo(() => !!validationErrors?.length, [validationErrors]);

  useEffect(() => {
    if (props.focusWhen) inputRef?.current?.focus();
  }, [props.focusWhen]);

  return (
    <Form.Group className={props.className} style={props.style}>
      {nativeProps.label ? (
        <Form.Label
          className={cls(props.labelClassName, 'fw-bold fs-4 text-black')}
          htmlFor={nativeProps.label}
        >
          {nativeProps.label}
        </Form.Label>
      ) : null}

      <InputGroup>
        <Form.Control
          {...nativeProps}
          ref={inputRef}
          type={type}
          isInvalid={hasError}
          autoFocus={autoFocus}
          onInput={props.onInput}
          onKeyUp={props.onKeyUp}
          id={typeof nativeProps.label === 'string' ? nativeProps.label : nativeProps.id}
          readOnly={props.readonly}
          className={cls('textfield', props.inputClassName)}
          maxLength={maxLength}
          minLength={minLength}
          style={props.inputStyle}
          onFocus={ev => {
            props.onFocus?.(ev);
            onFocusSelect && ev.target.select();
          }}
        />
        {/* <InputGroup.Text className="bg-transparent">.00</InputGroup.Text> */}

        {validationErrors?.length ? (
          <Form.Control.Feedback type="invalid" className="text-end">
            {validationErrors?.[0]?.msg}
          </Form.Control.Feedback>
        ) : null}
      </InputGroup>
    </Form.Group>
  );
};

export default TextField;
