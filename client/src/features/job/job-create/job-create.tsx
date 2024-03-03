import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useJobCreate } from "./job-create.hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BoardColumnModel } from "@/models/board-column-model";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CompanyInputSearch from "@/features/company/company-input-search/company-input-search";

type Props = {
  column: BoardColumnModel;
};

const JobCreate = ({ column }: Props) => {
  const { error, setError, isLoading, company, setCompany } = useJobCreate();

  return (
    <>
      <ErrorAlertFixed error={error} setError={setError} showClose />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="drop-shadow py-1">
            <Plus size={18} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogHeader>
              <h3 className="font-semibold">Add Job</h3>
            </AlertDialogHeader>
          </AlertDialogHeader>
          <CompanyInputSearch company={company} setCompany={setCompany} />
          <div className="flex flex-col gap-3">
            <Label htmlFor="job-title">Job Title</Label>
            <Input id="job title" placeholder="Job Title" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Save Job</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobCreate;
