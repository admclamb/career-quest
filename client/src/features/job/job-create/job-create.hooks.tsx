import { BoardColumnModel } from "@/models/board-column-model";
import { CompanyModel } from "@/models/company-model";
import { jobService } from "@/services/job-service";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const initialJob = {
  name: "",
};

export const useJobCreate = (column: BoardColumnModel) => {
  const [company, setCompany] = useState<CompanyModel>(initialJob);
  const [jobTitle, setJobTitle] = useState<string>("");

  const { getAccessTokenSilently } = useAuth0();
  const {
    mutate: createJob,
    error,
    data,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async () => {
      console.log("HERE");
      if (!company) {
        throw new Error("Company is required");
      }
      const accessToken = await getAccessTokenSilently();

      return jobService.createJob(
        accessToken,
        column.id,
        company.name,
        jobTitle
      );
    },
  });

  const changeJobTitle = (value: string) => {
    setJobTitle(value);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return {
    error,
    isLoading,
    company,
    setCompany,
    createJob,
    jobTitle,
    changeJobTitle,
  };
};
