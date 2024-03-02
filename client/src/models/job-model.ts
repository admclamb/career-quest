import { CompanyModel } from "./company-model";

export interface JobModel {
  id: number;
  company: CompanyModel | null;
  jobTitle: string;
  description: string;
  postUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
