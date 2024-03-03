import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

type Props = {
  company: string;
  setCompany: Dispatch<SetStateAction<string>>;
};

const CompanyInputSearch = ({ company, setCompany }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="company-name">Company Name</Label>
      <Input
        id="company-name"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
    </div>
  );
};

export default CompanyInputSearch;
