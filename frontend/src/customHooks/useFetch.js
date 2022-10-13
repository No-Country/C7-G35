import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [useData, setUseData] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const gatData = async () => {
    const { data } = await axios.get(url);
    setUseData(
      {
        loading: false,
        data,
      },
    );
  };

  useEffect(() => {
    gatData();
  }, [url]);

  return useData;
};

export default useFetch;
