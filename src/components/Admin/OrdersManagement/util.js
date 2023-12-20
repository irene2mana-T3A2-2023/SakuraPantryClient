import { statusOrder, messageByStatus } from './config';

export function getNextStatus(currentStatus) {
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
    return statusOrder[currentIndex + 1];
  }
  return null; // Return null if no next status is found or status is invalid
}

export function getMessageForNextStatus(currentStatus) {
  const nextStatus = getNextStatus(currentStatus);
  if (nextStatus) {
    return messageByStatus[nextStatus];
  }
  return null;
}
