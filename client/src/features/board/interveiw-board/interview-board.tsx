import { BoardModel } from "@/models/board-model";
import BoardColumn from "./board-column/board-column";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  board: BoardModel;
};

const InterviewBoard = ({ board }: Props) => {
  return (
    <ul className="w-full h-full flex items-stretch">
      {board.columns.map((column) => (
        <li key={column.id} className="h-full">
          <BoardColumn column={column} />
        </li>
      ))}
      <li>
        <div className="border-r w-80 h-full p-5">
          <Button variant="ghost" className="uppercase font-semibold w-full">
            <Plus size={16} className="mr-3" /> Add list
          </Button>
        </div>
      </li>
    </ul>
  );
};

export default InterviewBoard;
