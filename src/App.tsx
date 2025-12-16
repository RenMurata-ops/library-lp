import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Bookshelf from './components/Bookshelf';
import Body2 from './components/Body2';
import Copy from './components/Copy';
import SecondaryButtons from './components/SecondaryButtons';
import Book1 from './pages/Book1';
import Book2 from './pages/Book2';
import Book3 from './pages/Book3';
import Book4 from './pages/Book4';
import Book5 from './pages/Book5';
import AdminPage from './pages/AdminPage';
import ArticlePage from './pages/ArticlePage';
import ArticleEditor from './pages/ArticleEditor';
import { ConfigProvider } from './context/ConfigContext';

function App() {
  return (
    <ConfigProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-library-paper/90 backdrop-blur-sm border-b border-library-walnut/10">
            <div className="text-2xl font-serif font-bold text-library-walnut italic">The Archive.</div>
            <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-library-ink/70 font-sans">
              <a href="#collection" className="hover:text-library-walnut transition-colors">Collection</a>
              <a href="#about" className="hover:text-library-walnut transition-colors">About</a>
              <a href="#contact" className="hover:text-library-walnut transition-colors">Contact</a>
            </div>
            <div className="md:hidden text-library-walnut font-serif italic">Menu</div>
          </nav>
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Copy />
                  <SecondaryButtons />
                  <Bookshelf />
                  <Body2 />
                </>
              } />
              <Route path="/book/1" element={<Book1 />} />
              <Route path="/book/2" element={<Book2 />} />
              <Route path="/book/3" element={<Book3 />} />
              <Route path="/book/4" element={<Book4 />} />
              <Route path="/book/5" element={<Book5 />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/admin-panel" element={<AdminPage />} />
              <Route path="/admin-panel/article/:slug/edit" element={<ArticleEditor />} />
              <Route path="/admin-panel/article/new" element={<ArticleEditor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
