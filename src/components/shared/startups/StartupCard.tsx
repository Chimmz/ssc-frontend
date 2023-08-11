import cls from 'classnames';
import styles from './StartupCard.module.scss';
import { genPublicImgSrc } from '../../../utils/url-utils';
import { StartupProps } from '../../../types';
import { Icon } from '@iconify/react';

interface Props {
  startup: StartupProps;
  onClick?: (startup: StartupProps) => void;
}

const StartupCard: React.FC<Props> = props => {
  return (
    <li
      className={cls(styles.startup, 'd-flex flex-column align-items-center cursor-pointer')}
    >
      <figure className="border-bottom xy-center">
        <img src={props.startup.logoUrl} alt={`Logo of ${props.startup.name}`} />
      </figure>

      <div className="d-flex flex-column flex-grow-1 px-3 py-2">
        <h4 className="fw-bold mb-3 fs-3 mt-1">{props.startup.name}</h4>

        <small
          className={cls(
            props.startup.email ? 'd-inline-block' : 'd-none',
            'w-max-content mx-auto border-bottom mb-4'
          )}
        >
          {props.startup.email}
        </small>

        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 flex-grow-1 my-auto">
          {props.startup.industries.map((ind, i, arr) => (
            <h6
              className="fs-5 color-pry-dark border border-pry-dark rounded-5 p-2 px-3"
              key={ind}
            >
              {ind}
            </h6>
          ))}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between gap-3 py-3">
        <button className="btn w-max-content fs-4 btn-light">
          <Icon icon="gg:website" /> Visit website
        </button>
        <button
          className="btn btn-pry-dark justify-content-between fs-4"
          onClick={props.onClick?.bind(null, props.startup)}
        >
          More{' '}
          <div className="circular circular--sm border-white">
            <Icon icon="grommet-icons:form-next" />
          </div>
        </button>
      </div>
      {/* <a className="fs-5 d-block mb-4">{props.website}</a> */}
    </li>
  );
};

export default StartupCard;
