import cls from 'classnames';
import styles from './StartupCard.module.scss';
import { genPublicImgSrc } from '../../../utils/url-utils';
import { StartupProps } from '../../../types';
import { Icon } from '@iconify/react';
import { useMemo, useCallback } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface Props {
  startup: StartupProps;
  onClick?: (startup: StartupProps) => void;
}

const MAX_INDUSTRY_TAGS_SHOWN = 3;

const StartupCard: React.FC<Props> = props => {
  const { logoUrl, name, email, industries, websiteUrl } = props.startup;

  const btnWebsite = useMemo(() => {
    const elemProps = {
      className: 'btn rounded-5 w-max-content fs-4 btn-light',
      children: (
        <>
          <Icon icon="gg:website" /> Visit website
        </>
      )
    };
    if (websiteUrl) return <a href={websiteUrl} target="_blank" {...elemProps} />;
    return <button {...elemProps} disabled />;
  }, [websiteUrl]);

  const industriesUI = useMemo(() => {
    const restIndustries = industries.slice(MAX_INDUSTRY_TAGS_SHOWN);
    return (
      <div className="d-flex align-items-center flex-wrap gap-2">
        {industries
          .slice(0, MAX_INDUSTRY_TAGS_SHOWN)
          .sort()
          .map(ind => (
            <h6
              key={ind}
              className="fs-5 color-pry-dark border border-pry-dark rounded-5 p-2 px-3"
            >
              {ind}
            </h6>
          ))}

        {restIndustries.length ? (
          <DropdownButton
            title={`+${restIndustries.length} more`}
            drop="down-centered"
            variant="light"
          >
            {restIndustries.sort().map(ind => (
              <Dropdown.Item className="pe-none" key={ind}>
                {ind}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ) : null}
      </div>
    );
  }, [industries]);

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

        {industriesUI}
        {/* <span
            role="button"
            className="btn-light border fw-bold fs-5 rounded-5 p-2 px-3"
            style={{ backgroundColor: '#e6e6e6' }}
          >
            +3 more
          </span> */}
      </div>

      <div className="align-self-stretch d-flex align-items-center justify-content-between gap-2 p-3">
        {btnWebsite}

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
