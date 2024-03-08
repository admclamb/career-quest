import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  header: string;
  message: string;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};

const AlertLoading = ({ isLoading, header, message, icon }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!isLoading) {
    return null;
  }

  return isOpen ? (
    <Alert className="fixed top-5 left-1/2 -translate-x-1/2">
      {icon}
      <AlertTitle>{header}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <Button
        variant="ghost"
        className="w-10 h-10"
        onClick={() => setIsOpen(false)}
      >
        <X size={16} />
      </Button>
    </Alert>
  ) : null;
};

export default AlertLoading;
