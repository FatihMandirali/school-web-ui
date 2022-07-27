import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  firstName: Yup.string().required("Lütfen adını girin."),
  surname: Yup.string().required("Lütfen soyadını girin."),
  userName: Yup.string().required("Lütfen kullanıcı adını girin."),
  tc: Yup.number().typeError("Lütfen rakam girin").required("Lütfen tc girin."),
  roleId: Yup.number().min(1, "Lütfen rol seçin"),
  branchId: Yup.number().min(1, "Lütfen bölge seçin"),
  pass: Yup.string().required("Lütfen şifre girin."),
});
