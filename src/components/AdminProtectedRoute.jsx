import { useLocation, createSearchParams, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import useAuth from './Auth/useAuth';

// AdminProtectedRoute: A functional component to protect routes intended for admin users.
export default function AdminProtectedRoute({ Page }) {
  // Retrieve authentication status and user details from the useAuth custom hook.
  const { isAuthenticated, user } = useAuth();

  // Get the current URL path using the useLocation hook from React Router.
  const { pathname } = useLocation();

  // Define a function 'getRedirectPath' to construct a redirect URL.
  const getRedirectPath = () => {
    // Use 'createSearchParams' to build search parameters, including the current path for post-sign-in redirection.
    const newParams = createSearchParams({ from: pathname });

    // Construct and return the full sign-in URL with the included search parameters.
    return `/sign-in?${newParams}`;
  };

  // Conditional redirect: If the user is not authenticated, redirect to the sign-in page.
  if (!isAuthenticated) {
    return <Navigate replace to={getRedirectPath()} />;
  }

  // Conditional rendering: Show 'NotFound' component if the user is authenticated but not an admin.
  if (user.role !== 'admin') {
    return <NotFound />;
  }

  // Render the passed Page component if the user is authenticated and has an admin role.
  return <Page />;
}
