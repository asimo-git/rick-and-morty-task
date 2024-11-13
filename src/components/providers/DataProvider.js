import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true
      });
    }
  }, [location, navigate]);

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  useEffect(() => {
    fetchData(`${API_URL}${location.search}`);
  }, [location]);

  const dataValue = useMemo(
    () => ({
      characters,
      isFetching,
      isError,
      info
    }),
    [characters, isFetching, isError, info]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
