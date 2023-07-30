import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useNavigate } from 'react-router-dom';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../redux/userslice";
import axios from "axios";
import { useDispatch } from "react-redux";
export const Contact = () => {
  const [username, setUsername] = useState("");
  const [errorMessages, setErrorMessages] = useState({});


  const errors = {
    username: "Invalid username",
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
  };
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post(  "http://localhost:8800/api/auth/signin",
        { email, password }
      );
      const userId = res.data._id;
      dispatch(loginSuccess(res.data));
      dispatch(loginSuccess(userId));
      navigate("/", { replace: true }); // Replace the current route with the home route
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
    <section className="contact" id="login">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <Row>
                  <Col className="px-1">
                        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <br /> {/* Add line break here */}
                        <br /> {/* Add line break here */}

                        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Col>
                        
                        </Col>
                        <Col size={6} className="px-1">
                          <button type="submit"><span>{buttonText}</span></button>
                        </Col>

                    {
                      status.message &&
                      <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                      </Col>
                    }
                                          </Col>

                  </Row>
                </form>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Contact

// import { useState, useEffect } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import headerImg from "../assets/img/header-img.svg";
// import { ArrowRightCircle } from 'react-bootstrap-icons';
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';
//

// export const Banner = () => {
//   const [loopNum, setLoopNum] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [text, setText] = useState('');
//   const [delta, setDelta] = useState(300 - Math.random() * 100);
//   const [index, setIndex] = useState(1);
//   const toRotate =["learn"];
//   const period = 2000;

//   useEffect(() => {
//     let ticker = setInterval(() => {
//       tick();
//     }, delta);

//     return () => { clearInterval(ticker) };
//   }, [text])

//   const tick = () => {
//     let i = loopNum % toRotate.length;
//     let fullText = toRotate[i];
//     let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

//     setText(updatedText);

//     if (isDeleting) {
//       setDelta(prevDelta => prevDelta / 2);
//     }

//     if (!isDeleting && updatedText === fullText) {
//       setIsDeleting(true);
//       setIndex(prevIndex => prevIndex - 1);
//       setDelta(period);
//     } else if (isDeleting && updatedText === '') {
//       setIsDeleting(false);
//       setLoopNum(loopNum + 1);
//       setIndex(1);
//       setDelta(500);
//     } else {
//       setIndex(prevIndex => prevIndex + 1);
//     }
//   }

//   return (
//     <section className="banner" id="home">
//       <Container>
//         <Row className="aligh-items-center">
//           <Col xs={12} md={6} xl={7}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                   <span className="tagline">Welcome to Jami3aty</span>
//                   <h1>{`the best site of `} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "to learn" ]'><span className="wrap">{text}</span></span></h1>
//                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//                 </div>}
//             </TrackVisibility>
//           </Col>
//           <Col xs={12} md={6} xl={5}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
//                 </div>}
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   )
// }

