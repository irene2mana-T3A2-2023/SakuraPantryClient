import Layout from '../layouts/Base';
import { OrderSuccess } from '../components/Checkout/OrderSuccess';

export default function OrderSuccessPage() {
  return (
    <Layout>
      <div className='container mx-auto mt-6 mb-6'>
        <OrderSuccess />
      </div>
    </Layout>
  );
}
