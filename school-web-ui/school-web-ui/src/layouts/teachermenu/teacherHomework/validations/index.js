import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export const validationSchema = Yup.object({
  description: Yup.string().required("Açıklama girin."),
  lessonId: Yup.number().min(1, "Lütfen ders seçin"),
  classId: Yup.number().min(1, "Lütfen sınıf seçin"),
});
