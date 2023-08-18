import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './CommunitySupport.module.scss';
import { genPublicImgSrc } from '../../utils/url-utils';

const CommunitySupport = () => {
  return (
    <section className={styles.section}>
      <div className="container app-container d-flex flex-column text-center">
        <SectionTitle title="Community Support" responsive={false} />

        <div className={cls(styles.features, 'list-style-none mt-5')}>
          <article className="bg-pry-light text-start">
            <figure className="rounded overflow-hidden">
              <img src={genPublicImgSrc('/img/feature-img1.png')} alt="" />
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
              <img src={genPublicImgSrc('/img/feature-img3.png')} alt="" />
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
              <img src={genPublicImgSrc('/img/feature-img2.png')} alt="" />
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
              <img src={genPublicImgSrc('/img/feature-img4.png')} alt="" />
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
              <img src={genPublicImgSrc('/img/feature-img5.png')} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">
              Start-up Immigration System(OASIS) Supplemental Support
            </h5>
            <small className="parag text-white fs-5">
              Tap into the wisdom of our OASIS visa program alumni. Gain insights from the
              firsthand knowledge of our Overall Assistance for Start-up Immigration
              System(OASIS) alumni, who have successfully navigated the visa process, program
              steps, and handled intellectual property (IP) matters and more.
            </small>
          </article>

          <article className="bg-pry-light text-start rounded">
            <figure className="rounded overflow-hidden">
              <img src={genPublicImgSrc('/img/feature-img6.png')} alt="" />
            </figure>
            <h5 className="fs-3 text-white fw-bold">Workspace and facilities</h5>
            <small className="parag text-white fs-5">
              Take advantage of a dynamic workspace that sparks creativity and innovation,
              provided to members through designated programs and opportunities. Alongside
              workspace, we offer startups the tools they need to facilitate workshops to
              showcase their services, products and to share knowledge.
            </small>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CommunitySupport;
