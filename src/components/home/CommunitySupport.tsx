import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';

import FeatureImg1 from './img/feature-img1.png';
import FeatureImg2 from './img/feature-img2.png';
import FeatureImg3 from './img/feature-img3.png';
import FeatureImg4 from './img/feature-img4.png';
import FeatureImg5 from './img/feature-img5.png';
import FeatureImg6 from './img/feature-img6.png';
import styles from './CommunitySupport.module.scss';
import fonts from '@/app/fonts';

const features = [
  {
    img: FeatureImg1.src,
    title: 'Amplify Your Network',
    text: `Networking isn't just an activity; it's a form of art. Our events provide the
    perfect canvas to expand your horizons and forge connections that matter. Swap
    stories, exchange ideas, and build relationships that might just lead to your
    next big breakthrough.`
  },
  {
    img: FeatureImg4.src,
    title: 'Stay Connected Anytime, Anywhere',
    text: `Join our vibrant online community channels. Diversity fuels our strength. Our
    community boasts a mixture of perspectives, backgrounds, and experiences that
    converge to create a vibrant mosaic of ideas. Collaborate, learn, and grow
    alongside individuals who share your passion for innovation.`
  },
  {
    img: FeatureImg2.src,
    title: 'Startup & Technology Mentoring',
    text: `Receive invaluable guidance from our seasoned community advocates and members.
    Access expertise in vital areas such as startup development, impactful pitching,
    crafting pitch decks and business plans, and refining system design.`
  },
  {
    img: FeatureImg5.src,
    title: 'Co-founder & Resource Matching',
    text: `Unleash possibilities with experts who might just become your future team
    members. Discover diverse programs that fuel your startup’s growth and easily
    connect with businesses offering essential services for your startup voyage.`
  }
];

const CommunitySupport = () => {
  return (
    <section className="section-pad">
      <div className="container app-container d-flex flex-column text-center">
        <SectionTitle title="Community Support" responsive={false} />

        <div className={cls(styles.features, 'list-style-none mt-5')}>
          {features.map(f => (
            <article className="bg-pry-light text-start">
              <figure className="rounded overflow-hidden">
                <img src={f.img} alt="" />
              </figure>
              <h5 className={cls(fonts.raleway, 'fs-3 text-white fw-bold')}>{f.title}</h5>
              <small className="parag text-white fs-5">{f.text}</small>
            </article>
          ))}
        </div>
        {/* <ul className={cls(styles.features, 'list-style-none mt-5')}>
          <article className="bg-pry-light text-start">
            <figure className="rounded overflow-hidden">
              <img src={FeatureImg1.src} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">Amplify Your Network</h5>
            <small className="parag text-white fs-5">
              Networking isn't just an activity; it’s a form of art. Our events provide the
              perfect canvas to expand your horizons and forge connections that matter. Swap
              stories, exchange ideas, and build relationships that might just lead to your
              next big breakthrough.
            </small>
          </article>

          <article className="bg-pry-light text-start rounded">
            <figure className="rounded overflow-hidden">
              <img src={FeatureImg4.src} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">Stay Connected Anytime, Anywhere</h5>
            <small className="parag text-white fs-5">
              Join our vibrant online community channels. Diversity fuels our strength. Our
              community boasts a mixture of perspectives, backgrounds, and experiences that
              converge to create a vibrant mosaic of ideas. Collaborate, learn, and grow
              alongside individuals who share your passion for innovation.
            </small>
          </article>

          <article className="bg-pry-light text-start rounded">
            <figure className="rounded overflow-hidden">
              <img src={FeatureImg2.src} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">Startup & Technology Mentoring</h5>
            <small className="parag text-white fs-5">
              Receive invaluable guidance from our seasoned community advocates and members.
              Access expertise in vital areas such as startup development, impactful pitching,
              crafting pitch decks and business plans, and refining system design.
            </small>
          </article>

          <article className="bg-pry-light text-start rounded">
            <figure className="rounded overflow-hidden">
              <img src={FeatureImg5.src} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">Co-founder & Resource Matching</h5>
            <small className="parag text-white fs-5">
              Unleash possibilities with experts who might just become your future team
              members. Discover diverse programs that fuel your startup’s growth and easily
              connect with businesses offering essential services for your startup voyage.
            </small>
          </article>

          <article className="bg-pry-light text-start rounded">
            <figure className="rounded overflow-hidden">
              <img src={FeatureImg3.src} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">
              Start-up Immigration System (OASIS) Supplemental Support
            </h5>
            <small className="parag text-white fs-5">
              Tap into the wisdom of our OASIS visa program alumni. Gain insights from the
              firsthand knowledge of our Overall Assistance for Start-up Immigration System
              (OASIS) alumni, who have successfully navigated the visa process, program steps,
              and handled Intellectual Property (IP) matters and more.
            </small>
          </article>

          <article className="bg-pry-light text-start rounded">
            <figure className="rounded overflow-hidden">
              <img src={FeatureImg6.src} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">Workspace and facilities</h5>
            <small className="parag text-white fs-5">
              Take advantage of a dynamic workspace that sparks creativity and innovation,
              provided to members through designated programs and opportunities. Alongside
              workspace, we offer startups the tools they need to facilitate workshops to
              showcase their services, products and to share knowledge.
            </small>
          </article>
        </ul> */}
      </div>
    </section>
  );
};

export default CommunitySupport;
