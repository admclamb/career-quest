import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoardColumnModel } from "@/models/board-column-model";
import { Check, MoreHorizontal, Plus } from "lucide-react";
import { useBoardColumnHeader } from "./board-column-header.hooks";
import AlertInformation from "@/components/alert/alert-information/alert-information";
import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import AlertLoading from "@/components/alert/alert-loading/alert-loading";

type Props = {
  column: BoardColumnModel;
};

const BoardColumnHeader = ({ column }: Props) => {
  const { addJob, deleteColumn, message, isPending, error } =
    useBoardColumnHeader(column);
  return (
    <div className="p-3 flex flex-col gap-5">
      <AlertInformation
        message={message?.message}
        header="Deletion is successful"
        icon={<Check size={16} />}
      />
      <ErrorAlertFixed error={error} showClose />
      <AlertLoading isLoading={isPending} />
      <div className="flex justify-between items-center gap-7">
        <p>🚀</p>
        <h6 className="font-semibold">{column.label}</h6>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 h-8 w-8">
              <MoreHorizontal size={24} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              onClick={() => deleteColumn()}
              disabled={isPending}
            >
              Delete Column
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button variant="outline" className="drop-shadow py-1" onClick={addJob}>
        <Plus size={18} />
      </Button>
    </div>
  );
};

export default BoardColumnHeader;
