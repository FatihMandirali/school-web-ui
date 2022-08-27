const prepareRequestData = async (data, classId) => {
  console.log(data);

  const rq = [];

  // eslint-disable-next-line array-callback-return
  data.map((item) => {
    rq.push({
      classId,
      lessonId: item.LessonId,
      clockTime: item.ClockTime,
      teacherId: item.TeacherId,
      dayId: item.DayId,
    });
  });

  const request = rq;

  return request;
};

export default prepareRequestData;
