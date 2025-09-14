import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/common/Layout';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/auth/Login';

// Patient Pages
import PatientDashboard from '@/pages/patient/PatientDashboard';
import BookConsultation from '@/pages/patient/BookConsultation';

// Doctor Pages
import DoctorDashboard from '@/pages/doctor/DoctorDashboard';

// Pharmacy Pages
import PharmacyDashboard from '@/pages/pharmacy/PharmacyDashboard';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRouter: React.FC = () => {
  const { currentRole } = useAuth();

  return (
    
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<Login role={currentRole || 'patient'} />} />
        <Route path="/login/patient" element={<Login role="patient" />} />
        <Route path="/login/doctor" element={<Login role="doctor" />} />
        <Route path="/login/pharmacy" element={<Login role="pharmacy" />} />
        <Route path="/login/admin" element={<Login role="admin" />} />

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/book"
          element={
            <ProtectedRoute>
              <BookConsultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/records"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Health Records</h2>
                <p>View your medical history and reports here</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/symptoms"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Symptom Checker</h2>
                <p>AI-powered symptom assessment coming soon</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
                <p>Manage your profile information</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Patient List</h2>
                <p>View and manage your patients</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/consultations"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Consultations</h2>
                <p>Manage your consultation sessions</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescriptions"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>
                <p>View and manage prescriptions</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
                <p>Manage your profile and availability</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Pharmacy Routes */}
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute>
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy/stock"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
                <p>Manage medicine inventory and pricing</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy/orders"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Prescription Orders</h2>
                <p>Process and fulfill prescription orders</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacy/profile"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Pharmacy Profile</h2>
                <p>Manage pharmacy information and settings</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">User Management</h2>
                <p>Manage patients, doctors, and pharmacy accounts</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Appointment Management</h2>
                <p>Monitor and manage all appointments</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
                <p>Detailed reports and insights</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">System Settings</h2>
                <p>Configure system parameters and preferences</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
         <Router> {/* 👈 wrap here */}
            <Layout>
              <AppRouter />
              <Toaster 
                position="top-right" 
                richColors 
                closeButton 
                duration={4000}
              />
            </Layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;