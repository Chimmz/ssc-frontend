import { ReactNode, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import useInput from '../../hooks/useInput';
import useScrollToTop from '../../hooks/useScrollToTop';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import cls from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import Pagination from '../../components/shared/pagination/Pagination';
import ContactSection from '../../components/shared/contact/Contact';
import Layout from '../../components/layout';
import SectionTitle from '../../components/section-title/SectionTitle';
import TextField from '../../components/ui/text-field/TextField';
import StartupsList from '../../components/shared/startups/StartupsList';
import styles from './styles.module.scss';
import { StartupProps } from '../../types';
import { StartupIndustries, StartupStages } from '../../data/constants';
import api from '../../library/api';
import useRequest from '../../hooks/useRequest';
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import useList from '../../hooks/useList';

const INDUSTRIES = [
  StartupIndustries.TECHNOLOGY,
  StartupIndustries.HEALTHCARE,
  StartupIndustries.BLOCK_CHAIN,
  StartupIndustries.E_COMMERCE,
  StartupIndustries.FINANCIAL,
  StartupIndustries.GAMING
];

const STAGES = [
  StartupStages.SEED_STAGE,
  StartupStages.GROWTH_STAGE,
  StartupStages.IDEA_AND_CONCEPTUALIZATION,
  StartupStages.EARLY_TRACTION,
  StartupStages.PROOF_OF_CONCEPT,
  StartupStages.EXPANSION_AND_MATURITY
];

function CustomToggle(props: { children: ReactNode; eventKey: string; className?: string }) {
  const decoratedOnClick = useAccordionButton(props.eventKey, () =>
    console.log('totally custom!')
  );
  return (
    <button
      className={cls(props.className, 'btn bg-white btn-bg-none p-0')}
      style={{ borderRadius: '0' }}
      type="button"
      onClick={decoratedOnClick}
    >
      {props.children}
    </button>
  );
}

const StartupsPage = function () {
  const [startups, setStartups] = useState<StartupProps[]>([]);
  // useScrollToTop();

  const { send: sendSearchReq, response } = useRequest<{
    status: string;
    startups?: StartupProps[];
  }>();

  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });

  const {
    items: industryFilters,
    addItem: addIndustryFilter,
    removeItem: removeIndustryFilter,
    removeAll: removeAllIndustryFilters
  } = useList();

  const {
    items: stageFilters,
    addItem: addStageFilter,
    removeItem: removeStageFilter,
    removeAll: removeAllStageFilters
  } = useList();

  const search = () => {
    const queryStr = `?q=${searchTerm}&industry=${industryFilters.join()}&stage=${stageFilters.join()}`;
    sendSearchReq(api.searchStartups(queryStr));
  };

  useEffect(() => {
    if (response?.status === 'SUCCESS') setStartups(response!.startups!);
  }, [response]);

  useEffect(() => {
    search();
  }, [searchTerm, industryFilters, stageFilters]);

  useEffect(() => {
    api.getStartups().then(res => res.status === 'SUCCESS' && setStartups(res.startups));
  }, []);

  const clearAllFilters = () => {
    removeAllIndustryFilters();
    removeAllStageFilters();
  };

  return (
    <Layout navStyles={{ backgroundColor: '#fff' }}>
      <section className="section-pad-top section-pad-bottom-lg">
        <div className={cls(styles.ownContain, 'container app-container d-flex flex-column')}>
          <SectionTitle title="Our Startups" line={false} />
          <div className="justify-self-end ms-auto d-flex align-items-center position-relative">
            <TextField
              value={searchTerm}
              onChange={handleChangeSearchTerm}
              placeholder="Search"
              inputClassName="underline"
            />
            <span className="position-absolute" style={{ right: 0, bottom: '10px' }}>
              <Icon icon="fluent:search-32-regular" color="#7600ff" width={20} />
            </span>
          </div>

          <aside className="d-flex justify-content-center align-items-start gap-5">
            <div className="mt-3">
              <h5 className="d-flex align-items-center justify-content-between color-pry-dark fw-bold mb-2 ms-1">
                Filter by
                <button
                  className={cls('btn btn--sm color-pry')}
                  disabled={!industryFilters.length && !stageFilters.length}
                  onClick={clearAllFilters}
                >
                  Clear all
                </button>
              </h5>

              {/* FILTER SECTION */}
              <Accordion defaultActiveKey="0" className={styles.filter}>
                <CustomToggle
                  eventKey="0"
                  className="d-flex justify-content-between border-bottom w-100 p-4 pb-3"
                >
                  <span className="color-pry fw-bold fs-5">Industry</span>
                  <Icon icon="ic:round-plus" color="#7600ff" />
                </CustomToggle>
                <Accordion.Collapse eventKey="0">
                  <ul
                    className={cls(
                      styles.filterList,
                      'd-flex flex-column fs-5 fw-bold list-style-none p-4 py-3'
                    )}
                  >
                    {Object.values(StartupIndustries).map(ind => (
                      <li className="" key={uuidv4()}>
                        <Form.Check
                          label={ind}
                          className=""
                          checked={industryFilters.includes(ind)}
                          onChange={ev => {
                            !industryFilters.includes(ind)
                              ? addIndustryFilter(ind)
                              : removeIndustryFilter(ind);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </Accordion.Collapse>

                <CustomToggle
                  eventKey="1"
                  className="d-flex justify-content-between border-bottom w-100 p-4 pb-3"
                >
                  <span className="color-pry fw-bold fs-5">Startup Stage</span>
                  <Icon icon="ic:round-plus" color="#7600ff" />
                </CustomToggle>
                <Accordion.Collapse eventKey="1">
                  <ul
                    className={cls(
                      styles.filterList,
                      'd-flex flex-column fs-5 fw-bold list-style-none p-4 py-3'
                    )}
                  >
                    {Object.values(StartupStages).map(stage => (
                      <li className="cursor-pointer" key={uuidv4()}>
                        <Form.Check
                          label={stage}
                          className=""
                          checked={stageFilters.includes(stage)}
                          onChange={ev => {
                            !stageFilters.includes(stage)
                              ? addStageFilter(stage)
                              : removeStageFilter(stage);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </Accordion.Collapse>
              </Accordion>
            </div>

            {/* STARTUP CARDS */}
            <div className="container app-container">
              <StartupsList items={startups} />
              {startups.length ? (
                <Pagination currentPage={1} totalPages={1} />
              ) : (
                <div className="bg-light my-auto rounded-2 border text-center p-3">
                  No results
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
      <ContactSection className="mt-5" />
    </Layout>
  );
};

export default StartupsPage;
