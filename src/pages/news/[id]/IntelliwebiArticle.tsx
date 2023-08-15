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

const IntelliwebiArticle: React.FC = () => {
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

          <figure>
            <img
              src="https://res.cloudinary.com/devletwwd/image/upload/v1691873616/startup-logos/cqrkk2lkr4cpahfts1yd.png"
              height={450}
              className="w-100 object-fit-cover rounded-3 mb-8"
              alt=""
            />
            {/* <figcaption>Intelliwebi Logo</figcaption> */}
          </figure>

          <div className={cls(styles.newsSectionContent, '')}>
            <h3
              className={cls(
                styles.newsSubheading,
                styles.leftBorder,
                'fs-1 color-pry-dark family-raleway fw-bold mb-7'
              )}
            >
              We conducted a brief interview with Joshua Chung, CEO of Intelliwebi.
            </h3>
            <div className={styles.step}>
              <figure
                className={cls(
                  styles.joshuaFigure,
                  'mb-7 w-100 d-flex flex-column overflow-hidden'
                )}
              >
                {/* <img
                src={genPublicImgSrc('/img/joshua.jpg')}
                style={{
                  height: 'max(30vw, 22rem)',
                  width: 'max(33vw, 22rem)',
                  objectFit: 'contain'
                }}
                alt=""
              /> */}

                <img
                  src={genPublicImgSrc('/img/joshua.jpg')}
                  className="w-100 rounded-4"
                  style={{
                    height: 'max(40vw, 50rem)',
                    // width: 'max(35vw, 22rem)',
                    objectFit: 'contain'
                  }}
                  alt=""
                />
                <figcaption className="d-block ms-8 fs-5 color-pry-dark fw-bold mt-2">
                  Joshua Chung, CEO of Intelliwebi
                </figcaption>
              </figure>

              <div className="">
                <p className="family-raleway">
                  Intelliwebi is a software application that helps startups create and deliver
                  more effective pitches. They typically offer a variety of features, such as:
                </p>

                <ul className="ms-5 font-inherit">
                  <li>Templates for creating pitch decks</li>
                  <li>Tools for visualizing data</li>
                  <li>Practice with chatbot mode</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.newsSectionContent}>
            <ol className="d-flex flex-column gap-5">
              <li>
                <h6 className="fw-bold fs-3">How did you come up with this idea?</h6>
                <p>
                  I was attending online pitch practice workshop since last year. And I saw
                  many people are interested in practicing their pitch and getting some
                  education in terms of investor pitch.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">What did you before this business?</h6>
                <p>
                  I was an instructor at a flight school in Texas. And I had training to
                  become a commercial pilot. But I found K-startup by coincidence and I wanted
                  a challenge in my life before I go to the airline. So I came back to Korea,
                  got a data analyst job since I was interested in data analysis. A year
                  later, I quit with two of my coworkers and we started Intelliwebi.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  What is your pitch supplement tool and how does it work?
                </h6>
                <p>
                  I would say it grounds up everything related to your business pitch. Users
                  can generate their pitch deck, upload their virtual pitch and see the
                  analyzed result, practice pitching to virtual chatbot with an
                  investor/customer persona.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  What are the benefits of using your pitch supplement tool?
                </h6>
                <p>
                  Normally it costs over $2000 to get a pitch consulting. With our software,
                  it&apos;s only $29/M. It&apos;s available 24/7, optimized for your industry,
                  and going to give you feedback with an objective view.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  Who is your target audience for your pitch supplement tool?
                </h6>
                <p>
                  Our main target customer is entrepreneurs at the beginning phase. And people
                  are eager to go to the global market directly these days.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  Who is your target audience for your pitch supplement tool?
                </h6>
                <p>
                  Our main target customer is entrepreneurs at the beginning phase. And people
                  are eager to go to the global market directly these days.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  How can people learn more about your pitch supplement tool?
                </h6>
                <p>
                  Visit{' '}
                  <a
                    target="_blank"
                    href="https://intelliwebi.com"
                    className="text-decoration-underline text-pry"
                  >
                    intelliwebi.com
                  </a>{' '}
                  or send me an email. I&apos;m available 24/7. Call me 5 am on Sunday and I
                  would be available.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  What are your plans for the future of your pitch supplement tool?
                </h6>
                <p>
                  We plan to advance our virtual chatbot constantly. People will see more
                  advanced human-like chatbot with many different personalities. People will
                  be able to choose the personality they want to practice their pitch.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">
                  What challenges have you faced in developing and launching your pitch
                  supplement tool?
                </h6>
                <p>
                  When we go to the accelerator program, judges typically said this item would
                  be in a struggle to be chosen because judges might feel like they will be
                  replaced by AI.
                </p>
              </li>
              <li>
                <h6 className="fw-bold fs-3">How have you overcome these challenges?</h6>
                <p>
                  We choose to partner with those industry gurus. I think there are areas in
                  which humans can still deliver value to users. For instance, introducing
                  investors or connecting entrepreneurs with right people.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default IntelliwebiArticle;
