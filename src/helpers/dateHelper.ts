import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | null) => {
  return date ? dayjs(date).format('MMM D, YYYY h:mm A') : null;
}