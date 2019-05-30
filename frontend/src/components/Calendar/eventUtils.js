import moment from "moment";

export const getValidDate = (
  startDate,
  endDate,
  startTime,
  endTime,
  forward = true
) => {
  let newStartDate = moment(startDate);
  let newEndDate = moment(endDate);
  let newStartTime = moment(startTime, "HH:mm");
  let newEndTime = moment(endTime, "HH:mm");

  /* If end date is before start date, set it to same date */
  if (newEndDate < newStartDate) {
    if (forward) {
      newEndDate = newStartDate;
    } else {
      newStartDate = newEndDate;
    }
  }

  /* If same date but end time is before start time, set time between to one hour */
  if (
    newStartDate.isSame(newEndDate) &&
    newEndTime.format("HH:mm") <= newStartTime.format("HH:mm")
  ) {
    if (forward) {
      newEndTime = moment(newStartTime).add(1, "hours");
    } else {
      newStartTime = moment(newEndTime).subtract(1, "hours");
    }
  }

  /* If new time is past twelve o'clock, set date to other day */
  if (newEndTime.format("HH:mm") < newStartTime.format("HH:mm")) {
    if (forward) {
      newEndDate = moment(newStartDate).add(1, "days");
    } else {
      newStartDate = moment(newEndDate).subtract(1, "days");
    }
  }

  return {
    startDate: newStartDate.toDate(),
    endDate: newEndDate.toDate(),
    startTime: newStartTime.format("HH:mm"),
    endTime: newEndTime.format("HH:mm")
  };
};

export const getClosestInterval = () => {
  const currentTime = moment(new Date());
  const remainder = 30 - (currentTime.minute() % 30);
  let roundedTime = currentTime.add(remainder, "minutes");
  if (roundedTime.format("HH:mm") === "00:00") {
    roundedTime = roundedTime.subtract(1, "hours");
  }
  return {
    startTime: roundedTime.format("HH:mm"),
    endTime: roundedTime.add(1, "hours").format("HH:mm")
  };
};
