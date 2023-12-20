export const getAxiosErrorMessage = (error) => {
  // Default message
  let errorMessage = 'Something went wrong';

  // Check if server response contains the error message
  if (error.response && error.response.data) {
    errorMessage = error.response.data.message || error.response.statusText;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response was received from the server';
  } else if (error.message) {
    // Something else happened while setting up the request
    errorMessage = error.message;
  }

  return errorMessage;
};

export const currencyFormatter = (price) => `$${price}`;
