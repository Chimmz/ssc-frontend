import 'bootstrap/dist/css/bootstrap.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import './sass/main.scss';
import Auth from './pages/auth';
import Nav from './components/layout/Nav';
import NewsPage from './pages/news';
import SingleNewsPage from './pages/news/[id]';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<SingleNewsPage />} />
    </Routes>
  );
}

export default App;
