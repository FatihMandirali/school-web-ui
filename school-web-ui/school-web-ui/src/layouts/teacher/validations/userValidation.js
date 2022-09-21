import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  teacherName: Yup.string().required("Lütfen adını girin."),
  teacherSurname: Yup.string().required("Lütfen soyadını girin."),
  tcPaspNo: Yup.string().required("Lütfen kimlik bilgisini girin."),
  emailAdress: Yup.string().email("Email formatına dikkat edin.").required("Lütfen email girin."),
  lessonId: Yup.number().min(1, "Lütfen ders seçin"),
  branchId: Yup.number().min(1, "Lütfen bölge seçin"),
});
