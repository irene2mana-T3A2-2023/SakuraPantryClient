import Layout from '../layouts/Base';
import { Checkout } from '../components/Checkout/Checkout';

export default function CheckoutPage() {
  return (
    <Layout>
      <div className='container mx-auto mt-6 mb-6'>
        <Checkout />
      </div>
    </Layout>
  );
}
