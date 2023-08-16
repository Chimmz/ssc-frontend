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
  const { logoUrl, name, email, industries, websiteUrl } = props.startup;

  return (
    <li className={cls(styles.startupCard, 'd-flex flex-column rounded-4')}>
      <figure className="border-bottom xy-center">
        <img src={logoUrl} alt={`Logo of ${name}`} />
      </figure>

      <div className="d-flex flex-column flex-grow-1 px-3 py-2">
        <h4 className="fw-bold text-start mb-3 fs-3 mt-1" style={{ maxWidth: '20ch' }}>
          {name}
        </h4>

        <small
          className={cls(
            email ? 'd-inline-block' : 'd-none',
            'w-max-content border-bottom mb-4'
          )}
        >
          {email}
        </small>

        <div className="d-flex align-items-center flex-wrap gap-1 flex-grow-1 my-auto">
          {industries.map((ind, i, arr) => (
            <h6
              className="fs-5 color-pry-dark border border-pry-dark rounded-5 p-2 px-3"
              key={ind}
            >
              {ind}
            </h6>
          ))}
        </div>
      </div>

      <div className="align-self-stretch d-flex align-items-center justify-content-between gap-2 p-3">
        <a
          href={websiteUrl}
          target="_blank"
          className={cls(
            !websiteUrl && 'd-none',
            'btn rounded-5 w-max-content fs-4 btn-light'
          )}
        >
          <Icon icon="gg:website" /> Visit website
        </a>

        <button
          className="btn btn-pry-dark justify-content-between align-self-end fs-4"
          onClick={props.onClick?.bind(null, props.startup)}
        >
          More{' '}
          <div className="circular circular--sm border-white">
            <Icon icon="grommet-icons:form-next" />
          </div>
        </button>
      </div>
    </li>
  );
};

export default StartupCard;
