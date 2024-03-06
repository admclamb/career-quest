import { boardService } from "@/services/board-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export const useBoard = (boardId: number | null) => {
  const { getAccessTokenSilently } = useAuth0();

  const getBoard = async () => {
    const accessToken = await getAccessTokenSilently();

    if (!boardId) {
      throw new Error("Board id is required");
    }

    return boardService.findBoardById(accessToken, boardId);
  };
  const {
    data: board,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["board", boardId],
    queryFn: getBoard,
  });

  return { board, isLoading, error };
};
