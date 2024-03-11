import { BoardModel } from "@/models/board-model";
import { PaginationResponse } from "@/models/pagination-response";
import { AxiosRequestConfig } from "axios";
import api from "./api";

const findBoardById = (
  accessToken: string,
  boardId: number
): Promise<BoardModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/board/find",
    params: {
      boardId,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<BoardModel>({ config });
};

const getBoards = (
  accessToken: string,
  page: number,
  size: number,
  timestamp: Date
): Promise<PaginationResponse<BoardModel>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/board",
    params: {
      timestamp: timestamp.toISOString(),
      page,
      size,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<PaginationResponse<BoardModel>>({ config });
};

const createBoard = (
  title: string,
  accessToken: string
): Promise<BoardModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/board",
    method: "POST",
    data: {
      title,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<BoardModel>({ config });
};

const updateColumnPosition = (
  accessToken: string,
  boardId: number,
  columnId: number,
  columnIndex: number
): Promise<BoardModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/board/update/column-order",
    method: "PUT",
    data: {
      boardId,
      columnId,
      columnIndex,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<BoardModel>({ config });
};

const boardService = {
  findBoardById,
  getBoards,
  createBoard,
  updateColumnPosition,
};

Object.freeze(boardService);

export { boardService };
