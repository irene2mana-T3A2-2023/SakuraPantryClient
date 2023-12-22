import { useLocation, Navigate, createSearchParams } from 'react-router-dom';
import useAuth from './Auth/useAuth';

// ProtectedRoute: A functional component that renders a given Page component based on authentication status.
export default function ProtectedRoute({ Page }) {
  // Extract the 'isAuthenticated' value from useAuth to check if the user is currently authenticated.
  const { isAuthenticated } = useAuth();

  // Retrieve the current URL path using useLocation, useful for redirecting after authentication.
  const { pathname } = useLocation();

  // Define a function 'getRedirectPath' to dynamically create a redirect URL.
  const getRedirectPath = () => {
    // Use 'createSearchParams' to build search parameters with the current URL path.
    const newParams = createSearchParams({ from: pathname }).toString();

    // Formulate and return the sign-in URL with the query parameters.
    return `/sign-in?${newParams}`;
  };

  // Conditional rendering based on authentication: If authenticated, render the Page component; otherwise, redirect to the sign-in page.
  return isAuthenticated ? <Page /> : <Navigate replace to={getRedirectPath()} />;
}
