import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import CustomButton from "../../Common/Button/CustomButton";
import CustomNavbar from "../../Common/CustomNavbar/Index";
import CustomFooter from "../../Shared/Footer/CustomFooter";
import jobsImage from "../../assets/jobs.jpg";
import { API_URL } from "../../utils/contants";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("authUser"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    dueDate: new Date(),
    image: null,
  });

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // Check Validation
    const emptyFields = Object.keys(formData).filter(key => !formData[key]);
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    if (!anyInvalidField) {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("budget", formData.budget);
      payload.append("dueDate", formData.dueDate);
      payload.append("customerID", user._id);
      payload.append("image", formData.image);

      axios
        .post(API_URL + "jobs", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(res => {
          toast.success(res.data.message);
          navigate('/')
          setFormData({
            title: "",
            description: "",
            budget: "",
            dueDate: new Date(),
            image: null,
          });
        })
        .catch(() => toast.error("File too large. Must be less than 200 KB"));
    }
  };

  return (
    <>
      <CustomNavbar />

      <Container fluid className="container-2 mb-5">
        <Container className="section-2">
          <Row className="align-items-center justify-content-end">
            <Col xs={12} md={6} className="d-flex align-items-center">
              <img className="jobs-image" src={jobsImage} alt="Jobs" />
            </Col>
            <Col xs={12} md={6} className="p-3">
              <div className="form-header w-100 border-bottom">
                <h4 className="mb-3">Post a Job</h4>
                <h6>Job Details</h6>
              </div>

              <div className="mt-3">
                <div className="input-wrapper my-4">
                  <span className="input-label">Job Title</span>
                  <input
                    placeholder="Your job title here"
                    value={formData.title}
                    className="form-control"
                    onChange={handleChange}
                    name="title"
                    type="text"
                  />
                </div>

                <div className="input-wrapper my-4">
                  <span className="input-label">Job Description</span>
                  <textarea
                    placeholder="Describe your job"
                    className="form-control"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>

                <div className="input-wrapper my-4 d-flex justify-content-between">
                  <div>
                    <span className="input-label">Budget</span>
                    <input
                      placeholder="Budget"
                      value={formData.budget}
                      className="form-control"
                      onChange={handleChange}
                      name="budget"
                      type="number"
                    />
                  </div>
                  <div>
                    <span className="input-label">Due Date</span>
                    <input
                      value={formData.dueDate}
                      className="form-control"
                      onChange={handleChange}
                      name="dueDate"
                      type="date"
                    />
                  </div>
                </div>

                <div className="input-wrapper my-4 d-flex justify-content-between">
                  <Upload
                    name="image"
                    maxCount={1}
                    onChange={selected => {
                      setFormData(prevState => ({
                        ...prevState,
                        image: selected.file,
                      }));
                    }}
                    beforeUpload={() => false}
                    listType="picture"
                    accept="image/png, image/jpeg"
                  >
                    <Button icon={<AiOutlineUpload className="me-2" />}>
                      Click to upload job image
                    </Button>
                  </Upload>
                </div>

                <div className="form-cont-bottom">
                  <CustomButton
                    values="Post Job"
                    type="primary"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <CustomFooter />
    </>
  );
};

export default PostJob;
