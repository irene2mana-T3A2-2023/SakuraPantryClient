import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../../components/Auth/AuthContext';
import { CartContext } from '../../components/Cart/CartContext';

const defaultCartProviderProps = {
  getCartTotalQuantity: jest.fn().mockReturnValue(3)
};

export const renderWithAuthContext = (
  ui,
  { authProviderProps, cartProviderProps = defaultCartProviderProps, ...renderOptions } = {}
) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authProviderProps}>
        <CartContext.Provider value={cartProviderProps}>{ui}</CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>,
    renderOptions
  );
};
