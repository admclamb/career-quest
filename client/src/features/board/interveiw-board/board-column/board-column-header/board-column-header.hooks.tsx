import { BoardColumnModel } from "@/models/board-column-model";
import { boardColumnService } from "@/services/board-column-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useBoardColumnHeader = (column: BoardColumnModel) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState<{ message: string } | null>(null);

  const addJob = () => {
    navigate(`column/${column.id}/add-job`);
  };

  const {
    mutate: deleteColumn,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this column? This process cannot be undone."
      );
      if (!isConfirmed) {
        return Promise.reject(new Error("Deletion cancelled by the user."));
      }

      const accessToken = await getAccessTokenSilently();

      const message = await boardColumnService.deleteColumn(
        accessToken,
        column.id
      );

      if (message) {
        setMessage(message);
      }
    },
  });

  return { addJob, deleteColumn, message, error, isPending };
};
