import { useLocation, Navigate, createSearchParams } from 'react-router-dom';
import useAuth from './Auth/useAuth';

// Define a functional component called ProtectedRoute that takes a Page component as a prop.
export default function ProtectedRoute({ Page }) {
  // Destructure isAuthenticated from the useAuth hook to determine if the user is authenticated.
  const { isAuthenticated } = useAuth();

  // Use the useLocation hook to get the current URL path.
  const { pathname } = useLocation();

  // Define a function getRedirectPath to create a redirect URL with query parameters.
  const getRedirectPath = () => {
    // Create search parameters with the current path.
    const newParams = createSearchParams({
      from: pathname
    });

    // Return the sign-in URL, appending the search parameters if they exist.
    return `/sign-in${newParams ? `?${newParams}` : ''}`;
  };

  // Conditionally render the Page component if the user is authenticated, otherwise redirect to the sign-in page.
  return isAuthenticated ? <Page /> : <Navigate replace to={getRedirectPath()} />;
}
