import { NEWS_ITEMS } from '@/data/news-items';
import { notFound } from 'next/navigation';
import FlairArticle from './Flair';
import IntelliwebiArticle from './IntelliwebiArticle';
import InnovoblocArticle from './InnovoblocArticle';
import HanseekArticle from './HanseekArticle';

const Articles = {
  flair: FlairArticle,
  hanseek: HanseekArticle,
  intelliwebi: IntelliwebiArticle,
  innovobloc: InnovoblocArticle
};

const ArticlePage = ({ params }: { params: { [key: string]: string } }) => {
  const startupName = params.id?.toLowerCase();
  if (!(startupName in Articles)) return notFound();

  const Component = Articles[startupName as keyof typeof Articles];
  return <Component />;
};

export default ArticlePage;
