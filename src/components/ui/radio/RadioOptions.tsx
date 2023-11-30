import cls from 'classnames';
import React, { ReactNode, useState, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import styles from './RadioOptions.module.scss';

interface Props<T> {
  options: Array<T>;
  className?: string;
  labelElementClassName?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  validationError?: string;
  useGridLayout?: boolean;
  style?: React.CSSProperties;
  render: (optn: T) => ReactNode;
}

function RadioOptions<T extends { label?: string; value: string }>(props: Props<T>) {
  const { options } = props;
  return (
    <>
      <Form.Control.Feedback type="invalid" className="d-block mb-2">
        {props.validationError}
      </Form.Control.Feedback>

      <ul
        className={cls(
          props.className,
          props.useGridLayout && styles.gridLayout,
          'list-style-none'
        )}
        style={props.style}
      >
        {options.map(optn => {
          const inputId = uuidv4();
          return (
            <li key={optn.value}>
              <label
                htmlFor={inputId}
                key={uuidv4()}
                className={cls(props.labelElementClassName, 'h-100 position-relative')}
              >
                <input
                  type="radio"
                  name={props.name}
                  onChange={props.onChange}
                  value={optn.value}
                  id={inputId}
                  className="position-absolute d-none"
                  checked={props.value?.toLowerCase() === optn.value.toLowerCase()}
                />
                {props.render(optn)}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RadioOptions;
