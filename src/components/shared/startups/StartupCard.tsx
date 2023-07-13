import cls from 'classnames';
import styles from './StartupCard.module.scss';
import { genPublicImgSrc } from '../../../utils/url-utils';
import { StartupProps } from '../../../types';

interface Props {
  startup: StartupProps;
  onClick?: (startup: StartupProps) => void;
}

const StartupCard: React.FC<Props> = props => {
  return (
    <li
      className={cls(
        styles.startup,
        'd-flex flex-column align-items-center rounded cursor-pointer'
      )}
      onClick={props.onClick?.bind(null, props.startup)}
    >
      <figure className="border rounded mb-4">
        <img src={props.startup.logoUrl} alt="" />
      </figure>
      <h4 className="fw-bold mb-3 fs-3 mt-1">{props.startup.name}</h4>
      <h6 className="text-light family-raleway text-uppercase fs-5 mb-3">
        {props.startup.industry}
      </h6>
      <span
        className="d-block border rounded mb-4 p-1 px-2 fs-5 bg-pry-lightest font-italic"
        style={{ fontStyle: 'italic' }}
      >
        {props.startup.stage}
      </span>
      {/* <a className="fs-5 d-block mb-4">{props.website}</a> */}
    </li>
  );
};

export default StartupCard;
