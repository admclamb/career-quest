import { buttonVariants } from "@/components/ui/button";
import AuthLoginButton from "@/features/auth/auth-login-button/auth-login-button";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import AuthSignupButton from "@/features/auth/auth-signup-button/auth-signup-button";
import Container from "@/layout/container/container";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="py-3">
      <Container className="flex justify-between items-center gap-5">
        <ul className="flex items-center gap-3">
          <li>
            <Link to="/">
              <h1 className="font-semibold text-lg">Career Quest</h1>
            </Link>
          </li>
        </ul>
        {isAuthenticated ? (
          <ul className="flex items-center gap-3 z-50">
            <li>
              <Link to="/" className={buttonVariants({ variant: "ghost" })}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={buttonVariants({ variant: "ghost" })}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <AuthLogoutButton variant="outline">Log out</AuthLogoutButton>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-3 z-50">
            <li>
              <AuthLoginButton>Log in</AuthLoginButton>
            </li>
            <li>
              <AuthSignupButton variant="default">
                Sign up for free
              </AuthSignupButton>
            </li>
          </ul>
        )}
      </Container>
    </nav>
  );
};

export default LandingNavbar;
