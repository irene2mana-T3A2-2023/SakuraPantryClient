import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Category from './pages/Category';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:slug' element={<Search />} />
      <Route path='/category/:slug' element={<Category />} />
    </Routes>
  );
}

export default App;
