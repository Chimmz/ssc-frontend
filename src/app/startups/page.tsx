'use client';
import { ReactNode, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import useInput from '../../hooks/useInput';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import cls from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import Pagination from '../../components/shared/pagination/Pagination';
import ContactSection from '../../components/shared/contact/Contact';
import Layout from '../../components/layout';
import SectionTitle from '../../components/section-title/SectionTitle';
import StartupsList from '../../components/shared/startups/StartupsList';
import styles from './styles.module.scss';
import api from '../../library/api';
import useRequest from '../../hooks/useRequest';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import useList from '../../hooks/useList';
import TextSearch from '../../components/ui/text-field/TextSearch';
import AppContainer from '../../components/shared/AppContainer';
import Link from 'next/link';

const StartupsPage = function () {
  const [startups, setStartups] = useState<StartupCardProps[]>([]);
  const [filters, setFilters] = useState<{ industries: string[]; stages: string[] }>({
    industries: [],
    stages: []
  });

  const { sendReq: sendSearchReq, response } = useRequest<{
    status: string;
    startups?: StartupCardProps[];
  }>();

  const {
    inputValue: searchTerm,
    onChange: handleChangeSearchTerm,
    clearInput: clearSearchTerm
  } = useInput({ init: '' });

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
    const reqs = Promise.all([api.getStartups(), api.getStartupFilters()]);
    reqs.then(([resStartups, resStartupFilters]) => {
      if (resStartups.status === 'SUCCESS') setStartups(resStartups.startups);
      if (resStartupFilters.status !== 'SUCCESS') return;
      setFilters({
        industries: resStartupFilters.industries,
        stages: resStartupFilters.stages
      });
    });
  }, []);

  const clearAllFilters = () => {
    removeAllIndustryFilters();
    removeAllStageFilters();
  };

  return (
    <>
      <section className="section-pad-top section-pad-bottom-lg">
        <AppContainer className="d-flex flex-column">
          <SectionTitle title="Featured Startups" line={false} />

          <div className={cls(styles.pageOptions, 'gap-4 mb-5')}>
            <Link href="/startups/create" className="btn btn-pry btn--lg">
              <Icon icon="mdi:company" /> Add My Startup
            </Link>
            <TextSearch
              inputValue={searchTerm}
              onChange={handleChangeSearchTerm}
              clearInput={clearSearchTerm}
              onSubmit={search}
            />
          </div>

          <div
            className={cls(
              styles.pageBody,
              'd-flex justify-content-between align-items-start gap-4 mt-3'
            )}
          >
            <aside className="">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="color-pry-dark fw-bold mb-2 ms-1">Filter by</h5>
                <button
                  className={cls('btn btn--sm color-pry')}
                  disabled={!industryFilters.length && !stageFilters.length}
                  onClick={clearAllFilters}
                >
                  Clear all
                </button>
              </div>

              {/* FILTER SECTION */}
              <Accordion className={styles.filter}>
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
                    {/* <Form> */}
                    {filters.industries.map(ind => (
                      <li className="" key={uuidv4()}>
                        <Form.Check
                          id={ind}
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
                    {/* </Form> */}
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
                    {filters.stages.map(stage => (
                      <li key={uuidv4()}>
                        <Form.Check
                          type="checkbox"
                          label={stage}
                          id={stage}
                          checked={stageFilters.includes(stage)}
                          onChange={() => {
                            (stageFilters.includes(stage)
                              ? removeStageFilter
                              : addStageFilter)(stage);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </Accordion.Collapse>
              </Accordion>
            </aside>

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
          </div>
        </AppContainer>
      </section>
    </>
  );
};

const CustomToggle = (props: {
  children: ReactNode;
  eventKey: string;
  className?: string;
}) => {
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
};

export default StartupsPage;
