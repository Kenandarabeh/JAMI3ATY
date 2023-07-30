import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;
const Titles = styled.h1`
font-size: 15px;
font-weight: 400;
color: ${({ theme }) => theme.text};
`;

const Recommendation = styled.div`
  flex: 2;
`;


const Detailse = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:${({ theme }) => theme.textSoft};
    margin-top: 13px;
`


const Information = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:${({ theme }) => theme.text};
    margin-top: 13px;
`


const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 13px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  max-width: 100%;
  -ms-flex-item-align: start;
  align-self: flex-start;
  border: 8px solid #ff8633;
  border-radius: 40px;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 1px solid ${({ theme }) => theme.textSoft};
`;

const Teachers = ({isLightMode}) => {
    const { IdT } = useParams();
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState({});
const [loading, setLoading] = useState([]);



    //  to get the course for the  teacher 
    useEffect(() => {
        const fetchCourses = async () => {
            const res = await axios.get(`http://localhost:8800/api/course/find/${IdT}`);
            setCourses(res.data);
        };

        fetchCourses();
    }, [IdT]);





    //  to get the information to the teacher 
    useEffect(() => {
        const fetchTeacher = async () => {
            const helf = await axios.get(`http://localhost:8800/api/teacher/getTeachers/${IdT}`);

            setLoading(helf.data[0]);
        };

        fetchTeacher();
    }, [IdT]);







    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users/find/${IdT}`);
            setUser(res.data);
        };

        fetchUser();
    }, [IdT]);



    console.log(`${loading}`)

    return (
        <Container>
            <Content>
                <Title> Dr.{user.firstName}</Title>
                <Details>{user.specialization}</Details>
               
                <Hr />
                <Details> 
                    
                    {loading.description}</Details>
                    <br />
                <br />
                <br />
                <Hr />
                <br />
                <br />
             
            </Content>

            <Recommendation>
                {user.image ? <Img src={`http://localhost:8800/${user.image.replace(/^.*[\\/]/, '')}`} /> : null}
            </Recommendation>
        </Container>
    );
};

export default Teachers;
