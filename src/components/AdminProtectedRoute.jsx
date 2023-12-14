import { useLocation, createSearchParams, Navigate } from 'react-router-dom';
import useAuth from './Auth/useAuth';
import NotFound from '../pages/NotFound';

// Define a functional component called AdminProtectedRoute that accepts a Page component as a prop.
export default function AdminProtectedRoute({ Page }) {
  // Destructure isAuthenticated and isAdmin from the useAuth hook.
  const { isAuthenticated, user } = useAuth();

  // Use the useLocation hook to get the current URL path.
  const { pathname } = useLocation();

  // Define a memoized function getRedirectPath using the useCallback hook.
  const getRedirectPath = () => {
    // Create search parameters with the current path.
    const newParams = createSearchParams({
      from: pathname
    });

    // Return the sign-in URL, appending the search parameters if they exist.
    return `/sign-in?${newParams}`;
  };

  // Redirect unauthenticated users to the sign-in page.
  if (!isAuthenticated) {
    return <Navigate replace to={getRedirectPath()} />;
  }

  // Render the NotFound component if the user is authenticated but not an admin.
  if (user.role !== 'admin') {
    return <NotFound />;
  }

  // Render the Page component if the user is authenticated and is an admin.
  return <Page />;
}
