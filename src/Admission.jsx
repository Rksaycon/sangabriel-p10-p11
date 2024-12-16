import React from "react";
import { useNavigate } from "react-router-dom";
import "./Admission.css";

function Admission() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", display: "flex", flexDirection: "column" }}
    >
      {/* Hero Section */}
      <div
        className="row justify-content-center align-items-center"
        style={{ flex: 1, textAlign: "center", padding: "20px 0" }}
      >
        <div className="col-md-8 col-12">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">Welcome to Your Personal Dashboard</h3>
            <p>
              Welcome to your personalized dashboard! Here you can manage your account, track your progress, and access all the resources you need.
            </p>
            <p>
              Ready to take the next step? You can start your application process by clicking below and following the easy steps to apply.
            </p>
            <div className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/create-account')}
              >
                Start Your Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admission Process Steps */}
      <section className="container py-5" style={{ maxWidth: "100vw" }}>
        <h4 className="text-center mb-4">How to Apply</h4>
        <div className="row">
          <div className="col-md-4 col-12 text-center">
            <h5>Step 1: Create an Account</h5>
            <p>Sign up to access your personalized application portal and start your application.</p>
          </div>
          <div className="col-md-4 col-12 text-center">
            <h5>Step 2: Submit Your Application</h5>
            <p>Fill in the required information and upload necessary documents like transcripts and ID proof.</p>
          </div>
          <div className="col-md-4 col-12 text-center">
            <h5>Step 3: Review & Submit</h5>
            <p>Once your application is complete, review it and submit. Our admissions team will be in touch soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admission;
