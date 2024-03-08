import PageLoader from "@/components/loader/page-loader/page-loader";
import { useJobView } from "./job-view.hooks";
import { Button } from "@/components/ui/button";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { X } from "lucide-react";
import Loader from "@/components/loader/loader";

const JobView = () => {
  const { closeJob, job, error, isLoading } = useJobView();
  return (
    <>
      <div
        className="bg-foreground fixed top-0 left-0 w-full h-full opacity-50"
        onClick={closeJob}
      ></div>
      <ErrorAlertFixed error={error} showClose />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded p-5 z-[100] flex flex-col gap-5 w-[50%]">
        {isLoading ? (
          <div className="h-[10vh] flex justify-center items-center">
            <Loader />
          </div>
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
              <div className="flex flex-col gap-3"></div>
            </div>
            <div className="flex gap-5"></div>
          </>
        )}
      </div>
    </>
  );
};

export default JobView;
