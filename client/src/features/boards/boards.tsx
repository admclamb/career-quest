import ErrorAlert from "@/errors/error-alert/error-alert";
import { useBoards } from "./boards.hooks";

const Boards = () => {
  const { boards, error, isLoading } = useBoards();

  return (
    <div role="feed">
      <ErrorAlert error={error} />
      {isLoading ? (
        <p className="font-semibold">Loading...</p>
      ) : boards.length ? (
        <ul>
          {boards.map((board) => (
            <li key={board.id}></li>
          ))}
        </ul>
      ) : (
        <p className="font-semibold">No boards available</p>
      )}
    </div>
  );
};

export default Boards;
