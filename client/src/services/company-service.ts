import { ApiResponse } from "@/models/api-repsonse-model";
import { CompanyModel } from "@/models/company-model";
import { PaginationResponse } from "@/models/pagination-response";
import { AxiosRequestConfig } from "axios";
import api from "./api";

const findCompaniesBySearch = (
  accessToken: string,
  search: string,
  page: number = 1,
  size: number = 10,
  timestamp: Date
): Promise<ApiResponse<PaginationResponse<CompanyModel>>> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/company",
    params: {
      timestamp: timestamp.toISOString(),
      page,
      size,
      search,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<PaginationResponse<CompanyModel>>({ config });
};

const companyService = {
  findCompaniesBySearch,
};

Object.freeze(companyService);
export { companyService };
