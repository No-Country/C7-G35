import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url, token) => {
  const [useData, setUseData] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const gatData = async () => {
    const { data } = await axios(
      url,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setUseData(
      {
        loading: false,
        data,
      },
    );
  };

  useEffect(() => {
    gatData();
  }, [url, token]);

  return useData;
};

export default useFetch;
