import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from './Logo';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    page: '1'
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: false
    });
  };

  return (
    <HeaderContainer>
      <Logo />
      <FiltersContainer>
        <FilterInput
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <FilterSelect
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </FilterSelect>
        <FilterInput
          type="text"
          name="species"
          placeholder="Species"
          value={filters.species}
          onChange={handleFilterChange}
        />
        <FilterInput
          type="text"
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <FilterSelect
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </FilterSelect>
        <FilterButton onClick={applyFilters}>apply filters</FilterButton>
      </FiltersContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const FilterBase = styled.div`
  padding: 0.5rem 1rem;
  border: 2px solid #00ff9d;
  border-radius: 5px;
  background-color: #161625;
  color: #ffffff;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #00e3ff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterInput = styled(FilterBase).attrs({ as: 'input' })``;
const FilterSelect = styled(FilterBase).attrs({ as: 'select' })``;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: #00e3ff;
  color: #1a1a2e;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00ff9d;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
