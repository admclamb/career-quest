import { BoardColumnModel } from "@/models/board-column-model";
import { CompanyModel } from "@/models/company-model";
import { jobService } from "@/services/job-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const initialJob = {
  name: "",
};

export const useJobCreate = (column: BoardColumnModel) => {
  const [company, setCompany] = useState<CompanyModel>(initialJob);

  const { getAccessTokenSilently } = useAuth0();
  const {
    mutate: createJob,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async () => {
      if (!company) {
        throw new Error("Company is required");
      }
      const accessToken = await getAccessTokenSilently();

      return jobService.createJob(accessToken, {});
    },
  });

  return { error, isLoading, company, setCompany, createJob };
};
