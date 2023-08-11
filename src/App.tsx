import 'bootstrap/dist/css/bootstrap.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import './sass/main.scss';
import Auth from './pages/auth';
import NewsPage from './pages/news';
import HanseekArticle from './pages/news/[id]/HanseekArticle';
import StartupsPage from './pages/startups';
import IntelliwebiArticle from './pages/news/[id]/IntelliwebiArticle';
import FlairArticle from './pages/news/[id]/Flair';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/hanseek" element={<HanseekArticle />} />
      <Route path="/news/intelliwebi" element={<IntelliwebiArticle />} />
      <Route path="/news/flair" element={<FlairArticle />} />
      <Route path="/startups" element={<StartupsPage />} />
    </Routes>
  );
}

export default App;
