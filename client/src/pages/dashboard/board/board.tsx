import { useParams } from "react-router-dom";
import { useBoard } from "./board.hooks";
import PageLoader from "@/components/loader/page-loader/page-loader";
import InterviewBoard from "@/features/board/interveiw-board/interview-board";
import LayoutSidebar from "@/layout/layout-sidebar/layout-sidebar";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";

const Board = () => {
  const { boardId } = useParams();
  const { board, isLoading, error } = useBoard(boardId ? +boardId : null);

  if (isLoading) {
    return <PageLoader />;
  }

  return board ? (
    <LayoutSidebar board={board}>
      <ErrorAlertFixed error={error} showClose />
      {board ? <InterviewBoard board={board} /> : null}
    </LayoutSidebar>
  ) : null;
};

export default Board;
