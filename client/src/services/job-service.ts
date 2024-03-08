import { JobModel } from "@/models/job-model";
import { AxiosRequestConfig } from "axios";
import api from "./api";

const createJob = (
  accessToken: string,
  job: object,
  companyName?: string
): Promise<JobModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/job",
    method: "POST",
    data: {
      job,
      companyName,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<JobModel>({ config });
};

const jobService = {
  createJob,
};

Object.freeze(jobService);

export { jobService };
