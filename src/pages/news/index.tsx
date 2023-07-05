import { FC } from 'react';
import Layout from '../../components/layout';
import SectionTitle from '../../components/section-title/SectionTitle';
import { Container } from 'react-bootstrap';

import useInput from '../../hooks/useInput';
import ContactSection from '../../components/home/Contact';
import TextField from '../../components/ui/text-field/TextField';
import NewsGroup from '../../components/shared/news/NewsGroup';
import NewsList from '../../components/shared/news/NewsList';

const NewsPage: FC = () => {
  const { inputValue: searchTerm, onChange: handleChangeSearchTerm } = useInput({ init: '' });

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
