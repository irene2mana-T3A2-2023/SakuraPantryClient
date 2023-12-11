import { Toaster as DefaultToaster } from 'react-hot-toast';

const Toaster = () => (
  <DefaultToaster
    position='top-right'
    gutter={8}
    containerClassName='p-6'
    toastOptions={{
      className: 'p-6 border-0',
      success: {
        style: {
          background: '#45D483',
          color: '#fff'
        }
      },
      error: {
        iconTheme: {
          primary: '#fff',
          secondary: '#F31260'
        },
        style: {
          background: '#F31260',
          color: '#fff'
        }
      }
    }}
  />
);

export default Toaster;
