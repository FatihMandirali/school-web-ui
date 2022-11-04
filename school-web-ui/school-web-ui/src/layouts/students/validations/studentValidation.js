import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  studentNo: Yup.string().required("Lütfen öğrenci numarası girin."),
  /* studentName: Yup.string().required("Lütfen adı girin."),
  studentSurName: Yup.string().required("Lütfen öğrenci soyadı girin."),
  studentIdName: Yup.string().required("Lütfen tc veya pasaport numarası soyadı girin."),
  adress: Yup.string().required("Lütfen adresi girin."),
  country: Yup.number().min(1, "Lütfen ülke seçin"),
  email: Yup.string().email("Email formatına dikkat edin.").required("Lütfen veli email girin."),
  classId: Yup.number().min(1, "Lütfen sınıf seçin"),
  branchId: Yup.number().min(1, "Lütfen bölge seçin"),
  studentPerId: Yup.number().min(1, "Lütfen veli seçin"), */
});
