import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 200px; /* Set a minimum height for the container */
`;

const Home = ({ isLightMode }) => {
  const [student, setStudent] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState([]);
  const [Teacher, setTeacher] = useState([]);


  //find the current users
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/find/${currentUser}`);

        console.log(res.data)
        setUser(res.data);
      }
      catch (err) {
        console.error(err);

      }

    };

    fetchCourses();
  }, []);








  // get the information of crreant user in student (level) 
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/student/getStudent/${currentUser}`);
        console.log(res.data[0]);
        setStudent(res.data[0]);
        console.log(res.data[0].level);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [currentUser]);






  // find the courses of the student 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/course/findCourseBystudent/${student.level ? student.level : null}`);
        console.log(res.data);
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (student.level) {
      fetchCourses();
    }
  }, [student.level]);








  //  get the teachers 
  useEffect(() => {
    const fetchTeacher = async () => {
      const helf = await axios.get(`http://localhost:8800/api/teacher/getTeachers/${courses[0].userId}`);

      setTeacher(helf.data);
    };

    fetchTeacher();
  }, [courses.userId]);









  return (
    <>
      {courses.map((course) => (
        <div key={course._id} className='d-inline-flex'>
          <Link to={`/Modules/${course._id}/${course.name}/${user.firstName}/${user.lastName}`} style={{ textDecoration: 'none' }}>

            <button
              type="button"
              className={`btn ${isLightMode ? 'btn-light' : 'btn-dark '} btn-primary m-4 `}
              style={{ margin: '20px' }}
            >
              {course.name}
            </button>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Home;
