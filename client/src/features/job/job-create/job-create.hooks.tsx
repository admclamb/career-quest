import { ErrorModel } from "@/models/error-model";
import { useState } from "react";

export const useJobCreate = () => {
  const [error, setError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { error, setError, isLoading };
};
