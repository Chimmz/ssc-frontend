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
              src={genPublicImgSrc('/img/hanseek-article-first-img.webp')}
              style={{ height: 'max(33vw, 22rem)', objectFit: 'cover' }}
              className="w-100 rounded-3"
              alt=""
            />
            <figcaption className="fs-5 color-pry-dark fw-bold mt-2">
              First event with Hanseekers in Hongdae {`:)`}
            </figcaption>
          </figure>
          <h3
            className={cls(
              styles.newsSubheading,
              styles.leftBorder,
              'fs-1 color-pry-dark family-raleway fw-bold mb-4'
            )}
          >
            How we maximize your Korean food experience
          </h3>
          <hr style={{ border: '1.2px solid #000' }} className="mb-5" />

          <div className={styles.newsSectionContent}>
            <p>
              {`From our experiences of introducing Korean food to our foreign friends, they had
              the most enjoyable time when 1) the menu was something they liked, 2) there were
              some explanation on how to eat the food and 3) when it was with a good company
              :)`}
            </p>
            <img
              src={genPublicImgSrc('/img/hanseek-article-pie-chart.webp')}
              className="float-left"
              alt=" rounded-3"
            />
            <p>
              In order for someone outside of Korean society to have the best Korean food
              experience, a meet-up event is perfect. Even in our squid game marketing survey,
              46% responded that they would like {`‘networking with local Korean friends’`}.
              There are many meet-ups in Korea that allows mingling with the locals. So how do
              we differentiate our service? Let’s take a deep dive at how we make your
              experience unique.
            </p>
          </div>
          <Icon icon="ph:dots-three-light" width={80} className="mx-auto my-5" />
          <div className={styles.newsSectionContent}>
            <h3
              className={cls(
                styles.newsSubheading,
                styles.leftBorder,
                'fs-1 color-pry-dark family-raleway fw-bold mb-4'
              )}
            >
              Hanseeker Event at Hong&apos;s Makgeolli
            </h3>
            <p className="mb-5">July 28, Friday 📍느린마을양조장 홍대점</p>

            <p className="mb-8">
              As we launched our website, we decided to present a complimentary Korean food
              curation session — for Hanseekers.
            </p>
            <ul
              className={cls(
                'd-flex flex-column gap-4 position-relative list-style-none',
                styles.leftBorder,
                styles.thinBorder
              )}
            >
              <li>A Hanseeker is anyone who</li>
              <li>💛 loves Korean food</li>
              <li>🔍 wants to explore Korean food more even if you are not familiar yet</li>
              <li>🌏 wants to spread fascinating Korean food culture to the world</li>
            </ul>

            <p className="my-6">
              After we found Hanseekers who wanted to join our first ever event, we got to
              work in order to tailor the best experience for them.
            </p>

            <div className={styles.step}>
              <figure>
                <img
                  src={genPublicImgSrc('/img/hanseek-article-double-img-1.webp')}
                  alt=""
                  className="rounded-3"
                />
              </figure>
              <article>
                <h4 className="fw-bold fs-3">Step 1: Learning each person’s preference ✍️</h4>
                <p>
                  We distribute a pre-event survey to learn about individual’s dietary habits
                  and preferences. This includes the level of understanding in Korean food,
                  how well one can handle spiciness and more that helps us understand each
                  participants in-depth.
                </p>
              </article>
            </div>

            <div className={cls(styles.step, styles.rStep)}>
              <figure>
                <img
                  src={genPublicImgSrc('/img/hanseek-article-phones-img.webp')}
                  alt=""
                  className="rounded-3"
                />
              </figure>
              <article>
                <h4 className="fw-bold fs-3">
                  Step 2: Curating menu combos based on the survey 🎯
                </h4>
                <p>
                  Based on our survey, we choose menus that each person would enjoy. We
                  consider individuals&apos; preference and the overall group&apos;s
                  responses. We also want the overall combination of the menu to be well
                  balanced. Based on the survey, this is how we created the set of orders:
                </p>
              </article>
            </div>
            <p className="my-6">
              Based on the survey, this is how we created the set of orders:
            </p>

            <h6 className="fw-bold fs-3 mb-7">
              Round 1: Suyuk (느린마을 수육) + Samgyeopgui & Bibimjjolmyeon (삼겹구이와
              비빔쫄면)
            </h6>

            <figure className="mb-5">
              <img
                src={genPublicImgSrc('/img/hanseek-article-double-img-1.webp')}
                className="w-100 object-fit-cover rounded-3"
                height={500}
                alt=""
              />
              <figcaption className="mt-2">
                Suyuk (느린마을 수육) + Samgyeopgui & Bibimjjolmyeon (삼겹구이와 비빔쫄면)
              </figcaption>
            </figure>

            <ul className="d-flex flex-column gap-3 mb-5">
              <li>
                For the main dish, we referred to what types of protein our participants
                liked. In the group, there was no vegetarian, so it was okay to have meat or
                seafood.
              </li>
              <li>
                Everyone in the group preferred meat over seafood, so we decided it’s good to
                include pork that was cooked in two different methods.
              </li>
              <li>
                We wanted to include noodles as one of our participants liked pasta. Jjolmyun
                was perfect because it was not only noodles, but added a spicy component to
                the first round.
              </li>
            </ul>

            <h6 className="fw-bold fs-3 mb-5">
              Round 2: Braised Kimchi & Pork (느린마을 김치찜) + Beef bone soup with beef
              noodles (사골고기국수)
            </h6>
            <figure className="mb-5">
              <img
                src={genPublicImgSrc('/img/hanseek-article-double-img-2.webp')}
                height={500}
                className="w-100 object-fit-cover rounded-3"
                alt=""
              />
              <figcaption className="mt-2">
                Braised Kimchi & Pork (느린마을 김치찜) + Beef bone soup with beef noodles
                (사골고기국수)
              </figcaption>
            </figure>
            <ul className="d-flex flex-column gap-3 mb-5">
              <li>
                For Koreans, rice is indeed the main part of our cuisine, so it made sense for
                us to include a rice dish for the second round.
              </li>
              <li>
                Braised kimchi and pork was a perfect menu as a rice dish with a good balance
                of meat and kimchi.
              </li>
              <li>
                Beef bone soup with beef noodles balanced the spiciness because it is a
                non-spicy dish.
              </li>
              <li>
                In addition, the two menu matched the favorite food of our participants — as
                all of our participants liked {`‘`}food with broth&apos; and some of their
                favorite menu was ‘spicy bone broth soup (뼈해장국)&apos; and ‘kimchi stew
                (김치찌개)&apos;.
              </li>
            </ul>

            <h6 className="fw-bold fs-3 mb-5">
              Round 3: Assorted Jeon (모둠부침개) + Mulhoe with sea snails (골뱅이물회)
            </h6>
            <figure className="mb-5">
              <img
                src={genPublicImgSrc('/img/hanseek-article-double-img-3.webp')}
                height={500}
                className="w-100 object-fit-cover rounded-3"
                alt=""
              />
              <figcaption className="mt-2">
                Round 3: Assorted Jeon (모둠부침개) + Mulhoe with sea snails (골뱅이물회)
              </figcaption>
            </figure>

            <ul className="d-flex flex-column gap-3 mb-5">
              <li>
                For the last round, we wanted to include menus that is typically considered as
                anju (안주, it refers to food that goes with alcoholic drinks).
              </li>
              <li>
                Assorted jeon is the perfect match for makgeolli. These two is like a formula
                that goes together in Korean cuisine.
              </li>
              <li>
                Mulhoe with sea snails were a little surprise we put in the menu. It is a menu
                that can be unfavorable to some people. However, we put it because we wanted
                this to be a chance for Hanseekers to try something new.
              </li>
              <li>
                A good insight: We received feedback that it was good they’ve tried it at our
                event because otherwise they’d never have tried! And one of the participants
                realized that they actually liked it and would have never known.
              </li>
            </ul>

            <div className={cls(styles.step, 'mb-7')}>
              <figure>
                <img
                  src={genPublicImgSrc('/img/hanseek-article-step3.webp')}
                  alt=""
                  className="rounded-3"
                />
                <figcaption className="mt-2">
                  Behind the scenes of preparing the event
                </figcaption>
              </figure>
              <article>
                <h4 className="fw-bold fs-3">
                  Step 3: Preparing fun facts & explanations for each menu 📝
                </h4>
                <p>
                  We distribute a pre-event survey to learn about individual’s dietary habits
                  and preferences. This includes the level of understanding in Korean food,
                  how well one can handle spiciness and more that helps us understand each
                  participants in-depth.
                </p>
              </article>
            </div>

            <ul
              className={cls(
                'd-flex flex-column gap-4 mb-7 position-relative list-style-none',
                styles.leftBorder,
                styles.thinBorder
              )}
            >
              <li>
                Suyuk is the signature menu in this resaurant. It is boiled pork and is eaten
                with different types of side dish. The sides that comes in this restaurant:
              </li>
              <li>
                - Salted shrimp dipping sauce (새우젓): Pork is often eaten with this sauce
                because it contains an enzyme called lipase which helps digestion of pork.
              </li>
              <li>
                - Dried pollack (명태식해): It’s marinated dried pollack which is a specialty
                here. It’s usually delicacy in Sokcho, Gangwondo provinces.
              </li>
            </ul>

            <h6 className="fw-bold fs-3 mb-3">
              Bonus: Makgeolli intro session from sommelier Hong
            </h6>
            <p className="mb-6">
              What made this event more wholesome is that the venue is run by Mr. Hong who is
              a famous makgeolli sommelier. Makgeolli here is freshly brewed in the store
              offering rich flavored makgeolli, 100% made with natural ingredients.
            </p>

            <figure>
              <img
                src={genPublicImgSrc('/img/hanseek-article-bonus-img.webp')}
                alt=""
                className="rounded-3"
              />
              <figcaption className="mt-2">
                Hong’s Makgeolli (느린마을양조점) venue photo from the official website.
              </figcaption>
            </figure>

            <p className="my-6">
              Mr. Hong was kind enough to explain behind story of makgeolli, show us the
              brewing factory and offer us some special makgeolli. Hanseekers definitely
              enjoyed every cups of the makgeolli.
            </p>

            <figure>
              <img
                src={genPublicImgSrc('/img/hanseek-article-double-img-4.webp')}
                height={500}
                className="w-100 object-fit-cover rounded-3"
                alt=""
              />
              <figcaption className="mt-2">
                Hong&apos;s Makgeolli (느린마을양조점) venue photo from the official website.
              </figcaption>
            </figure>
          </div>

          <Icon icon="ph:dots-three-light" width={80} className="mx-auto my-5" />

          <div className={styles.newsSectionContent}>
            <h2 className="fw-bold mb-3">
              5/5 Star Rating Review — that&apos;s what we aim for
            </h2>
            <p>
              So this was a little walk through of our first event and how we plan to maximize
              Korean food experience! Let us share some of the feedback we received :)
            </p>
            <ul
              className={cls(
                'd-flex flex-column gap-4 mb-7 position-relative list-style-none',
                styles.leftBorder,
                styles.thinBorder
              )}
            >
              <li>
                Nice organization, really good food and comfortable conversation. I was able
                to meet new people and try new food even tho I stayed in Korea for quite long.
                Also learned more about makgroli
              </li>
              <li>
                This event is really good. Hanseek team so friendly ❤. The restaurant
                recomendation also good!!
              </li>
              <li>
                My brother and father will com to Korea soon. I will recommend your service!
              </li>
              <li>
                A lot of foreigners want to try Korean food but don’t know where to go or what
                to order so this type of event is very helpful for them.
              </li>
            </ul>

            <p>
              We are very touched by the heartwarming reviews. The positive comments motivates
              us to continue bringing the best service for our audience and we will continue
              to research in what ways we can bring positive experience for everyone.
            </p>
          </div>

          <Icon icon="ph:dots-three-light" width={80} className="mx-auto my-5" />

          <div className={styles.newsSectionContent}>
            <p className="mb-5">
              In order to work towards our mission, we will do series of these events in the
              upcoming future. So if you are interested, make sure to follow our Instagram to
              stay tuned to our latest events!
            </p>
            <div className="mb-8">
              <a
                className="text-black text-decoration-underline"
                href="http://www.instagram.com/hanseek.official"
              >
                IG: www.instagram.com/hanseek.official
              </a>{' '}
              / @hanseek.official
            </div>

            <div className="tags d-flex align-items-center flex-wrap gap-3">
              <div className="bg-light xy-center w-max-content p-2 px-3 rounded">
                Korean Food
              </div>
              <div className="bg-light xy-center w-max-content p-2 px-3 rounded">
                South Korea Travel
              </div>
              <div className="bg-light xy-center w-max-content p-2 px-3 rounded">Startup</div>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default SingleNewsPage;
