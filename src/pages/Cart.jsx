import Layout from '../layouts/Base';
import { Cart } from '../components/Cart/Cart';

export default function CartPage() {
  return (
    <Layout>
      <div className='container mx-auto mt-6 mb-6'>
        <Cart />
      </div>
    </Layout>
  );
}
