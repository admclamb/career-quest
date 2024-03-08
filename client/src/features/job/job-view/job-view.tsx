import { useJobView } from "./job-view.hooks";
import { Button } from "@/components/ui/button";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { X } from "lucide-react";
import Loader from "@/components/loader/loader";
import JobViewEdit from "./job-view-edit/job-view-edit";

const JobView = () => {
  const { closeJob, job, error, isLoading, isEditing, toggleEditing } =
    useJobView();
  return (
    <>
      <div
        className="bg-foreground fixed top-0 left-0 w-full h-full opacity-50"
        onClick={closeJob}
      ></div>
      <ErrorAlertFixed error={error} showClose />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded p-5 z-[100] flex flex-col gap-5 w-[30%]">
        {isLoading ? (
          <div className="h-[10vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : isEditing ? (
          <JobViewEdit job={job} closeJob={closeJob} />
        ) : (
          <>
            <div className="flex gap-5 items-center">
              <h3 className="font-semibold text-xl">{job?.jobTitle}</h3>
              <Button
                variant="ghost"
                className="ml-auto h-10 w-10 p-1"
                onClick={closeJob}
              >
                <X size={16} />
              </Button>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Job Title</p>
                <p className="text-muted-foreground">
                  {job?.jobTitle ?? "No Job Title Available"}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Company</p>
                <p className="text-muted-foreground">
                  {job?.company?.name ?? "No Company Available"}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Description</p>
                <p className="text-muted-foreground">
                  {job?.description ?? "No Job Description Available"}
                </p>
              </div>
            </div>
            <div className="flex gap-5"></div>
          </>
        )}
      </div>
    </>
  );
};

export default JobView;
