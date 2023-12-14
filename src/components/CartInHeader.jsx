import { Badge } from '@nextui-org/react';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartInHeader() {
  return (
    <Badge color='secondary' content={0} isInvisible={false} shape='circle'>
      <FiShoppingCart className='w-6 h-6 text-white' />
    </Badge>
  );
}
