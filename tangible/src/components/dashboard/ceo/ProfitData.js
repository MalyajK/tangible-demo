import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfitData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const response = await axios
        .get("https://api.apispreadsheets.com/data/9058/")
        .then((response) => {
          setLoading(false);
          console.log(response);
          setProject(response.data.rows[0:7])
        });
    }
    getData();
  }, []);

  return <h1>Hello World</h1>;
};

export default ProfitData;
