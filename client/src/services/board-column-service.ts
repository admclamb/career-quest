import { AxiosRequestConfig } from "axios";
import api from "./api";

const deleteColumn = (
  accessToken: string,
  columnId: number
): Promise<{ message: string }> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/column/delete",
    method: "DELETE",
    params: {
      columnId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<{ message: string }>({ config });
};

const boardColumnService = {
  deleteColumn,
};

Object.freeze(boardColumnService);

export { boardColumnService };
