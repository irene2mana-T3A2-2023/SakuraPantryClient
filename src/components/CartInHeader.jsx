import { Badge } from '@nextui-org/react';
import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from './Cart/CartContext';
import { Link } from 'react-router-dom';

export default function CartInHeader() {
  const { getCartTotalQuantity } = useContext(CartContext);

  return (
    <Link to='/cart'>
      <Badge color='secondary' content={getCartTotalQuantity()} isInvisible={false} shape='circle'>
        <FiShoppingCart className='w-6 h-6 text-white' />
      </Badge>
    </Link>
  );
}
