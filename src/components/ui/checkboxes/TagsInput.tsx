import { FC, FormEventHandler, useState, useMemo, useRef } from 'react';

import { v4 as uuid } from 'uuid';

import useInput from '../../../hooks/useInput';
import useList from '../../../hooks/useList';

// import { TagsInput as ReactTagsInput, TagsInputProps } from 'react-tag-input-component';
import TextField from '../text-field/TextField';
import CheckboxTag from './CheckboxTag';
import { Form } from 'react-bootstrap';
import cls from 'classnames';
import { ValidationFeedback } from '../../../utils/validators/types';
import ReactTagsInput from 'react-tagsinput';

interface Props {
  // show?: boolean;
  // containerClassName?: string;
  // validationErrors?: ValidationFeedback[];
  // maxWidth?: React.CSSProperties['maxWidth'];
}

const TagsInput: FC<Props> = props => {
  const {
    items: tags,
    addItem: addTag,
    removeItem: removeTag,
    setItems: setTags
  } = useList();

  return (
    <ReactTagsInput
      value={tags}
      onChange={(tags, changed, changedIndexes) => {
        console.log(tags, changed, changedIndexes);
        setTags(tags);
      }}
      className="d-flex flex-column"
      renderInput={props => <input {...props} className="textfield border" />}
      renderTag={props => <span className="bg-pry-lighter rounded-5 px-3 py-1"></span>}
    />
  );
};

// const TagsInput: FC<Props> = props => {
//   const {
//     show,
//     containerClassName,
//     validationErrors,
//     maxWidth = '500px',
//     ...nativeProps
//   } = props;

//   const inputId = useMemo(() => uuid(), []);

//   const errorExists = useMemo(() => {
//     return props.validationErrors?.some(fb => fb.type === 'failed');
//   }, [props.validationErrors]);

//   return (
//     <div className={cls(props.containerClassName, !show && 'd-none')} style={{ maxWidth }}>
//       <ReactTagsInput
//         {...nativeProps}
//         onChange={props.onChange}
//         classNames={{
//           input: cls(
//             props.classNames?.input,
//             'border-bottom w-100',
//             errorExists ? 'border-danger' : 'border-pry'
//           ),
//           tag: cls('rounded-5 px-3 py-1', errorExists && 'is-invalid')
//         }}
//       />

//       {/* <Form.Control.Feedback type="invalid" className="d-block">
//         {props.validationErrors?.[0]?.msg}
//       </Form.Control.Feedback> */}
//     </div>
//   );
// };

export default TagsInput;
