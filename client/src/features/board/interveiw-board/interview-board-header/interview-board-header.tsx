import { BoardModel } from "@/models/board-model";

type Props = {
  board: BoardModel;
};

const InterviewBoardHeader = ({ board }: Props) => {
  return (
    <div className="flex justify-between border-b p-3 h-12">
      <ul className="flex gap-5">
        <li>
          <h3 className="font-semibold">{board.title}</h3>
        </li>
      </ul>
    </div>
  );
};

export default InterviewBoardHeader;
