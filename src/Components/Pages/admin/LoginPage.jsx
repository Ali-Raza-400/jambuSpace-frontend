import { Input } from 'antd'
import React from 'react'
import { FaKey } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import CustomButton from '../../Common/Button/CustomButton'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const localStorageAdminAuth = localStorage.getItem("adminAuth")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    // Check Validation
    const emptyFields = Object.keys(formData).filter((key)=> !formData[key]);
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    if (!anyInvalidField) {
      axios
        .post(`${ADMIN_API_URL}/login`, formData)
        .then((res) => {
          if(res.status === 200){
            localStorage.setItem("adminAuth", res.data);
            navigate(`/admin/dashboard`);
          }else{
            toast.error('Login Failed')
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Login Failed')
        });
    }
  };

  return (
    <Container
    fluid
    className="form-card d-flex align-items-center justify-content-center my-5"
  >
    <Container className=" border rounded pb-5 loginCard">
      <Row className="justify-content-center text-center pb-5">
        <Col className="px-5">
          <div className="form-header py-2 my-3 mt-4">
            <h4>Admin Panel Login</h4>
          </div>

          <div className="px-4 form-wrapper">
            <Input
              className="color-grey py-2"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              prefix={<IoMdMail className="me-3 " />}
            />

            <Input
              type="password"
              className="color-grey py-2 mt-3"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              prefix={<FaKey className="me-3 " />}
            />

            <CustomButton
              classes="mt-4"
              values="Login"
              type="primary"
              block
              onClick={handleSubmit}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </Container>
  )
}