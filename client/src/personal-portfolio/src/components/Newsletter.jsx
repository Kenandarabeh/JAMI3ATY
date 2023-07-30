import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (status === 'success') clearFields();
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email
      })
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <h3> Narrated Abu Hurairah:
            that the Messenger of Allah (ﷺ) said: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him."
            <br />
            <br />
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Muslim]</h3>


        </Row>
      </div>
    </Col>
  )
}
export default Newsletter
