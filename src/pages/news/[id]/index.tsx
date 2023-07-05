import cls from 'classnames';
import Layout from '../../../components/layout';
import SectionTitle from '../../../components/section-title/SectionTitle';
import TextField from '../../../components/ui/text-field/TextField';
import { genPublicImgSrc } from '../../../utils/url-utils';
import styles from './styles.module.scss';
import ContactSection from '../../../components/home/Contact';

const SingleNewsPage: React.FC = () => {
  return (
    <Layout navStyles={{ backgroundColor: '#fff' }}>
      <section className="section-pad-top section-pad-bottom-lg">
        <div className="container app-container d-flex flex-column">
          <SectionTitle title="News" className="mb-5" line />
          <figure className="mb-7">
            <img
              src={genPublicImgSrc('/img/news-img1.png')}
              style={{ height: 'max(33vw, 22rem)', objectFit: 'cover' }}
              className="w-100"
              alt=""
            />
            <figcaption className="fs-5 color-pry-dark fw-bold mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </figcaption>
          </figure>
          <h3
            className={cls(
              styles.newsSubheading,
              'fs-1 color-pry-dark family-raleway fw-bold mb-4'
            )}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </h3>
          <hr style={{ border: '1.2px solid #000' }} className="mb-5" />

          <div className={styles.newsSectionContent}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, autem
              mollitia! Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio ut, ea
              nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis placeat
              eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio
              ut, ea nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum.
            </p>
            <img src={genPublicImgSrc('/img/news-img1.png')} className="float-left" alt="" />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, autem
              mollitia! Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio ut, ea
              nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis placeat
              eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio
              ut, ea nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum. sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam
              mollitia! Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio ut, ea
              nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis placeat
              eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio
              ut, ea nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum. sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam
              mollitia! Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio ut, ea
              nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis placeat
              eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam distinctio
              ut, ea nam qui sunt impedit sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum. sequi alias deleniti molestias modi voluptas nobis
              placeat eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam
            </p>
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default SingleNewsPage;
