import { CompanyModel } from "@/models/company-model";
import { JobModel } from "@/models/job-model";
import { useState } from "react";

export const useJobViewEdit = (job: JobModel, closeJob: () => void) => {
  const [jobTitle, setJobTitle] = useState<string>(job.jobTitle);
  const [company, setCompany] = useState<CompanyModel>(
    job?.company ?? {
      name: "",
    }
  );
  const [jobDescription, setJobDescription] = useState<string>(job.description);

  const changeJobTitle = (value: string) => {
    setJobTitle(value);
  };

  const changeCompany = (value: string) => {
    setCompany((curr) => ({ ...curr, name: value }));
  };

  const changeJobDescription = (value: string) => {
    setJobDescription(value);
  };

  return {
    jobTitle,
    changeJobTitle,
    company,
    changeCompany,
    jobDescription,
    changeJobDescription,
  };
};
