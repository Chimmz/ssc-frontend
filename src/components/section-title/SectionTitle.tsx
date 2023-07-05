import cls from 'classnames';
import { FC } from 'react';

interface Props {
  title: string;
  line?: boolean;
  link?: React.ReactNode;
  className?: string;
}

const SectionTitle: FC<Props> = ({ title, link, line = true, className }) => {
  return (
    <div className={cls('d-flex flex-column text-center', className)}>
      <h2 className="h-2 mb-5">{title}</h2>
      <div className="ms-auto color-pry fw-bold" style={{ fontFamily: 'Raleway' }}>
        {link}
      </div>
      {line ? <hr className="text-pry" style={{ border: '1.5px solid #3f0088' }} /> : null}
    </div>
  );
};
export default SectionTitle;
