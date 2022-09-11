import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useDetail from "./service/useDetail";
import DetailFaceStudentComponent from "./component/DetailFaceStudentComponent";

function DetailBranch() {
  const { id } = useParams();
  const { serviceDetail, getDetail } = useDetail(id);

  useEffect(async () => {
    await getDetail(id);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {serviceDetail.serviceStatus === "loaded" && (
        <DetailFaceStudentComponent data={serviceDetail.data} />
      )}
    </>
  );
}

export default DetailBranch;
