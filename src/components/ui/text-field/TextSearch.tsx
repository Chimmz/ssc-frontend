import { Icon } from '@iconify/react';
import TextField, { TextFieldProps } from './TextField';
import useInput from '../../../hooks/useInput';
import cls from 'classnames';
import styles from './TextSearch.module.scss';

type TextSearchProps = Pick<
  ReturnType<typeof useInput>,
  'inputValue' | 'onChange' | 'clearInput'
> & { className?: string };

const MAX_SEARCH_TEXT_LEN = 35;

const TextSearch: React.FC<TextSearchProps> = props => {
  const {
    inputValue: searchTerm,
    onChange: handleChangeSearchTerm,
    clearInput: clearSearchTerm
  } = props;

  return (
    <div className={cls(styles.search, props.className, 'position-relative')}>
      <TextField
        value={searchTerm}
        onChange={handleChangeSearchTerm}
        placeholder="Search"
        inputClassName="underline"
        maxLength={MAX_SEARCH_TEXT_LEN}
      />
      <span className="position-absolute" style={{ right: 0, bottom: '10px' }}>
        <Icon
          icon={searchTerm ? 'ph:x' : 'fluent:search-32-regular'}
          color="#7600ff"
          width={20}
          className={searchTerm ? 'cursor-pointer' : ''}
          onClick={searchTerm ? clearSearchTerm : undefined}
        />
      </span>
    </div>
  );
};

export default TextSearch;
