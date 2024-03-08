import { useNavigate } from "react-router-dom";

export const useInterviewBoard = () => {
  const navigate = useNavigate();

  const addColumn = () => {
    navigate("create-column");
  };

  return { addColumn };
};
