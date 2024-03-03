import { BoardModel } from "@/models/board-model";
import { boardService } from "@/services/board-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useBoards = () => {
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [timestamp] = useState<Date>(new Date());

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let ignore = false;

    (async () => {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();

      const [data, apiError] = await boardService.getBoards(
        accessToken,
        page,
        size,
        timestamp
      );

      if (data && !ignore) {
        setBoards(data.results);
        setPage(data.page);
      }

      if (apiError && !ignore) {
        setError(apiError);
      }
      setIsLoading(false);
    })();

    return () => {
      ignore = true;
    };
  }, [getAccessTokenSilently, page, size, timestamp]);

  return { boards, error, isLoading };
};
