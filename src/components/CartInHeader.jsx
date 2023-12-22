import { Badge } from '@nextui-org/react';
import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from './Cart/CartContext';
import { Link } from 'react-router-dom';

export default function CartInHeader() {
  const { getCartTotalQuantity } = useContext(CartContext);

  const totalItem = getCartTotalQuantity();

  return (
    <Link to='/cart' className='inline-flex items-center'>
      <Badge color='secondary' content={totalItem} isInvisible={totalItem === 0} shape='circle'>
        <FiShoppingCart className='w-6 h-6 text-white' />
      </Badge>
    </Link>
  );
}
