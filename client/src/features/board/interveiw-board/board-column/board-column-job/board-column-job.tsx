import { Button } from "@/components/ui/button";
import { JobModel } from "@/models/job-model";
import { useBoardColumnJob } from "./board-column-job.hooks";

type Props = {
  job: JobModel;
};

const BoardColumnJob = ({ job }: Props) => {
  const { openJob } = useBoardColumnJob(job);
  return (
    <Button
      className="p-3 h-[unset] drop-shadow w-full flex-col items-start text-md  "
      variant="outline"
      onClick={openJob}
    >
      <p className="font-semibold">{job.jobTitle}</p>
      <p>{job?.company?.name}</p>
    </Button>
  );
};

export default BoardColumnJob;
