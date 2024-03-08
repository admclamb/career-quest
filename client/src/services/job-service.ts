import { JobModel } from "@/models/job-model";
import { AxiosRequestConfig } from "axios";
import api from "./api";

const createJob = (
  accessToken: string,
  columnId: number,
  companyName: string,
  jobTitle: string
): Promise<JobModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/job",
    method: "POST",
    data: {
      columnId,
      companyName,
      jobTitle,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.callExternalApi<JobModel>({ config });
};

const findJobById = (accessToken: string, jobId: number): Promise<JobModel> => {
  const config: AxiosRequestConfig = {
    url: "/api/v1/job/find",
    params: {
      jobId,
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
  findJobById,
};

Object.freeze(jobService);

export { jobService };
