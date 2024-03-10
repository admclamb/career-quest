import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useInterviewBoard } from "../../inerview-board-provider";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useBoardColumnMove = (boardId: number) => {
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(0);

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { refetchBoard } = useInterviewBoard();

  const closeColumn = () => {
    refetchBoard();
    navigate(`/dashboard/board/${boardId}`);
  };

  const changeCurrentColumnIndex = (value: number) => {
    setCurrentColumnIndex(value);
  };

  const {
    mutate: updateOrder,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["update-order"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      closeColumn();
    },
  });

  return {
    closeColumn,
    updateOrder,
    currentColumnIndex,
    changeCurrentColumnIndex,
    error,
    isPending,
  };
};
