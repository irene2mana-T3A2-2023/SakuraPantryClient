import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Category from './pages/Category';
import Product from './pages/Product';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/category/:slug' element={<Category />} />
      <Route path='/product/:slug' element={<Product />} />
      <Route path='/sign-in' element={<SignIn />} />
    </Routes>
  );
}

export default App;
