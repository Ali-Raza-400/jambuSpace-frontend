import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/contants';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Box, Grid, Typography, Button, Divider, Paper } from '@mui/material';
import Footer from '../../../Components/Shared/Footer/CustomFooter';
import Navbar from '../../Common/CustomNavbar/Index';

const JobsListing = () => {
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const getJobs = async () => {
        try {
            const apiUrl = `${BASE_URL}/api/jobs/applicants/detail/${id}`;
            const response = await axios.get(apiUrl);

            if (response.data.success) {
                setApplicants(response.data.applicants);
            } else {
                console.error('Failed to fetch applicants');
            }
        } catch (error) {
            console.error('Error fetching applicants:', error.message);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    const handleViewCv = (cvData) => {
        try {
            if (!cvData || !cvData.type === 'Buffer' || !cvData.data) {
                console.error('Invalid CV data format:', cvData);
                return;
            }

            // Convert Buffer to Uint8Array
            const uint8Array = new Uint8Array(cvData.data);

            // Create a Blob from Uint8Array
            const blob = new Blob([uint8Array], { type: 'application/pdf' });

            const url = URL.createObjectURL(blob);

            // Open the PDF in a new tab
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error decoding or loading PDF:', error.message);
        }
    };

    return (
        <Box>
            <Navbar />
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Applicants
                </Typography>
                <Grid container spacing={3}>
                    {loading ? (
                        <CircularProgress />
                    ) : applicants.length === 0 ? (
                        <Typography sx={{m:5}} variant="h5">No applicant found for this job.</Typography>
                    ) : (
                        applicants.map((applicant) => (
                            <Grid item key={applicant._id} xs={12} sm={6} md={4}>
                                <Paper elevation={3} style={{ padding: '16px', height: '100%' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {applicant.name}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        Email: {applicant.email}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        CV Filename: {applicant.cv.filename}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        Phone Number: {applicant.phoneNumber}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        Experience: {applicant.experience}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        Education: {applicant.education}
                                    </Typography>
                                    <Button onClick={() => handleViewCv(applicant.cv.data)} variant="contained">
                                        View CV
                                    </Button>
                                    <Divider style={{ margin: '16px 0' }} />
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
            <Box sx={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <Footer />
            </Box>
        </Box>
    );
};

export default JobsListing;
