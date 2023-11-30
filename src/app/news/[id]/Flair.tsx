'use client';
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
import { formatDate } from '../../../utils/date-utils';

import FlairMainImg from '../img/flair-main-img.png';
import FlairProgramsImg from '../img/flair-programs.png';
import FlairAndProductsImg from '../img/flair-and-products.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import fonts from '@/app/fonts';

const FlairArticle: React.FC = () => {
  const router = useRouter();

  console.log({ router });

  // const { clipboardText, copied, onCopy, setCopiedFalse } = useCopyToClipboard({
  //   usePageUrlAsText: true
  // });

  return (
    <section className={cls(fonts.raleway, 'section-pad-top section-pad-bottom-lg')}>
      <div className="container app-container d-flex flex-column">
        <SectionTitle
          title="News"
          className="mb-5"
          line
          options={
            <>
              {/* <Link href="/news">See All News</Link>
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
                </AppTooltip> */}
            </>
          }
        />

        <img
          src={FlairMainImg.src}
          className="w-100 object-fit-cover rounded-3 mb-8"
          alt=""
        />

        <div className={styles.newsSectionContent}>
          <h3
            className={cls(
              styles.newsSubheading,
              styles.leftBorder,
              'fs-1 color-pry-dark family-raleway fw-bold mb-6'
            )}
          >
            How to keep track of global startup programs as a founder?
          </h3>

          <p className="mb-5">
            Are you an ambitious, early-stage startup founder on the hunt for accelerators,
            incubators, competitions, or corporate innovation programs? Look no further,
            because we have a game-changing solution for you:{' '}
            <a
              target="about:blank"
              href="https://flair.founderslair.com/welcome"
              className="color-pry"
            >
              Flair by Founders Lair!
            </a>
          </p>

          <p className="mb-5">
            In the ever-evolving world of entrepreneurship, connecting with the right programs
            that can take your startup to the next level is paramount. However, as a budding
            founder, you may have experienced a common pain point - the overwhelming and often
            daunting task of seeking out the most suitable programs for your specific needs.
            Sometimes you have to dig deep to find that information lies somewhere in the dark
            corner or follow hundreds of LinkedIn pages to be able to keep up with the program
            announcement. This is where{' '}
            <a
              href="https://flair.founderslair.com/welcome"
              target="about:blank"
              className="color-pry"
            >
              Flair
            </a>{' '}
            steps in, offering an indispensable one-stop platform that connects startup
            founders with an unrivaled selection of global programs.
          </p>

          <p className="mb-5">
            <a
              href="https://flair.founderslair.com/welcome"
              target="about:blank"
              className="color-pry"
            >
              Flair
            </a>{' '}
            simplifies this process by providing an extensive database of programs -
            acceleration, incubation, competition, and corporate collaboration programs,
            making it effortless for founders like you to find the ones that are tailored to
            your unique needs.
          </p>

          <img src={FlairProgramsImg.src} alt="" className="d-block w-100 mb-7" />

          <p className="mb-5">
            <a
              href="https://flair.founderslair.com/welcome"
              target="about:blank"
              className="color-pry"
            >
              Flair
            </a>{' '}
            is your go-to platform for simplifying and streamlining your search for the
            perfect startup programs. No longer will you waste valuable time sifting through
            countless websites or overlooking hidden gems in the startup ecosystem. Founders
            Lair bridges the information gap, equipping founders with the necessary
            information and access to a wide array of programs that you need to thrive for
            free. <br />
            <br />
            Visit{' '}
            <a
              href="https://flair.founderslair.com/welcome"
              target="about:blank"
              className="color-pry"
            >
              Flair
            </a>{' '}
            today and embark on a journey of accelerated growth and unrivaled success -
            because your startup deserves nothing less.
          </p>

          <h6 className="fw-bold fs-3 mb-3">
            Want to learn more about Founders Lair products?
          </h6>

          <figure className="w-100">
            <img
              src={FlairAndProductsImg.src}
              className="w-100 object-fit-cover rounded-4"
              height={300}
              alt=""
            />
          </figure>

          <p className="mb-5">
            <a
              target="about:blank"
              href="https://dealflow.founderslair.com/signin"
              className="color-pry"
            >
              Dealflow
            </a>{' '}
            is an all-in-one open innovation platform that offers a streamlined solution for
            corporate innovation centers, startup accelerators, and governments to scout and
            manage startups from all over the world for free.
          </p>

          <p className="mb-5">
            <a href="https://founderslair.com/" target="about:blank" className="color-pry">
              Founders Lair
            </a>{' '}
            helps startup ecosystem builders to monetize, expand, and manage their startup
            network for free. Join Founders Lair as a connector, Benefit from successful
            referrals, gain valuable data and generate income.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlairArticle;
