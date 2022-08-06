import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  lessonName: Yup.string().required("Lütfen ders adını girin."),
});
