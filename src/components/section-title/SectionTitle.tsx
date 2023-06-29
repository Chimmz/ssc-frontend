import { FC } from 'react';

interface Props {
  title: string;
  linkUrl?: string;
  // className?: string
}

const SectionTitle: FC<Props> = props => {
  return (
    <>
      <h2 className="h-2 mb-5">{props.title}</h2>
      <hr className="text-pry" style={{ border: '1px solid #3f0088' }} />
    </>
  );
};
export default SectionTitle;
