import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from './providers';

export function Pagination() {
  const { info } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page'), 10);

    if (!isNaN(page) && page > 0) {
      setActivePage(page - 1);
    }
  }, [location]);

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(index);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', index + 1);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (!info.pages || info.pages.length <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 0 && (
        <>
          <Page onClick={() => pageClickHandler(0)}>« First</Page>
          {activePage > 1 && <Ellipsis>...</Ellipsis>}
          <Page onClick={() => pageClickHandler(activePage - 1)}>
            {activePage}
          </Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {activePage < info.pages - 1 && (
        <>
          <Page onClick={() => pageClickHandler(activePage + 1)}>
            {activePage + 2}
          </Page>
          {activePage < info.pages - 2 && <Ellipsis>...</Ellipsis>}
          <Page onClick={() => pageClickHandler(info.pages - 1)}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
