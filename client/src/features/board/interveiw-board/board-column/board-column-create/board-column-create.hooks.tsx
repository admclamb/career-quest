import { boardColumnService } from "@/services/board-column-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBoardColumnCreate = (boardId: number) => {
  const [label, setLabel] = useState<string>("");

  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const closeColumn = () => {
    navigate(`/dashboard/board/${boardId}`);
  };

  const changeLabel = (value: string) => {
    setLabel(value);
  };

  const {
    mutate: createColumn,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["create-column"],
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();

      await boardColumnService.createColumn(accessToken, boardId, label);

      closeColumn();
    },
  });

  return { closeColumn, createColumn, error, isPending, label, changeLabel };
};
