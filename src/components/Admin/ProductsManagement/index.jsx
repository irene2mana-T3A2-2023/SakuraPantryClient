import { useState, useEffect } from 'react';
import api from '../../../configs/api';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';

export default function ProductsMangement() {
  const [data, setData] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');

      setData(res.data);
    } catch (err) {
      toast.error(getAxiosErrorMessage(err));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // eslint-disable-next-line
  console.log(data)

  if (!data) {
    return null;
  }

  return (
    <div>
      <p>This is products management</p>
    </div>
  )
}
