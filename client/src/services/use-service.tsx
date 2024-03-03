import { ApiResponse } from "@/models/api-repsonse-model";
import { ErrorModel } from "@/models/error-model";
import { useEffect, useState } from "react";

export const useService = <T extends object>(
  queryFn: () => Promise<ApiResponse<T>>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ErrorModel | null>(null);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    (async () => {
      const [response, apiError] = await queryFn();

      if (response && !ignore) {
        setData(response);
      }

      if (apiError && !ignore) {
        setError(apiError);
      }
    })();

    setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, [queryFn]);

  return { isLoading, error, data };
};
