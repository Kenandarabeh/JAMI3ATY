import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const Hr = styled.hr`
  margin: 15px 0px;
  border: 3px solid gray;
`;

function CreateModules2({ isLightMode }) {
  const { userId, nameT } = useParams();

  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState('');
  const [level, setLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [user, setUser] = useState('');
  const [departementname, getdepartementname] = useState([])
  const [specializatione, setSpecializatione] = useState([]);

  const [specializationename, setSpecializationename] = useState([]);
  const [levele, setlevele] = useState([]);

// to page admin


  // to get the user information 
  useEffect(() => {
    const fetchinstitute = async () => {
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:8800/api/users/find/${userId}`);
          console.log(res)
          setUser(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchinstitute();
  }, [userId]);








// to get the information to the departement (id_departement) with name of course
  useEffect(() => {
    const fetchInstitute = async () => {
      if (user.Department) {
        try {
          const res = await axios.get(`http://localhost:8800/api/department/aD/${user.Department}`);
          console.log(res.data[0])
          getdepartementname(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };









    fetchInstitute();
  }, [user.Department]);









  //get the information of the specialization slected(id_specialization)
  useEffect(() => {
    const fetchInstitute = async () => {
      if (specialization) {
        try {
          const res = await axios.get(`http://localhost:8800/api/specialization/aS/${specialization}`);
          console.log(res.data[0])
          setSpecializationename(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };


    fetchInstitute();
  }, [specialization]);












  //get all the level the of the specialization selected
  useEffect(() => {
    const fetchinstitute = async () => {
      if (specializationename._id) {
        try {
          const res = await axios.get(`http://localhost:8800/api/level/alllev/${specializationename._id}`);
          console.log(res.data)
          setlevele(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };



    fetchinstitute();
  }, [specializationename._id]);






  
  // get all the specializaiton of the deprtement of user
  useEffect(() => {
    const fetchinstitute = async () => {
      if (departementname) {
        try {
          const res = await axios.get(`http://localhost:8800/api/specialization/allS/${departementname ? departementname._id : null}`);
          console.log(res)
          setSpecializatione(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };





    fetchinstitute();
  }, [departementname._id]);









  // get information of the user
  useEffect(() => {
    const fetchCourses = async () => {

      try {
        const res = await axios.get(`http://localhost:8800/api/course/find/${userId}`);
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };


    fetchCourses();
  }, [currentUser, modules]);










// update course 
  const handleAddModule = async (e) => {
    e.preventDefault();
    if (newModule.trim() !== '' && level.trim() !== '' && specialization.trim() !== '') {
      try {
        if (selectedModule) {
          await axios.put(`http://localhost:8800/api/course/update/${selectedModule._id}`, {
            name: newModule,
            level: level,
            specialization: specialization
          });
          setModules(modules.map(module => {
            if (module._id === selectedModule._id) {
              return {
                ...module,
                name: newModule,
                level: level,
                specialization: specialization
              };
            }
            return module;
          }));
          setSelectedModule(null);
        } else {
          const res = await axios.post(`http://localhost:8800/api/course/add/${userId}`, {
            name: newModule,
            level: level,
            specialization: specialization
          });
          setModules([...modules, res.data]);
        }
        setNewModule('');
        setLevel('');
        setSpecialization('');
      } catch (error) {
        console.error(error);
      }
    }
  };







// delete course 
  const handleDeleteModule = async (moduleId) => {
    try {
      await axios.delete(`http://localhost:8800/api/course/delete/${moduleId}`);
      setModules(modules.filter(module => module._id !== moduleId));
    } catch (error) {
      console.error(error);
    }
  };






// serche of the courses
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };




// to button create course when i click in the button create course the the form appaire and the oposite 
  const handleToggleCreateUser = () => {
    setShowCreateUser(!showCreateUser);
    if (!showCreateUser) {
      setSelectedModule('');
      setNewModule('');
      setLevel('');
      setSpecialization('');
    }
  };








// to serche of the user 
  const filteredCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(searchTerm.toLowerCase());
  });







// when i click in modify the valeur go to the input
  const handleModifyModule = async (course) => {
    setSelectedModule(course);
    setNewModule(course.name);
    setLevel(course.level);
    setSpecialization(course.specialization);
    setShowCreateUser(true);

  };











  
  return (
    <>
<div class="card-body">
        <h3 className={` fw-normal text-dark`}> {nameT}</h3>
      </div>
      <Hr />
      <button
        type="button"
        className={`btn btn-outline-dark dropdown-toggle mt-4 mb-4`}
        onClick={handleToggleCreateUser}
      >
        {showCreateUser ? 'close Form' : 'Create Module'}
      </button>
      {showCreateUser && (
        <div>
          <div className="container">
            <h1 className={`mt-4 mb-4 display-3 fw-normal text-dark text-center`}>Create Module</h1>
            <br />
            <form className="position-relative" onSubmit={handleAddModule}>
              <div className="mb-3">
                <label htmlFor="name" className={`form-label text-dark`}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ color: 'black' }}
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="specialization" className={`form-label text-dark `}>Specialization:</label>
                <select class="form-control" onChange={(e) => setSpecialization(e.target.value)}>
                  <option value="select">select specializatione</option>
                  {Array.isArray(specializatione) &&
                    specializatione.map((specializatione) => (
                      <option key={specializatione.id} value={specializatione.name}>
                        {specializatione.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
              <label htmlFor="specialization" className={`form-label text-dark `}>level:</label>

              <select class="form-control" onChange={(e) =>  setLevel(e.target.value)}>
                <option value="">select levele</option>
                {Array.isArray(levele) &&
                  levele.map((levele) => (
                    <option key={levele.id} value={levele.name}>
                      {levele.name}
                    </option>
                  ))}
              </select>
              </div>
             
              <br />
              <button type="submit" className={`btn btn-outline-dark btn-lg`}>
                {selectedModule ? 'Modify Module' : 'Add Module'}
              </button>
            </form>
          </div>
        </div>
      )}
      <br />
      <br />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          style={{ color: 'black' }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className={`table-responsive table-light`} style={{ borderRadius: '20px' }}>
        <table className={`table table-borderless table-striped table-light`}>
          <thead className={isLightMode ? 'bg-light' : 'bg-dark'}>
            <tr>
              <th>Name of Module:</th>
              <th>Level:</th>
              <th>Specialization:</th>
              <th> </th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course._id}>
                <td>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className='text-dark m-4'>{course.name}</h3>
                  </div>
                </td>
                <td>{course.level}</td>
                <td>{course.specialization}</td>
                <td></td>
                <td>
                  <div>
                    <button
                      type="button"
                      className={`btn btn-outline-dark btn-sm m-2 `}
                      onClick={() => handleDeleteModule(course._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-dark btn-sm m-2 `}
                      onClick={() => { handleModifyModule(course) }}
                    >
                      Modify
                    </button>
                    <Link to={`/createModules/Chapter/${course._id}/${course.name}`} style={{ textDecoration: "none" }}>
                      <button type="button" className={`btn btn-outline-dark btn-sm m-2`}>
                        Chapters
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container"></div>
    </>
  );
}

export default CreateModules2;
