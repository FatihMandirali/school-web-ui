import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import MDBox from "../../../components/MDBox";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import useDetail from "./service/useDetail";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import HomeworkComponent from "./components/HomeworkComponent";

function CreateUser() {
  const { id } = useParams();
  console.log(id);
  const { serviceDetail } = useDetail(id);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ödev Detay" />
      <MDBox>
        <Card>
          {serviceDetail.serviceStatus === "loaded" && (
            <HomeworkComponent
              homeworkId={id}
              classId={serviceDetail.data[0].ClassId}
              lessonId={serviceDetail.data[0].LessonId}
              homeWorkDescription={serviceDetail.data[0].HomeWorkDescription}
              endDate={serviceDetail.data[0].EndDate}
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateUser;
