import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useJobCreate } from "./job-create.hooks";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CompanyInputSearch from "@/features/company/company-input-search/company-input-search";

type Props = {
  columnId: number;
};

const JobCreate = ({ columnId }: Props) => {
  const {
    error,
    company,
    setCompany,
    createJob,
    jobTitle,
    changeJobTitle,
    closeJob,
  } = useJobCreate(columnId);

  return (
    <>
      <div
        className="bg-foreground fixed top-0 left-0 w-full h-full opacity-50"
        onClick={closeJob}
      ></div>
      <ErrorAlertFixed error={error} showClose />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded p-5 z-[100] flex flex-col gap-5 w-[20%]">
        <div className="flex gap-5 items-center">
          <h3 className="font-semibold">Add Job</h3>
          <Button
            variant="ghost"
            className="ml-auto h-10 w-10 p-1"
            onClick={closeJob}
          >
            <X size={16} />
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          <CompanyInputSearch company={company} setCompany={setCompany} />
          <div className="flex flex-col gap-3">
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job title"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => changeJobTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <Button type="submit" onClick={() => createJob()} className="ml-auto">
            Save Job
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobCreate;
