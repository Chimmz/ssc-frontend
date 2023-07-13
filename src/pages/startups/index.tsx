import { ReactNode, useEffect } from 'react';
import { Icon } from '@iconify/react';

import useInput from '../../hooks/useInput';
import useScrollToTop from '../../hooks/useScrollToTop';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import cls from 'classnames';
import { dummyStartups } from '../../data/dummy-startups';

import Accordion from 'react-bootstrap/Accordion';
import Pagination from '../../components/shared/pagination/Pagination';
import ContactSection from '../../components/shared/contact/Contact';
import Layout from '../../components/layout';
import SectionTitle from '../../components/section-title/SectionTitle';
import TextField from '../../components/ui/text-field/TextField';
import StartupsList from '../../components/shared/startups/StartupsList';
import styles from './styles.module.scss';

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
  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });
  useScrollToTop();

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
              <h5 className="color-pry-dark fw-bold mb-3 ms-1">Filter By</h5>
              <Accordion defaultActiveKey="0" className={styles.filter}>
                <CustomToggle
                  eventKey="0"
                  className="d-flex justify-content-between border-bottom w-100 p-3"
                >
                  <span className="color-pry">Industry</span>
                  <Icon icon="ic:round-plus" color="#7600ff" />
                </CustomToggle>
                <Accordion.Collapse eventKey="0">
                  <div className="py-1 px-3 pb-3">Hello! I'm in industry</div>
                </Accordion.Collapse>

                <CustomToggle
                  eventKey="1"
                  className="d-flex justify-content-between w-100 p-3"
                >
                  <span className="color-pry">Stage</span>
                  <Icon icon="ic:round-plus" color="#7600ff" />
                </CustomToggle>
                <Accordion.Collapse eventKey="1">
                  <div className="py-1 px-3 pb-3">Hello! I'm in stage</div>
                </Accordion.Collapse>
              </Accordion>
            </div>
            <div className="container app-container">
              <StartupsList items={dummyStartups} />
              <Pagination currentPage={2} totalPages={10} />
            </div>
          </aside>
        </div>
      </section>
      <ContactSection className="mt-5" />
    </Layout>
  );
};

export default StartupsPage;
