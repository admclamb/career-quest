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

type Props = {
  column: BoardColumnModel;
};

const JobCreate = ({ column }: Props) => {
  const { error, setError, isLoading } = useJobCreate();

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
            <AlertDialogHeader>Add Job</AlertDialogHeader>
          </AlertDialogHeader>
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
