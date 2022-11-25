import { useEffect, useState } from "react";
import {
  setDataWithExpiry,
  getDataWithExpiry,
} from "../helpers/getLocalStorage";

// const URL = `https://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db`;
const URL = `https://my-json-server.typicode.com/ratigumashvili/quizz-db/db`;

const useFetch = () => {
  const [fetchedData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL);
      const data = await response.json();
      setDataWithExpiry("data", data, 600000);
      setFetchData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setFetchData(getDataWithExpiry("data"));
    } else {
      fetchData();
    }
  }, []);

  return { fetchedData, loading };
};

export default useFetch;
