import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Teachers from './Teachers';

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

const Recommendation = styled.div`
  flex: 2;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color:gray;
  margin-top: 13px;
`;

const Information = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
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
  border: 1px solid gray;
`;

const ProfileAdmin = ({ isLightMode }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [user, setUser] = useState({});
    const [teacher, setTeacher] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);

    const [role, setRole] = useState('student');
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [Branded, setBranded] = useState('');
    const [description, setDescription] = useState('');
    const [level, setlevel] = useState('');
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



// fro page admin



// get the information for the admin 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/users/find/${currentUser}`);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const fetchTeacher = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/teacher/getTeachers/${currentUser}`);
                setTeacher(res.data[0]);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchUser();
        fetchTeacher();
    }, [currentUser]);






// for update 
    const handleUpdate = async (e) => {
        e.preventDefault();



        try {
            if (!firstName || !lastName || !email || !password || !image ) {
                setErrorMessage('Please fill in all required fields.');
                return;
            } else {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);
            formData.append('role', user.role);
            formData.append('institute', user.institute);
            formData.append('Department', user.Department);
            formData.append('specialization', user.specialization);
            formData.append('description', description);

            // Send the update request
            await axios.put(`http://localhost:8800/api/users/update/${currentUser}`, formData);
            alert('User update successfully');
            // Refresh user data after update
            const res = await axios.get(`http://localhost:8800/api/users/find/${currentUser}`);
            setUser(res.data);
       } } catch (error) {
            console.error('Error updating user information:', error);
        }
    };








// to show form 
    const toggleForm = () => {
        setShowForm(!showForm);
        // Clear input fields when hiding the form
        if (!showForm) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setDepartment('');
            setSelectedUser(null); // Reset selected user
            // ... reset other form fields
        }
    };

    return (
        <Container>
            <Content>
                <Title>Profile Admin</Title>
                <Hr/>
                <Details>

                    <Information>Full Name:</Information>
                    {user.firstName} {user.lastName}

                </Details>

                <Details>
                    <Information>Email:</Information>
                    {user.email}
                </Details>
                <br />

               <Details>

               </Details>

                <Hr />
                <br />
                <div className="mb-3">

                    <button className={`btn   btn-outline-dark dropdown-toggle`} onClick={toggleForm}>
                        {showForm ? 'Close Form' : 'update information '}
                    </button>

                </div>
                {showForm ? (
                    <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <div>
                            <label style={{ color: `black ` }}  htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control m-2"

                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <br />
                            <label style={{ color: `black ` }} htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control m-2"

                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <br />

                        <div>
                            <label style={{ color: `black ` }}  htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control m-2"

                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <br />

                        <div>
                            <label style={{ color: `black ` }} htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control m-2"

                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br />

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label" style={{ color: `black ` }} >
                                Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="form-control m-2"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <br />

               
             

                        <br />

                        <button
                            type="submit"
                            className={`btn  btn-outline-dark `}
                        >
                            Update
                        </button>
                    </form>) : null}

            </Content>
            {user.image ? (
                <Recommendation>
                    <Img src={`http://localhost:8800/${user.image.replace(/^.*[\\/]/, '')}`} />
                </Recommendation>
            ) : null}
        </Container>
    );
};

export default ProfileAdmin;
