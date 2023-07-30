import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  margin-bottom: 45px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  background-color: #999;
  flex: 1;
  border: 8px solid #FF8633;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-left: 57px;
`;

const Cards = ({ type, user, image, key }) => {
  return (
    <Link to={`/Teachers/${user._id}`} style={{ textDecoration: 'none' }}>
      <Container>
        <Image src={`http://localhost:8800/${user.image.replace(/^.*[\\/]/, '')}`} alt="User" />
        <Details>
          <Texts>
            <Title>{ user.firstName }</Title>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Cards;
