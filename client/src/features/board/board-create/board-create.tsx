import ErrorAlertFixed from "@/errors/error-alert-fixed/error-alert-fixed";
import { useBoardCreate } from "./board-create.hooks";
import { Button } from "@/components/ui/button";

const BoardCreate = () => {
  const { createBoard, error, setError, isLoading } = useBoardCreate();

  return (
    <>
      <ErrorAlertFixed error={error} setError={setError} showClose />
      <Button disabled={isLoading} onClick={createBoard}>
        {isLoading ? "Loading..." : "Create Board"}
      </Button>
    </>
  );
};

export default BoardCreate;
