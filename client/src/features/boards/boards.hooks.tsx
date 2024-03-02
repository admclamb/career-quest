import { BoardModel } from "@/models/board-model";
import { ErrorModel } from "@/models/error-model";
import { useState } from "react";

export const useBoards = () => {
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { boards, error, isLoading };
};
