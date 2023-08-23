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
import { Link, useLocation } from 'react-router-dom';
import { formatDate } from '../../../utils/date-utils';

const InnovoblocArticle: React.FC = () => {
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
                <Link to="/news">See All News</Link>
                <small className="color-pry-dark">August 08, 2023</small>
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

          <figure className="mb-8">
            <img
              src={genPublicImgSrc('/img/innovobloc-founder-img.jpg')}
              height={450}
              className="w-100 object-fit-cover border rounded-3"
              style={{ objectPosition: '70% 35%' }}
              alt=""
            />
            <figcaption className="fs-5 color-pry-dark fw-bold mt-2">
              <a href="https://www.intelliwebi.com/" target="_blank">
                Intelliwebi.com
              </a>
            </figcaption>
          </figure>

          <div className={cls(styles.newsSectionContent, '')}>
            <h3
              className={cls(
                styles.newsSubheading,
                styles.leftBorder,
                'fs-1 color-pry-dark family-raleway fw-bold mb-7'
              )}
            >
              InnovoBloc Secures Groundbreaking e-Prescription Patent, Poised to Revolutionize
              Healthcare Sector
            </h3>
          </div>

          <div className={styles.newsSectionContent}>
            <p>
              InnovoBloc, a visionary startup at the forefront of innovation, has achieved a
              remarkable milestone by obtaining a utility patent for its groundbreaking
              electronic prescription (e- prescription) technology in South Korea. This
              achievement marks a significant leap towards transforming the healthcare
              industry and enhancing patient care through cutting-edge digital solutions.
            </p>
            <br />
            <p>
              The patent underscores InnovoBloc&#39;s commitment to revolutionizing
              traditional healthcare practices by leveraging technology. This innovative
              e-prescription solution promises to streamline and modernize the prescription
              process, making it more efficient, secure, and accessible for healthcare
              providers and patients alike.
            </p>
            <br />
            <p>
              &quot;We are thrilled to announce this major achievement in the realm of
              healthcare technology,&quot; said Tyler Sahib, Founder, CTO, and CEO of
              InnovoBloc. &quot;Our E-prescription delivery and refill system that leverages
              Artificial Intelligence (AI) and Blockchain is designed to simplify the
              prescription process, reduce errors, and provide patients with a seamless
              experience. This patent is a testament to our dedication to shaping a more
              efficient and patient-centric healthcare landscape.&quot;
            </p>
            <br />
            <p>
              The E-prescription delivery system&apos;s technology developed by InnovoBloc is
              a result of rigorous research, development, and collaboration with experts in
              the healthcare and technology sectors. By digitizing the prescription process,
              the system aims to eliminate the challenges associated with traditional
              paper-based prescriptions, including handwriting &amp; processing errors, lost
              documents, and inefficient communication between healthcare providers and
              pharmacies.
            </p>
            <br />
            <p>
              With its utility patent in hand, InnovoBloc is well-positioned to advance its
              mission of leveraging technology to make a positive impact on various
              industries. The company&#39;s visionary approach extends beyond e-prescriptions;
              it has also been working on the development of Tabularium, an innovative
              document version management platform that has already garnered traction for its
              potential to reshape how businesses handle documents.
            </p>
            <br />
            <p>
              As InnovoBloc continues to make strides in innovation, the company seeks
              partnerships and collaborations that share its vision of leveraging technology
              to drive positive change. With the e-prescription patent paving the way for
              healthcare transformation, InnovoBloc is poised to leave an indelible mark on
              the healthcare sector and beyond.
            </p>
            <br />
            <p>
              <span className="d-block mb-3 fw-bold">About InnovoBloc:</span>
              InnovoBloc is a dynamic startup based in Seoul, South Korea, dedicated to
              developing innovative solutions that leverage technology to reshape industries.
              With a strong commitment to innovation, the company has achieved a utility
              patent for its e-prescription technology, showcasing its dedication to improving
              healthcare practices. Additionally, InnovoBloc is working on Tabularium, an
              advanced document management platform poised to streamline document handling for
              businesses across various sectors.
            </p>
            <br />

            <p>
              For media inquiries, please contact: <br />
              Sarah J.
              <br />
              Sarahj@InnovoBloc.com <br />
              Company Website:{' '}
              <a href="https://InnovoBloc.com/" target="about:blank" className="color-pry">
                https://InnovoBloc.com/
              </a>
            </p>
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default InnovoblocArticle;
