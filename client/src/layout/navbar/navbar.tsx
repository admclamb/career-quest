import { Link } from "react-router-dom";
import Container from "../container/container";
import ModeToggle from "@/features/theme/mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 border-b py-3">
      <Container className="flex justify-between items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <h1 className="text-lg font-semibold">Career Quest</h1>
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-7">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
