import { BoardModel } from "@/models/board-model";
import { ErrorModel } from "@/models/error-model";
import { boardService } from "@/services/board-service";
import { useAuth0 } from "@auth0/auth0-react";
import { appendFile } from "fs";
import { useEffect, useState } from "react";

export const useBoard = (boardId: number | null) => {
  const { getAccessTokenSilently } = useAuth0();
  const [board, setBoard] = useState<BoardModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    let ignore = false;

    if (!boardId) {
      setError({ message: "A board id is required" });
      return;
    }

    (async () => {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();

      const [data, apiError] = await boardService.findBoardById(
        accessToken,
        boardId
      );

      if (data && !ignore) {
        setBoard(data);
      }

      if (apiError && !ignore) {
        setError(apiError);
      }
      setIsLoading(false);
    })();

    return () => {
      ignore = true;
    };
  }, [boardId]);

  return { board, isLoading, error };
};
