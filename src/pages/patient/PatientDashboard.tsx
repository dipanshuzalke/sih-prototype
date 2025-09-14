import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Pill, 
  AlertTriangle,
  Heart,
  Clock,
  MapPin
} from 'lucide-react';
import appointmentsData from '@/data/appointments.json';
import prescriptionsData from '@/data/prescriptions.json';
import doctorsData from '@/data/doctors.json';

const PatientDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'failed'>('synced');

  // Mock data for patient dashboard
  const upcomingAppointments = appointmentsData.filter(apt => 
    apt.patientId === 'P001' && apt.status === 'scheduled'
  );

  const recentPrescriptions = prescriptionsData.filter(rx => 
    rx.patientId === 'P001'
  ).slice(0, 2);

  useEffect(() => {
    // Simulate sync status changes
    const statuses: ('synced' | 'pending' | 'failed')[] = ['synced', 'pending', 'failed'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setSyncStatus(randomStatus);
  }, []);

  const getDoctorName = (doctorId: string) => {
    const doctor = doctorsData.find(d => d.id === doctorId);
    return doctor?.name || 'Unknown Doctor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Sync Status Banner */}
      {syncStatus === 'pending' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-center"
        >
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
          <span className="text-amber-800 dark:text-amber-200">
            {t('common.syncPending')} - Some data may not be up to date
          </span>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('common.welcome')}, Rajesh!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's your health dashboard
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Khanna, Punjab</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: t('patient.bookConsultation'),
            description: 'Schedule with a doctor',
            icon: Calendar,
            color: 'bg-blue-500',
            path: '/patient/book'
          },
          {
            title: t('patient.healthRecords'),
            description: 'View medical history',
            icon: FileText,
            color: 'bg-green-500',
            path: '/patient/records'
          },
          {
            title: t('patient.symptomChecker'),
            description: 'Check your symptoms',
            icon: Heart,
            color: 'bg-red-500',
            path: '/patient/symptoms'
          },
          {
            title: 'Emergency',
            description: 'Call for help',
            icon: AlertTriangle,
            color: 'bg-orange-500',
            path: '/patient/emergency'
          }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {t('patient.upcomingAppointments')}
              </CardTitle>
              <CardDescription>
                Your scheduled consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{getDoctorName(appointment.doctorId)}</h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Type: {appointment.type === 'video' ? 'Video Consultation' : 'Phone Call'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No upcoming appointments</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/patient/book')}
                  >
                    Book Consultation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Prescriptions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                Recent Prescriptions
              </CardTitle>
              <CardDescription>
                Your latest medication prescriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          Prescription #{prescription.id}
                        </h4>
                        <Badge variant={prescription.status === 'dispensed' ? 'default' : 'secondary'}>
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Date: {prescription.date}
                      </p>
                      <div className="space-y-1">
                        {prescription.medicines.slice(0, 2).map((medicine, index) => (
                          <p key={index} className="text-sm">
                            • {medicine.name} - {medicine.dosage} ({medicine.frequency})
                          </p>
                        ))}
                        {prescription.medicines.length > 2 && (
                          <p className="text-sm text-gray-500">
                            +{prescription.medicines.length - 2} more medicines
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent prescriptions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;