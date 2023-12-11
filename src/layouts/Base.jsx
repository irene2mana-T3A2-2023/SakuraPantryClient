import Header from  '../components/Header';
import Footer from '../components/Footer';

const Layout = ( { children }) => (
  <div className='flex flex-col min-h-screen min-w-[368px]'>
    <Header />
    <div className='container mx-auto p-5 h-full w-full max-w-[1536px] flex-grow flex'>
      { children }
    </div>
    <Footer />
  </div>
)

export default Layout;