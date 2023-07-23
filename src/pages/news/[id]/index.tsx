import { useEffect } from 'react';
import cls from 'classnames';
import { genPublicImgSrc } from '../../../utils/url-utils';

import { Icon } from '@iconify/react';
import Layout from '../../../components/layout';
import SectionTitle from '../../../components/section-title/SectionTitle';
import ContactSection from '../../../components/shared/contact/Contact';
import styles from './styles.module.scss';
import AppTooltip from '../../../components/ui/tooltip/AppTooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import { useState } from 'react';
import { NewsObj } from '../../../types';
import { useLocation } from 'react-router-dom';
import { formatDate } from '../../../utils/date-utils';

const SingleNewsPage: React.FC = () => {
  const location = useLocation();

  const [newsItem, setNewsItem] = useState<NewsObj | undefined>(() => {
    return (location.state as { newsItem?: NewsObj })?.newsItem;
  });
  const { clipboardText, copied, onCopy, setCopiedFalse } = useCopyToClipboard({
    usePageUrlAsText: true
  });

  return (
    <Layout navStyles={{ backgroundColor: '#fff' }}>
      <section className="section-pad-top section-pad-bottom-lg">
        <div className="container app-container d-flex flex-column">
          <SectionTitle
            title="News"
            className="mb-5"
            line
            options={
              <>
                <small className="color-pry-dark">{formatDate(newsItem?.createdAt)}</small>
                <AppTooltip
                  title={!copied ? 'Copy' : 'Copied'}
                  onMouseLeave={setCopiedFalse.bind(null, 100)}
                >
                  <CopyToClipboard text={clipboardText} onCopy={onCopy}>
                    <span className="d-flex align-items-center gap-1">
                      <Icon icon="ri:link" width={18} /> Get link
                    </span>
                  </CopyToClipboard>
                </AppTooltip>
              </>
            }
          />
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
            {newsItem?.headline}
          </h3>
          <hr style={{ border: '1.2px solid #000' }} className="mb-5" />

          <div className={styles.newsSectionContent}>
            {/* <p>{newsItem?.story}</p> */}
            <img src={genPublicImgSrc('/img/news-img1.png')} className="float-left" alt="" />
            <p>
              {newsItem?.story}
              {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, autem
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
              placeat eum illo rerum. Iusto eos cupiditate perspiciatis possimus. Aperiam */}
            </p>
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default SingleNewsPage;
