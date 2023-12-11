// Import the `Toaster` component from 'react-hot-toast' library and rename it to DefaultToaster.
import { Toaster as DefaultToaster } from 'react-hot-toast';

// Define a new functional component named Toaster.
const Toaster = () => (
  // Return the `DefaultToaster` component with customized properties.
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
