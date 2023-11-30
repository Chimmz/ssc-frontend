import { FC, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import classes from './CheckboxOptions.module.scss';
import cls from 'classnames';
import CheckboxTag from './CheckboxTag';

interface Props<T> {
  as: 'tag' | 'text';
  options: T[];
  selectedOptions: T[];
  style?: React.CSSProperties;
  className?: string;
  useDefaultMaxWidth?: boolean;
  onChange?: (optn: string | number) => void;
}

const CheckboxOptions = function <T extends { value: string | number; label: string }>(
  props: Props<T>
) {
  const { options, selectedOptions, onChange: handleChange, style } = props;

  const className = useMemo(
    () => [
      'list-style-none',
      props.className,
      props.as && 'd-flex align-items-center flex-wrap list-style-none gap-2'
    ],
    [props.as, props.className]
  );

  return (
    <ul
      className={cls(...className)}
      style={{ ...style, maxWidth: props.useDefaultMaxWidth ? '40rem' : 'unset' }}
    >
      {options.map((optn, i) => (
        <li className={cls('cursor-pointer')} key={i}>
          <Form.Check
            type="checkbox"
            id={optn.label}
            className="fs-5 fw-bold"
            checked={selectedOptions.some(op => op.label === optn.label)}
            onChange={ev => handleChange?.(optn.value)}
            label={
              props.as === 'tag' ? (
                <CheckboxTag
                  active={props.selectedOptions.some(item => item.value === optn.value)}
                  label={optn.label}
                />
              ) : (
                optn.label
              )
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default CheckboxOptions;
