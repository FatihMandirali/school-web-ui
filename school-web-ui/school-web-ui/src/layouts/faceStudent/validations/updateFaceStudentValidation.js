import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  StudentName: Yup.string().required("Lütfen adı girin."),
  StudentSurname: Yup.string().required("Lütfen soyadı girin."),
  StudentTcOrPassNo: Yup.string().required("Lütfen öğrenci numarası girin."),
  StudentEmail: Yup.string().email("Email formatına dikkat edin.").required("Lütfen email girin."),
});
