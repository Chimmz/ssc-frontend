import cls from 'classnames';
import SectionTitle from '../section-title/SectionTitle';
import styles from './CommunitySupport.module.scss';

const CommunitySupport = () => {
  return (
    <section className={styles.section}>
      <div className="container homepage-container d-flex flex-column text-center">
        <SectionTitle title="Community Support" />

        <div className={cls(styles.features, 'list-style-none mt-5')}>
          <article className="bg-pry-light text-start rounded">
            <figure className="rounded"></figure>
            <h4 className="fs-3 text-white fw-bold">Networking Events & Meetups</h4>
            <small className="parag text-white">
              Unlock the vibrant startup event scene in Seoul and throughout Korea to expand
              your knowledge and network. SSC events are thoughtfully designed to equip you
              for success.
            </small>
          </article>
          <article className="bg-pry-light text-start rounded">
            <figure className="rounded"></figure>
            <h4 className="fs-3 text-white fw-bold">Access to the online community</h4>
            <small className="parag text-white">
              Join our vibrant online global startup community, a thriving hub for
              accomplished entrepreneurs and startups. Access a wealth of valuable insights,
              collaborative opportunities and unwavering support.
            </small>
          </article>
          <article className="bg-pry-light text-start rounded">
            <figure className="rounded"></figure>
            <h4 className="fs-3 text-white fw-bold">Startup & Tech Mentoring</h4>
            <small className="parag text-white">
              Receive expert guidance from our experienced community advocates and members in
              crucial areas including startup building, impactful pitching, pitch deck &
              business plan creation, and system design.
            </small>
          </article>
          <article className="bg-pry-light text-start rounded">
            <figure className="rounded"></figure>
            <h4 className="fs-3 text-white fw-bold">Networking Events & Meetups</h4>
            <small className="parag text-white">
              Unlock the vibrant startup event scene in Seoul and throughout Korea to expand
              your knowledge and network. SSC events are thoughtfully designed to equip you
              for success.
            </small>
          </article>
          <article className="bg-pry-light text-start rounded">
            <figure className="rounded"></figure>
            <h4 className="fs-3 text-white fw-bold">Free office space hours</h4>
            <small className="parag text-white">
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
              molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla.
            </small>
          </article>
          <article className="bg-pry-light text-start rounded">
            <figure className="rounded"></figure>
            <h4 className="fs-3 text-white fw-bold">
              Start-up Immigration System (OASIS) Supplemental Support
            </h4>
            <small className="parag text-white">
              Leverage the experience of our OASIS visa program alumni, who have successfully
              navigated the visa process, program steps, intellectual property matters, and
              beyond.
            </small>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CommunitySupport;
