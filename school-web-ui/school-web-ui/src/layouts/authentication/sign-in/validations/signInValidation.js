import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  email: Yup.string().required("Lütfen kullanıcı adını girin."),
  password: Yup.string().required("Lütfen şifrenizi girin."),
  roleName: Yup.mixed().oneOf(
    ["Admin", "Teacher", "AdminTeacher", "Cover", "Student"],
    "Lütfen Giriş tipi seçin"
  ),
});
