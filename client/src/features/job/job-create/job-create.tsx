import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useJobCreate } from "./job-create.hooks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BoardColumnModel } from "@/models/board-column-model";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CompanyInputSearch from "@/features/company/company-input-search/company-input-search";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  column: BoardColumnModel;
};

const JobCreate = ({ column }: Props) => {
  const { error, company, setCompany, createJob, jobTitle, changeJobTitle } =
    useJobCreate(column);

  return (
    <>
      <ErrorAlertFixed error={error} showClose />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="drop-shadow py-1">
            <Plus size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogHeader>
              <h3 className="font-semibold">Add Job</h3>
            </DialogHeader>
          </DialogHeader>
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
          <DialogFooter>
            <Button type="submit" onClick={() => createJob()}>
              Save Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCreate;
