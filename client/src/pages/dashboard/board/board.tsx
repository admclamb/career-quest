import { useParams } from "react-router-dom";
import { useBoard } from "./board.hooks";
import PageLoader from "@/components/loader/page-loader/page-loader";
import InterviewBoard from "@/features/board/interveiw-board/interview-board";
import LayoutSidebar from "@/layout/layout-sidebar/layout-sidebar";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";

const Board = () => {
  const { boardId } = useParams();
  const { board, isLoading, error, setError } = useBoard(
    boardId ? +boardId : null
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <LayoutSidebar board={board}>
      <ErrorAlertFixed error={error} setError={setError} showClose />
      {board ? <InterviewBoard board={board} /> : null}
    </LayoutSidebar>
  );
};

export default Board;
