export const statusColor = {
  Pending: 'default',
  Processing: 'secondary',
  Cancelled: 'danger',
  Shipped: 'warning',
  Delivered: 'success'
};

export const messageByStatus = {
  Processing: 'Are you ready to process this order?',
  Shipped: 'Is this order ready to be shipped?',
  Delivered: 'Has this order been delivered?'
};

export const statusOrder = ['Pending', 'Processing', 'Shipped', 'Delivered'];
