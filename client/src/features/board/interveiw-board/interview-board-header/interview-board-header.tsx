import { BoardModel } from "@/models/board-model";
import InterviewBoardHeaderNav from "./interview-board-header-nav/interview-board-header-nav";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import AuthLogoutButton from "@/features/auth/auth-logout-button/auth-logout-button";
import ModeToggle from "@/features/theme/mode-toggle";

type Props = {
  board: BoardModel;
};

const InterviewBoardHeader = ({ board }: Props) => {
  return (
    <div className="flex justify-between items-center border-b p-3 h-12">
      <ul className="flex items-center gap-5">
        <li className="flex items-center">
          <InterviewBoardHeaderNav />
        </li>
        <li>
          <h3 className="font-semibold">{board.title}</h3>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li>
          <Link
            to="/dashboard"
            className={buttonVariants({ variant: "ghost" })}
          >
            Home
          </Link>
        </li>
        <li>
          <AuthLogoutButton variant="outline">Log out</AuthLogoutButton>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
};

export default InterviewBoardHeader;
