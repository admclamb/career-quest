import { BoardColumnModel } from "@/models/board-column-model";
import BoardColumnHeader from "./board-column-header/board-column-header";

type Props = {
  column: BoardColumnModel;
};

const BoardColumn = ({ column }: Props) => {
  return (
    <div className="border-r w-80 h-full">
      <BoardColumnHeader column={column} />
      <ul className="flex flex-col"></ul>
    </div>
  );
};

export default BoardColumn;
