import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { download } from 'downloadjs';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    gap: 24px;
`

const Content = styled.div`
    flex: 5;
`

const Title = styled.h1`
    font-size: 60px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
`

const Recommendation = styled.div`
    flex: 2;
`

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: gray;
    margin-top: 13px;
`

const Information = styled.p`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.text};
    margin-top: 13px;
`

const Img = styled.img`
    width: 250px;
    height: 250px;
    max-width: 100%;
    -ms-flex-item-align: start;
    align-self: flex-start;
    border: 8px solid #FF8633;
    border-radius: 40px;
`

const Hr = styled.hr`
    margin: 15px 0px;
    border: 1px solid gray;
`

const Modules = ({ isLightMode }) => {
  const { courseId, nameM, firstName, lastName } = useParams();
  const [courses, setCourses] = useState([]);
  const [chapter, setChapter] = useState([]);
  const [user, setUser] = useState(null);










 // get the chpater of the course selecred  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/chapter/getChapter/${courseId}`);
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [courseId]);





// get the information of the course 
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/course/findById/${courseId}`);
        console.log(res.data);
        setChapter(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (courseId) {
      fetchChapter();
    }
  }, [courseId]);






// get the teacher of this course 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/find/${chapter.userId}`);
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (chapter.userId) {
      fetchUser();
    }
  }, [chapter]);









  return (
    <>
      <Title>{nameM}</Title>
      <Details>
        {user && (
          <Link to={`/Teachers/${user._id}`} style={{ textDecoration: 'none' }}>
          <a style= {{color:`${isLightMode? ' white':'black'}`}}class="sr-only sr-only-focusable" href="#content">
            {user.firstName} {user.lastName}</a>
            </Link>

          
        )}
              

      </Details>
      <Hr />
      {courses.map((course) => (
        <div key={course._id} className="d-inline-flex">
          <a
            type="button"
            className={`btn ${isLightMode ? 'btn-light ' : 'btn-dark'} btn-primary m-4`}
            href={`http://localhost:8800/${course.file.replace(/^.*[\\/]/, '')}`}
            style={{ margin: '20px' }}
            download={course.src}
          >
            {course.name}
          </a>
        </div>
      ))}
    </>
  );
}

export default Modules;
