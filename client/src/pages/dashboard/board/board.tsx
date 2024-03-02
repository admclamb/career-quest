import Container from "@/layout/container/container";
import Layout from "@/layout/layout";
import { useParams } from "react-router-dom";
import { useBoard } from "./board.hooks";
import PageLoader from "@/components/loader/page-loader/page-loader";
import ErrorAlert from "@/errors/error-alert/error-alert";

const Board = () => {
  const { boardId } = useParams();
  const { board, isLoading, error } = useBoard(boardId ? +boardId : null);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <Container>
        <ErrorAlert error={error} />
        <h1>TESTING</h1>
        {JSON.stringify(board)}
      </Container>
    </Layout>
  );
};

export default Board;
