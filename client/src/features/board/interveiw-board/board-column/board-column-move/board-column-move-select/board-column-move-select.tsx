import { BoardColumnModel } from "@/models/board-column-model";
import { useBoardColumnMoveSelect } from "./board-column-move-select.hooks";

type Props = {
  columns: BoardColumnModel[];
};

const BoardColumnMoveSelect = ({ columns }: Props) => {
  useBoardColumnMoveSelect();
  return <div>BoardColumnMoveSelect</div>;
};

export default BoardColumnMoveSelect;
