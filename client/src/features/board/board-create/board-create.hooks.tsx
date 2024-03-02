import { ErrorModel } from "@/models/error-model";
import { boardService } from "@/services/board-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBoardCreate = () => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const createBoard = async () => {
    setError(null);
    setIsLoading(true);
    if (!title) {
      setError({ message: "A title is required" });
      return;
    }

    const accessToken = await getAccessTokenSilently();

    const [data, apiError] = await boardService.createBoard(title, accessToken);

    if (data) {
      navigate(`dashboard/board/${data.id}`);
    }

    if (apiError) {
      setError(apiError);
    }
    setIsLoading(false);
  };

  const changeTitle = (value: string) => {
    setTitle(value);
  };

  return { createBoard, error, setError, isLoading, title, changeTitle };
};
