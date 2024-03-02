import { ErrorModel } from "@/models/error-model";
import { boardService } from "@/services/board-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBoardCreate = () => {
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const createBoard = async () => {
    const accessToken = await getAccessTokenSilently();

    const [data, apiError] = await boardService.createBoard(accessToken);

    if (data) {
      navigate(`/board/${data.id}`);
    }

    if (apiError) {
      setError(apiError);
    }
  };

  return { createBoard, error, setError, isLoading };
};
