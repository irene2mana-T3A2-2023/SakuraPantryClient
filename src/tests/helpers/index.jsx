import { render } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import AuthContext from '../../components/Auth/AuthContext';
import { CartContext } from '../../components/Cart/CartContext';

const defaultCartProviderProps = {
  getCartTotalQuantity: jest.fn().mockReturnValue(3)
};

export const renderWithContext = (
  ui,
  {
    authProviderProps,
    cartProviderProps = defaultCartProviderProps,
    Page,
    path,
    initialEntries = ['/'],
    ...renderOptions
  } = {}
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthContext.Provider value={authProviderProps}>
        <CartContext.Provider value={cartProviderProps}>
          {path && Page ? (
            <Routes>
              <Route path={path} element={<Page />} />
            </Routes>
          ) : (
            ui
          )}
        </CartContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>,
    renderOptions
  );
};
