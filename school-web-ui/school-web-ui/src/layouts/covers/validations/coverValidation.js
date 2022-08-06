import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  coverName: Yup.string().required("Lütfen veli adını girin."),
  coverSurname: Yup.string().required("Lütfen veli soyadını girin."),
  coverEmail: Yup.string()
    .email("Email formatına dikkat edin.")
    .required("Lütfen veli email girin."),
});
