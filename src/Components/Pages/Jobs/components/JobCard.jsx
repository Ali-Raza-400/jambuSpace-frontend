import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { AiFillStar, AiOutlineClockCircle } from "react-icons/ai";
import { BASE_URL } from "../../../utils/contants";
import { Box } from "@mui/material";
import ApplyJobForm from "./applyJobForm";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const addedDaysBefore =
    Math.abs(new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24);
  const label =
    addedDaysBefore < 5 ? "New" : job.customer.rating === 5 ? "Popular" : "";
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Col style={{cursor:'pointer'}}  key={job._id} xs={6} sm={6} md={4} lg={3} className="my-2" onClick={handleClickOpen}>
      <div className="job-card mx-2 border overflow-hidden">
        <div className="card-header-top position-relative">
          <img className="job-image" src={BASE_URL + job?.image?.url} alt="" />

          {label && (
            <div className="top-tag position-absolute bg-white rounded-pill px-2">
              <p className="mb-0">{label}</p>
            </div>
          )}
        </div>

        <div className="card-body-content border-bottom py-2 px-3 d-flex flex-column justify-content-between">
          <h6 className="fw-bold mb-2">{job.title}</h6>

          <Row className="justify-content-between align-items-center">
            <Col xs={12} sm={12} md={12} lg={12}>
              <p className="mb-0">
                From
                <span className="fw-bold mx-1 text-success">${job.budget}</span>
              </p>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="d-flex align-items-center">
                <AiOutlineClockCircle size={16} className="text-muted me-1" />
                <p className="mb-0 text-muted">
                  {`Due ${moment(job.dueDate).fromNow()}`}
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <Row className="card-footer-content justify-content-between align-items-center py-2 px-3">
          <Col sm={9} className="footer-left d-flex align-items-center">
            <div className="footer-img-wrapper me-2">
              <img
                className="job-client-image"
                src={BASE_URL + job?.customer?.image?.url}
                onClick={() =>
                  navigate(`/pages/user-detail/${job.customer._id}`)
                }
                alt=""
              />
            </div>

            <p className="mb-0 job-card-customer-name">
              {job?.customer?.fullName}
            </p>
          </Col>

          <Col
            sm={3}
            className="footer-right d-flex align-items-center justify-content-end"
          >
            <AiFillStar className="color-primary" />
            <p className="mb-0 mx-1">{job?.customer?.rating || 5}</p>
          </Col>
        </Row>
      </div>
    </Col>
      <ApplyJobForm job={job._id} setOpen={setOpen} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      </>
  );
};

export default JobCard;
