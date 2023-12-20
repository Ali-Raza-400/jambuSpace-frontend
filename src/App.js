import React from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./Components/Common/PrivateRoute";
import LoginPage from "./Components/User/Login/Login";
import SignUpPage from "./Components/User/Signup/Signup";
import HomePage from "./Components/Pages/Homepage";
import Chat from "./Components/Pages/Chat";
import AccountProfile from "./Components/Pages/AccountProfile";
import PostJob from "./Components/Pages/PostJob";
import DashboardPage from "./Components/Pages/Dashboard";
import JobsPage from "./Components/Pages/Jobs";
import Gigs from "./Components/Pages/Gig/Gigs";
import CreateGigs from "./Components/Pages/Gig/CreateGigs";
import ViewGig from "./Components/Pages/Gig/ViewGig";
import ViewGigs from "./Components/Pages/Gig/ViewGigs";
import UserDetailPage from "./Components/Pages/UserDetails";
import Orders from "./Components/Pages/Orders/Orders";
import PlaceOrder from "./Components/Pages/Orders/PlaceOrder";
import Success from "./Components/Pages/PaymentStatus/Success";
import Cancel from "./Components/Pages/PaymentStatus/Cancel";
import "./App.scss";
import axios from 'axios'
import AdminDashboard from "./Components/Pages/admin/adminDashboard";
import JobsListing from "./Components/Pages/jobsListing/JobsListing";
import AdminLoginPage from "./Components/Pages/admin/LoginPage";
function App() {
  // axios.defaults.withCredentials = true;
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/gigs" element={<ViewGigs />} />
          <Route path="/gigs/:id" element={<ViewGig />} />
          <Route path="/user-detail/:userID" element={<UserDetailPage />} />
          <Route path="/pages" element={<PrivateRoute />} />
          <Route path="/pages/chat" element={<Chat />} />
          <Route path="/pages/gigs" element={<Gigs />} />
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/cancel" element={<Cancel />} />
          <Route path="/pages/creategigs" element={<CreateGigs />} />
          <Route path="/pages/profile" element={<AccountProfile />} />
          <Route path="/pages/post-job" element={<PostJob />} />
          <Route path="/pages/orders" element={<Orders />} />
          <Route path="/pages/place-order" element={<PlaceOrder />} />
          <Route path="/pages/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/jobs/listing/:id" element={<JobsListing />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
