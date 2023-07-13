import { FC } from 'react';

import useInput from '../../hooks/useInput';
import useScrollToTop from '../../hooks/useScrollToTop';

import Layout from '../../components/layout';
import TextField from '../../components/ui/text-field/TextField';
import NewsGroup from '../../components/shared/news/NewsGrid';
import NewsList from '../../components/shared/news/NewsList';
import SectionTitle from '../../components/section-title/SectionTitle';
import ContactSection from '../../components/shared/contact/Contact';

const NewsPage: FC = () => {
  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });
  useScrollToTop();

  return (
    <Layout navStyles={{ backgroundColor: '#fff' }}>
      <section className="section-pad-top section-pad-bottom-lg">
        <div className="container app-container d-flex flex-column">
          <SectionTitle title="News" line={false} />
          <TextField
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            placeholder="Search"
            className="justify-self-end ms-auto"
            style={{ width: '20%' }}
            inputClassName="underline"
          />
          <NewsGroup />
          <NewsList />
        </div>
      </section>
      <ContactSection className="mt-5" />
    </Layout>
  );
};

export default NewsPage;
