'use client';
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-pry text-white">
      <div className="container homepage-container d-flex align-items-center gap-4">
        <small className="flex-grow-1 fs-5 fw-normal">
          © 2023 Seoul Startups Club | Powered by Innovobloc.
        </small>
        <div className="d-flex align-items-center gap-3">
          <a href="https://www.linkedin.com/groups/14133660/" target="_blank">
            <Icon icon="akar-icons:linkedin-fill" width={18} />
          </a>
          <a href="https://www.instagram.com/seoulstartupsclub/" target="_blank">
            <Icon icon="mdi:instagram" width={18} style={{ marginTop: '4px' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
