import { useParams } from "react-router-dom";
import useDetail from "./service/useDetail";
import DetailStudentComponent from "../../components/DetailStudent/DetailStudentComponent";

function CreateUser() {
  const { id } = useParams();
  const { serviceDetail } = useDetail(id);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {serviceDetail.serviceStatus === "loaded" && (
        <DetailStudentComponent
          studentId={3}
          studentNo={serviceDetail.data.StudentNo}
          studentName={serviceDetail.data.StudentName}
          studentSurname={serviceDetail.data.StudentSurname}
          studentTcOrPassNo={serviceDetail.data.StudentTcOrPassNo}
          adress={serviceDetail.data.Adress}
          studentEmail={serviceDetail.data.StudentEmail}
          branchId={serviceDetail.data.BranchId}
          country={serviceDetail.data.Country}
          studentPerId={serviceDetail.data.StudentPerId}
          studentPerId2={serviceDetail.data.StudentPerId2}
          studentPerId3={serviceDetail.data.StudentPerId3}
          studentPhoneNumber={serviceDetail.data.StudentPhoneNumber}
          studentClass={serviceDetail.data.StudentClass}
          schoolName={serviceDetail.data.SchoolName}
        />
      )}
    </>
  );
}

export default CreateUser;
