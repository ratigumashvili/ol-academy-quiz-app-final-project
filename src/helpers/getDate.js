import moment from "moment";

const formatted_date = () => {
  return moment().format("MMMM Do YYYY, h:mm:ss");
};

export default formatted_date;
