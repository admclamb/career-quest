import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useRequestProcessor = () => {
  const queryClient = useQueryClient();

  const query = (key: string[], queryFunction: () => void, options = {}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  };

  const mutate = (
    key: string[],
    mutationFunction: MutationFunction<unknown, void>,
    options = {}
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  };

  return { query, mutate };
};
