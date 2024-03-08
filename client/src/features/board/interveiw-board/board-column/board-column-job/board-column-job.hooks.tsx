import { JobModel } from "@/models/job-model";
import { useNavigate } from "react-router-dom";

export const useBoardColumnJob = (job: JobModel) => {
  const navigate = useNavigate();
  const openJob = () => {
    navigate(`view-job/${job.id}`);
  };

  return { openJob };
};
