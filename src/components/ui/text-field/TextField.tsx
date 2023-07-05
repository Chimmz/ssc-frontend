import React, { Fragment } from 'react';
import { ValidationFeedback } from '../../../utils/validators/types';
import { Form, FormControlProps } from 'react-bootstrap';
import cls from 'classnames';

interface TextFieldProps extends FormControlProps {
  as?: 'input' | 'textarea';
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'date';
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  readonly?: boolean;
  validationErrors?: ValidationFeedback[];
  label?: React.ReactNode;
  autoFocus?: boolean;
  onFocusSelect?: boolean;
  onInput?: React.ChangeEventHandler<HTMLInputElement> | (() => void);
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | (() => void);
  className?: string;
  inputClassName?: string;
  [key: string]: any;
}

function TextField(props: TextFieldProps) {
  const {
    validationErrors,
    type = 'text',
    autoFocus,
    readonly,
    onFocusSelect,
    ...nativeProps
  } = props;
  const hasError = !!validationErrors?.length;

  return (
    <Form.Group className={props.className} style={props.style}>
      {nativeProps.label ? <Form.Label>{nativeProps.label}</Form.Label> : null}
      <Form.Control
        type={type}
        {...nativeProps}
        isInvalid={hasError}
        autoFocus={autoFocus}
        onInput={props.onInput}
        onKeyUp={props.onKeyUp}
        onFocus={ev => {
          props.onFocus?.(ev);
          onFocusSelect && ev.target.select();
        }}
        readOnly={props.readonly}
        className={cls('textfield', props.inputClassName)}
        style={props.inputStyle}
      />

      {validationErrors ? (
        <Form.Control.Feedback type="invalid">
          {validationErrors?.[0]?.msg}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}

export default TextField;