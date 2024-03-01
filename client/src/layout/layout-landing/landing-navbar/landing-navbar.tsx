import { buttonVariants } from "@/components/ui/button";
import Container from "@/layout/container/container";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
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
        <ul className="flex items-center gap-5 z-50">
          <li>
            <Link to="/login" className="text-white">
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className={buttonVariants({ variant: "default" })}
            >
              Sign up for free
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default LandingNavbar;
