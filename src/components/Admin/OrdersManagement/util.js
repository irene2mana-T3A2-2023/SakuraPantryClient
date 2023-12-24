import { statusOrder, messageByStatus } from './config';

// Define a function 'getNextStatus' that takes the currentStatus as an argument.
export const getNextStatus = (currentStatus) => {
  // Find the index of the currentStatus in the statusOrder array.
  const currentIndex = statusOrder.indexOf(currentStatus);

  // Check if the currentStatus is found in the statusOrder array and if it's not the last status.
  if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
    // Return the next status based on the index in the statusOrder array.
    return statusOrder[currentIndex + 1];
  }

  // Return null if there is no next status (currentStatus is the last status).
  return null;
};

// Define a function 'getMessageForNextStatus' that takes the currentStatus as an argument.
export const getMessageForNextStatus = (currentStatus) => {
  // Get the next status using the 'getNextStatus' function.
  const nextStatus = getNextStatus(currentStatus);

  // Check if there is a next status.
  if (nextStatus) {
    // Return the message associated with the next status from the messageByStatus object.
    return messageByStatus[nextStatus];
  }

  // Return null if there is no next status (currentStatus is the last status).
  return null;
};
