import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateStudent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [Branded, setBranded] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRotated, setIsRotated] = useState(false);
  const [institute, setInstitute] = useState('');
  const [Department, setDepartment] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [searchQueryins, setSearchQueryIns] = useState('');
  const [searchQueryD, setSearchQueryD] = useState('');
  const [searchQueryS, setSearchQueryS] = useState('');
  const [searchQueryLev, setSearchQueryLev] = useState('');
  const [Institutes, getInstitutes] = useState([])
  const [departement, getdepartement] = useState([])
  const [Institutesname, getInstitutesname] = useState([])
  const [Institutesname2, getInstitutesname2] = useState([])
  const [departement2, getdepartement2] = useState([])
  const [specializatione, setSpecializatione] = useState([]);
  const [specializatione2, setSpecializatione2] = useState([]);
  const [departementname, getdepartementname] = useState([])
  const [departementname2, getdepartementname2] = useState([])
  const [level, setlevel] = useState([]);
  const [levele, setlevele] = useState([]);
  const [levele2, setlevele2] = useState([]);
  const [specializationename, setSpecializationename] = useState([]);
  const [specializationename2, setSpecializationename2] = useState([]);





  // get all institute 
  useEffect(() => {
    const fetchinstitute = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/institute/allI`);
        console.log(res.data)
        getInstitutes(res.data);
      } catch (error) {
        console.error(error);
      }
    };




    fetchinstitute();
  }, []);














// get the information of the institute selected(id institute)
  useEffect(() => {
    const fetchInstitute = async () => {
      if (institute) {
        try {
          const res = await axios.get(`http://localhost:8800/api/institute/aI/${institute}`);
          console.log(res.data[0])
          getInstitutesname(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchInstitute();
  }, [institute]);












// get the information of the institute selected(id institute) --- of the liste 
useEffect(() => {
    const fetchInstitute = async () => {
      if (searchQueryins) {
        try {
          const res = await axios.get(`http://localhost:8800/api/institute/aI/${searchQueryins}`);
          console.log(res.data[0])
          getInstitutesname2(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchInstitute();
  }, [searchQueryins]);




// get the departement fo the institute selected  ---of the liste 
  useEffect(() => {
    const fetchinstitute = async () => {
      if (Institutesname2) {
        try {
          const res = await axios.get(`http://localhost:8800/api/department/allD/${Institutesname2._id}`);
          console.log(res)
          getdepartement2(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };





    fetchinstitute();
  }, [Institutesname2._id]);






// get all the departement of institute selected
  useEffect(() => {
    const fetchinstitute = async () => {
      if (Institutesname) {
        try {
          const res = await axios.get(`http://localhost:8800/api/department/allD/${Institutesname._id}`);
          console.log(res)
          getdepartement(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchinstitute();
  }, [Institutesname._id]);


















  //  get the infomatnion of te departement selected
  useEffect(() => {
    const fetchInstitute = async () => {
      if (Department || Department !== 'select') {
        try {
          const res = await axios.get(`http://localhost:8800/api/department/aD/${Department}`);
          console.log(res.data[0])
          getdepartementname(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchInstitute();
  }, [Department]);







// get the information of the departement selected ---of list
  useEffect(() => {
    const fetchInstitute = async () => {
      if (searchQueryD) {
        try {
          const res = await axios.get(`http://localhost:8800/api/department/aD/${searchQueryD}`);
          console.log(res.data[0])
          getdepartementname2(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchInstitute();
  }, [searchQueryD]);










// get all spcializaiton of the departement selected ---of list
  useEffect(() => {
    const fetchinstitute = async () => {
      if (departementname2) {
        try {
          const res = await axios.get(`http://localhost:8800/api/specialization/allS/${departementname2._id}`);
          console.log(res)
          setSpecializatione2(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };





    fetchinstitute();
  }, [departementname2._id]);










// get all spcializaiton of the departement selected 
  useEffect(() => {
    const fetchinstitute = async () => {
      if (departementname) {
        try {
          const res = await axios.get(`http://localhost:8800/api/specialization/allS/${departementname._id}`);
          console.log(res)
          setSpecializatione(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchinstitute();
  }, [departementname._id]);












//get the informamtion of the specialization selec
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








//  get all the level in spicialiaiont selected 
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











//get the informamtion of the specialization selec ---lf liste

  useEffect(() => {
    const fetchInstitute = async () => {
      if (searchQueryS) {
        try {
          const res = await axios.get(`http://localhost:8800/api/specialization/aS/${searchQueryS}`);
          console.log(res.data[0])
          setSpecializationename2(res.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
    };




    fetchInstitute();
  }, [searchQueryS]);



//  get all the level in spicialiaiont selected ---of liste

  useEffect(() => {
    const fetchinstitute = async () => {
      if (specializationename2._id) {
        try {
          const res = await axios.get(`http://localhost:8800/api/level/alllev/${specializationename2._id}`);
          console.log(res.data)
          setlevele2(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };



    fetchinstitute();
  }, [specializationename2._id]);









//get the studentes with livels
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/users/getUsersWithLevels');
      setUsers(response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while retrieving users.');
      }
    }
  };


// to work the get the studentes with livel
  useEffect(() => {
    getUsers();
  }, []);



// to create student
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!firstName) {
      setErrorMessage('Please fill in firstName required fields.');
      return;
    } if (!lastName) {
      setErrorMessage('Please fill in lastName required fields.');
      return;
    } if (!email) {
      setErrorMessage('Please fill in email required fields.');
      return;
    } if (!password) {
      setErrorMessage('Please fill in password required fields.');
      return;
    } if (!institute) {
      setErrorMessage('Please fill in institute required fields.');
      return;
    } if (!Department) {
      setErrorMessage('Please fill in Department required fields.');
      return;
    } if (!specialization) {
      setErrorMessage('Please fill in specialization required fields.');
      return;
    } if (!level) {
      setErrorMessage('Please fill in level required fields.');
      return;
    } if (!image) {
      setErrorMessage('Please fill in image required fields.');
      return;
    }
    if (role === 'none') {
      setErrorMessage('Please select a valid role.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('image', image);
      formData.append('institute', institute);
      formData.append('Department', Department);
      formData.append('specialization', specialization);
      formData.append('level', level);

      // Check if there is a selected user (for updating) or create a new user
      if (selectedUser) {
        await handleUpdateUser(selectedUser._id, formData);
      } else {
        await axios.post('http://localhost:8800/api/auth/signup', formData);
        alert('User created successfully');
      }

      // Refresh the user list
      getUsers();

      // Clear input fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRole('student');
      setImage(null);
      setErrorMessage('');
      setSelectedUser(null); // Reset selected user after creating/updating
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while creating/updating the user.');
      }
    }
  };





  // to update student 
  const handleUpdateUser = async (userId, updatedData) => {
    try {
      await axios.put(`http://localhost:8800/api/users/update/${userId}`, updatedData);
      alert('User updated successfully');
      getUsers(); // Refresh the user list
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while updating the user.');
      }
    }
  };




// to delete student 
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/delete/${userId}`);
      alert('User deleted successfully');
      getUsers(); // Refresh the user list
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while deleting the user.');
      }
    }
  };






  // to filterdUsers from the users ---of list
  const filteredUsers = users.filter((user) => {
    const userInstitution = user.institute.toLowerCase();
    const userD = user.Department.toLowerCase();
    const userS = user.specialization.toLowerCase();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
     const userlevel=`${user.level}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) && userInstitution.includes(searchQueryins.toLowerCase()) && userD.includes(searchQueryD.toLowerCase()) && userS.includes(searchQueryS.toLowerCase())&&userD.includes(searchQueryD.toLowerCase()) && userlevel.includes(searchQueryLev.toLowerCase())
  });







  // to show the form 
  const toggleForm = () => {
    setShowForm(!showForm);
    // Clear input fields when hiding the form
    if (!showForm) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setSelectedUser(null); // Reset selected user
      // ... reset other form fields
    }
  };







  // when i click in edit the information where going 
  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(''); // Clear password field for updates
    setRole(user.role);
    setInstitute(user.institute);
    setDepartment(user.Department);
    setSpecialization(user.specialization);
    // Set other fields based on user role
    setlevel(user.level);

    // Clear the image field
    setImage(null);
    setShowForm(true);
  };








  return (
    <>
      <div className="container">
        <div className="mb-3">

          <button className="btn btn-outline-dark dropdown-toggle" onClick={toggleForm}>
            {showForm ? 'Close Form' : 'Create Student'}
          </button>

        </div>
        {showForm ? (
          <>
            <h1 className="mt-4 mb-4 display-3 text-center" style={{ color: 'black' }}>
              {selectedUser ? 'Edit Student' : 'Create Student'}
            </h1>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleCreateUser} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label" style={{ color: 'black' }}>
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label" style={{ color: 'black' }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: 'black' }}>
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: 'black' }}>
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label" style={{ color: 'black' }}>
                  Role:
                </label>
                <select
                  id="role"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="teacher">student</option>
                </select>
                <div className="mb-3">
                  <label htmlFor="institute" className="form-label" style={{ color: 'black' }}>
                    Institute:
                  </label>

                  <select class="form-control" onChange={(e) => setInstitute(e.target.value)}>
                  <option value="">Select an option</option>

                    {Array.isArray(Institutes) &&
                      Institutes.map((institute) => (
                        <option key={institute.id} value={institute.name}>
                          {institute.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* ------------------------------------------------------------------- */}
                <div className="mb-3">
                  <label htmlFor="department" className="form-label" style={{ color: 'black' }}>
                    Department:
                  </label>

                </div>
                <select class="form-control" onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Select an option</option>

                  {Array.isArray(departement) &&
                    departement.map((department) => (
                      <option key={department.id} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                </select>
                <br />
                {/* ------------------------------------------------------------------ */}
                <div className="mb-3">
                  <label htmlFor="specialization" className="form-label" style={{ color: 'black' }}>
                    Specialization:
                  </label>

                </div>
                <select class="form-control" onChange={(e) => setSpecialization(e.target.value)}>
                <option value="">Select an option</option>
                  {Array.isArray(specializatione) &&
                    specializatione.map((specializatione) => (
                      <option key={specializatione.id} value={specializatione.name}>
                        {specializatione.name}
                      </option>
                    ))}
                </select>
              </div>
              {/* ------------------------------------------------------------------------------- */}
              <br />
              <div className="mb-3">
                <label htmlFor="degree_specialty" className="form-label" style={{ color: 'black' }}>
                  level
                </label>

              </div>
              <select class="form-control" onChange={(e) => setlevel(e.target.value)}>
              <option value="">Select an option</option>

                {Array.isArray(levele) &&
                  levele.map((levele) => (
                    <option key={levele.id} value={levele.name}>
                      {levele.name}
                    </option>
                  ))}
              </select>
              <br />
              {/* ----------------------------------------------- */}






              <div className="mb-3">
                <label htmlFor="image" className="form-label" style={{ color: 'black' }}>
                  Image:
                </label>
              
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>


              <div className="mb-3">
                <button type="submit" className="btn btn-light " style={{ backgroundColor: '#ff581a', color: 'white' }}>
                  {selectedUser ? 'Update Student' : 'Create Student'}
                </button>
              </div>
            </form>
          </>
        ) : null}


        <h2 className="mt-4 mb-4 display-4 text-center" style={{ color: 'black' }}>Student List</h2>


        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">

                  <select class="form-control" onChange={(e) => setSearchQueryIns(e.target.value)}>
                    <option value="">institute</option>
                    {Array.isArray(Institutes) &&
                      Institutes.map((institute) => (
                        <option key={institute.id} value={institute.name}>
                          {institute.name}
                        </option>
                      ))}
                  </select>

                </th>
                <th scope="col">

                  <select class="form-control" onChange={(e) => setSearchQueryD(e.target.value)}>
                    <option value="">Departement</option>
                    {Array.isArray(departement2) &&
                      departement2.map((department2) => (
                        <option key={department2.id} value={department2.name}>
                          {department2.name}
                        </option>
                      ))}
                  </select>

                </th>

                <th scope="col">

                  <select class="form-control" onChange={(e) => setSearchQueryS(e.target.value)}>
                    <option value="">specializatione</option>
                    {Array.isArray(specializatione2) &&
                      specializatione2.map((specializatione2) => (
                        <option key={specializatione2.id} value={specializatione2.name}>
                          {specializatione2.name}
                        </option>
                      ))}
                  </select>


                </th>
                <th scope="col">

                  <select class="form-control" onChange={(e) => setSearchQueryLev(e.target.value)}>
                    <option value="">select level</option>
                    {Array.isArray(levele2) &&
                      levele2.map((levele2) => (
                        <option key={levele2.id} value={levele2.name}>
                          {levele2.name}
                        </option>
                      ))}
                  </select>

                </th>
              </tr>
            </thead>
          </table>        </div>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              if (user.role === 'student') {
                return (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <img
                        src={`http://localhost:8800/${user.image.replace(
                          /^.*[\\/]/,
                          ''
                        )}`}
                        alt={user.firstName}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' ,borderRadius:'50%'}}
                      />

                    </td>
                    <td>
                      <button
                        className="btn btn-outline-dark me-2"
                        onClick={() => handleUserSelection(user)}
                      >

                        Edit
                      </button>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                      
                      {user.role === 'teacher' ?
                        <Link to={`/createModules/${user._id}/${user.firstName + " " + user.lastName}`} style={{ textDecoration: "none" }}>
                          <button type="button" className="btn btn-light" style={{ backgroundColor: '#ff581a', color: 'white' }}>
                            Modules
                          </button>
                        </Link>
                        : null}
                    </td>
                  </tr>
                );
              } else {
                return null; // Skip users with roles other than "student"
              }
            })}

          </tbody>
        </table>
      </div>
    </>
  );
}

export default CreateStudent;

