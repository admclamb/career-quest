import { Card } from "@/components/ui/card";
import { JobModel } from "@/models/job-model";

type Props = {
  job: JobModel;
};

const BoardColumnJob = ({ job }: Props) => {
  return (
    <Card className="p-3 drop-shadow">
      <p className="font-semibold">{job.jobTitle}</p>
      <p>{job?.company?.name}</p>
    </Card>
  );
};

export default BoardColumnJob;
