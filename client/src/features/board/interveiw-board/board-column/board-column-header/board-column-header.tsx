import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoardColumnModel } from "@/models/board-column-model";
import { MoreHorizontal, Plus } from "lucide-react";

type Props = {
  column: BoardColumnModel;
};

const BoardColumnHeader = ({ column }: Props) => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center gap-7">
        <p>🚀</p>
        <h6 className="font-semibold">{column.label}</h6>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1 h-8 w-8">
              <MoreHorizontal size={24} />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <Button variant="outline" className="drop-shadow py-1">
        <Plus />
      </Button>
    </div>
  );
};

export default BoardColumnHeader;
