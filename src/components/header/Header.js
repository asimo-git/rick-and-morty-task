import styled from 'styled-components';
import { FiltersBar } from './FiltersBar';
import { Logo } from './Logo';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FiltersBar />
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
