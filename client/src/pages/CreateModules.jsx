import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CreateModules({ isLightMode }) {

  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState('');
  const [level, setLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const { currentUser } = useSelector(state => state.user);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [user, setUser] = useState('');
  const [departementname, getdepartementname] = useState([])
  const [specializatione, setSpecializatione] = useState([]);
  const [specializationename, setSpecializationename] = useState([]);
  const [levele, setlevele] = useState([]);

// for the page the teacher


  // to get the user information 
  useEffect(() => {
    const fetchinstitute = async () => {
      if (currentUser) {
        try {
          const res = await axios.get(`http://localhost:8800/api/users/find/${currentUser}`);
          console.log(res)
          setUser(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchinstitute();
  }, [currentUser]);












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














  // to get all specializaiton in departement 
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

















  // to get the information specializaiton selected (ID_specialization )
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





















  // to get the all level in specializaiotn selected
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
















// find the courses to affiche
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/course/find/${currentUser}`);
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [currentUser, modules]);








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
          alert('update module successfully');

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
          const res = await axios.post(`http://localhost:8800/api/course/add/${currentUser}`, {
            name: newModule,
            level: level,
            specialization: specialization
          });
          setModules([...modules, res.data]);
        }
        alert('create module successfully');
        setNewModule('');
        setLevel('');
        setSpecialization('');
      } catch (error) {
        console.error(error);
      }
    }
  };









  const handleDeleteModule = async (moduleId) => {
    try {
      await axios.delete(`http://localhost:8800/api/course/delete/${moduleId}`);
      setModules(modules.filter(module => module._id !== moduleId));
    } catch (error) {
      console.error(error);
    }
  };











  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };







  const handleToggleCreateUser = () => {
    setShowCreateUser(!showCreateUser);
    if(!showCreateUser){
    setSelectedModule('');
    setNewModule('');
    setLevel('');
    setSpecialization('');}
  };






  const filteredCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(searchTerm.toLowerCase());
  });









  const handleModifyModule = async (course) => {
    setSelectedModule(course);
    setNewModule(course.name);
    setLevel(course.level);
    setSpecialization(course.specialization);
    setShowCreateUser(true);

  };

















  return (
    <>
      <button
        type="button"
        className={`btn ${isLightMode ? 'btn-dark' : 'btn-light'} dropdown-toggle mt-4 mb-4`}
        onClick={handleToggleCreateUser}
      >
        {showCreateUser ? 'close Form' : 'Create Module'}
      </button>
      {showCreateUser && (
        <div>
          <div className="container">
            <h1 className={`mt-4 mb-4 display-3 fw-normal ${isLightMode ? 'text-dark' : 'text-light'} text-center`}>Create Module</h1>
            <br />
            <form className="position-relative" onSubmit={handleAddModule}>
              <div className="mb-3">
                <label htmlFor="name" className={`form-label ${isLightMode ? 'text-dark' : 'text-light'} `}>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ color: 'black' }}
                  value={newModule}
                  onChange={(e) => setNewModule(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="specialization" className={`form-label ${isLightMode ? 'text-dark' : 'text-light'} `}>Specialization:</label>
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
              <label htmlFor="specialization" className={`form-label ${isLightMode ? 'text-dark' : 'text-light'} `}>level:</label>

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
              <button type="submit" className={`btn ${isLightMode ? 'btn-outline-dark' : 'btn-outline-light'} btn-lg`}>
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
      <div className={`table-responsive ${isLightMode ? null : 'bg-dark'} ${isLightMode ? 'table-light' : 'table-dark'}`} style={{ borderRadius: '20px' }}>
        <table className={`table table-borderless table-striped ${isLightMode ? 'table-light' : 'table-dark'}`}>
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
                    <h3 className={isLightMode ? 'text-dark m-4' : 'text-light m-4'}>{course.name}</h3>
                  </div>
                </td>
                <td>{course.level}</td>
                <td>{course.specialization}</td>
                <td></td>
                <td>
                  <div>
                    <button
                      type="button"
                      className={`btn ${isLightMode ? 'btn-dark' : 'btn-light'} btn-sm m-2 `}
                      onClick={() => handleDeleteModule(course._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className={`btn ${isLightMode ? 'btn-dark' : 'btn-light'} btn-sm m-2 `}
                      onClick={() =>{ handleModifyModule(course) }}
                    >
                      Modify
                    </button>

                    <Link to={`/createModules/Chapter/${course._id}/${course.name}`} style={{ textDecoration: "none" }}>
                      <button type="button" className={`btn ${isLightMode ? 'btn-dark' : 'btn-light'} btn-sm m-2`}>
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

export default CreateModules;
