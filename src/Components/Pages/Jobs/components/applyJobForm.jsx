import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  Typography,
  Stack,
  Link,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../../utils/contants";
import { toast } from "react-toastify";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  name: Yup.string().required("Name is required"),
  cvFile: Yup.mixed()
    .required("CV file is required")
    .test("fileType", "Only PDF files are allowed", (value) =>
      value && value[0] && value[0].type === "application/pdf"
    ),
  phoneNumber: Yup.string().required("Phone number is required"),
  experience: Yup.string().required("Experience is required"),
  education: Yup.string().required("Education is required"),
});

const ApplyJobForm = ({ setOpen, open, job ,handleClose}) => {
  const [refresh, setRefresh] = useState(0)
  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched",
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      cvFile: null,
      phoneNumber: "",
      experience: "",
      education: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const apiUrl = `${BASE_URL}/api/jobs/applicants`;
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("cvFile", values.cvFile[0]);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("experience", values.experience);
      formData.append("education", values.education);
      formData.append("jobId", job);
      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Application Submitted Successfully!");
      reset()
      handleClose()
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",
            },
          },
          padding: 3,
        }}
      >
        <DialogContent>
          <Typography variant='h4' my={2} textAlign={'center'}>Job Application Form</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5} alignItems="flex-end">
              <>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email address"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Applicant Name"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone Number"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="experience"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Experience"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="education"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Education"
                      error={Boolean(error)}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name="cvFile"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <React.Fragment>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                      {field.value && field.value[0] && (
                        <Typography variant="body2">
                          Selected File: {field.value[0].name}
                        </Typography>
                      )}
                    </React.Fragment>
                  )}
                />

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </>
              <Typography
                variant="caption"
                align="center"
                sx={{ color: "text.secondary", mt: 3 }}
              >
                I agree to Terms of Service and Privacy Policy.
              </Typography>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ApplyJobForm;
