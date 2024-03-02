import { ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";
import InterviewBoardHeader from "@/features/board/interveiw-board/interview-board-header/interview-board-header";
import { BoardModel } from "@/models/board-model";

type Props = {
  children?: ReactNode;
  mainClassName?: string;
  board: BoardModel | null;
};

const LayoutSidebar = ({ children, board, mainClassName = "" }: Props) => {
  return (
    <main className={`h-screen flex items-stretch ${mainClassName}`}>
      <Sidebar />
      <div className="grow overflow-scroll flex flex-col">
        {board ? <InterviewBoardHeader board={board} /> : null}

        <div className="overflow-x-scroll grow">{children}</div>
      </div>
    </main>
  );
};

export default LayoutSidebar;
