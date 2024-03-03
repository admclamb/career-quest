import { CompanyModel } from "@/models/company-model";
import { ErrorModel } from "@/models/error-model";
import { useState } from "react";

const initialJob = {
  name: "",
};

export const useJobCreate = () => {
  const [company, setCompany] = useState<CompanyModel>(initialJob);

  const [error, setError] = useState<ErrorModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { error, setError, isLoading, company, setCompany };
};
