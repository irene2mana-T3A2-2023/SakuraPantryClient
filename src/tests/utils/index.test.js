import { currencyFormatter, getAxiosErrorMessage, formatDateTime } from '../../utils';

describe('utils test', () => {
  describe('getAxiosErrorMessage', () => {
    it('returns a custom message for errors with response data', () => {
      const error = {
        response: {
          data: { message: 'Custom error message' },
          statusText: 'Bad Request'
        }
      };
      expect(getAxiosErrorMessage(error)).toBe('Custom error message');
    });

    it('returns statusText for errors with response but no data message', () => {
      const error = {
        response: {
          data: {},
          statusText: 'Internal Server Error'
        }
      };
      expect(getAxiosErrorMessage(error)).toBe('Internal Server Error');
    });

    it('returns a message for errors with request but no response', () => {
      const error = { request: {} };
      expect(getAxiosErrorMessage(error)).toBe('No response was received from the server');
    });

    it('returns a message for errors without response and request but with a message', () => {
      const error = { message: 'Network Error' };
      expect(getAxiosErrorMessage(error)).toBe('Network Error');
    });

    it('returns a default message for other types of errors', () => {
      const error = {};
      expect(getAxiosErrorMessage(error)).toBe('Something went wrong');
    });
  });

  describe('currencyFormatter', () => {
    it('formats a whole number correctly', () => {
      expect(currencyFormatter(100)).toBe('$100.00');
    });

    it('formats a decimal number correctly', () => {
      expect(currencyFormatter(123.456)).toBe('$123.46');
    });

    it('formats a string number correctly', () => {
      expect(currencyFormatter('250')).toBe('$250.00');
    });

    it('handles zero correctly', () => {
      expect(currencyFormatter(0)).toBe('$0.00');
    });

    it('rounds down numbers correctly', () => {
      expect(currencyFormatter(99.994)).toBe('$99.99');
    });

    it('rounds up numbers correctly', () => {
      expect(currencyFormatter(99.995)).toBe('$100.00');
    });
  });

  describe('formatDateTime', () => {
    it('formats the date string correctly', () => {
      const dateString = '2023-01-01T13:00:00';
      const formattedDate = formatDateTime(dateString);
      expect(formattedDate).toBe('Jan 1, 2023, 01:00 PM');
    });
  });
});
