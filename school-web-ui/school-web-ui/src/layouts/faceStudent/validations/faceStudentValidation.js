import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  name: Yup.string().required("Lütfen adı girin."),
  surName: Yup.string().required("Lütfen soyadı girin."),
  schoolName: Yup.string().required("Lütfen okulu girin."),
  idNo: Yup.string().required("Lütfen öğrenci numarası girin."),
  email: Yup.string().email("Email formatına dikkat edin.").required("Lütfen email girin."),
});
