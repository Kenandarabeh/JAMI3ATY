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
  color: #000000;
`;
const Titles = styled.h1`
font-size: 15px;
font-weight: 400;
color:  #000000;
`;

const Recommendation = styled.div`
  flex: 2;
`;


const Detailse = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000000;
    margin-top: 13px;
`


const Information = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000000;
    margin-top: 13px;
`


const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:  #000000;
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
  border: 1px solid  #000000;
`;

const Teachers2 = ({isLightMode}) => {
    const { IdT } = useParams();
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState({});
const [loading, setLoading] = useState([]);

// not used but i can used in nother place 




    useEffect(() => {
        const fetchCourses = async () => {
            const res = await axios.get(`http://localhost:8800/api/course/find/${IdT}`);
            setCourses(res.data);
        };

        fetchCourses();
    }, [IdT]);








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
                <Details>{loading.Branded}</Details>
               
                <Hr />
                <Details> 
                    
                    {loading.description}</Details>
                    <br />
                <br />
                <br />
                <Hr />
                <br />
                <br />
                <Title>Available Courses:</Title>
                {courses.map((course) => (
                    <div key={course._id} className='d-inline-flex'>
                        <Link to={`/Modules/${course._id}/${course.name}/${user.firstName}/${user.lastName}`} style={{ textDecoration: 'none' }}>
                            <button type="button"  className={`btn btn-dark btn-primary  m-4`} style={{ margin: '20px' }}>
                                {course.name}
                            </button>
                        </Link>
                    </div>
                ))}
            </Content>

            <Recommendation>
                {user.image ? <Img src={`http://localhost:8800/${user.image.replace(/^.*[\\/]/, '')}`} /> : null}
            </Recommendation>
        </Container>
    );
};

export default Teachers2;
