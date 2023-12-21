import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import UserAccount from './pages/UserAccount';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/product/:slug' element={<ProductDetails />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<ProtectedRoute Page={Checkout} />} />
      <Route path='/order-success' element={<ProtectedRoute Page={OrderSuccess} />} />
      <Route path='/user-account' element={<ProtectedRoute Page={UserAccount} />} />
      <Route path='/admin-dashboard' element={<AdminProtectedRoute Page={AdminDashboard} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
