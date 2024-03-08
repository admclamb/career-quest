import { BoardColumnModel } from "@/models/board-column-model";
import { useNavigate } from "react-router-dom";

export const useBoardColumnHeader = (column: BoardColumnModel) => {
  const navigate = useNavigate();
  const addJob = () => {
    navigate(`column/${column.id}/add-job`);
  };

  return { addJob };
};
