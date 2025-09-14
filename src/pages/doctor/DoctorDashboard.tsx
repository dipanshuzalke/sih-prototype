import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import appointmentsData from '@/data/appointments.json';
import patientsData from '@/data/patients.json';

const DoctorDashboard: React.FC = () => {
  const { t } = useLanguage();

  // Mock data for doctor dashboard
  const todayAppointments = appointmentsData.filter(apt => 
    apt.doctorId === 'D001' && apt.date === '2024-01-25'
  );

  const recentPatients = patientsData.slice(0, 3);

  const stats = [
    {
      title: "Today's Consultations",
      value: todayAppointments.length.toString(),
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Patients',
      value: '127',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Prescriptions Written',
      value: '89',
      icon: FileText,
      color: 'bg-purple-500'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const getPatientName = (patientId: string) => {
    const patient = patientsData.find(p => p.id === patientId);
    return patient?.name || 'Unknown Patient';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('common.welcome')}, Dr. Amrit!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's your practice overview for today
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600 dark:text-green-400">Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {t('doctor.todaySchedule')}
              </CardTitle>
              <CardDescription>
                Your appointments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{getPatientName(appointment.patientId)}</h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                          <span>•</span>
                          <span>{appointment.type === 'video' ? 'Video Call' : 'Phone Call'}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Symptoms: {appointment.symptoms?.join(', ') || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No appointments scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Patients
              </CardTitle>
              <CardDescription>
                Patients you've recently consulted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{patient.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {patient.age} years • {patient.gender} • {patient.bloodGroup}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {patient.village}, {patient.district}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last visit: {patient.lastVisit}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={patient.syncStatus === 'synced' ? 'default' : 'secondary'}>
                        {patient.syncStatus}
                      </Badge>
                      {patient.chronicConditions.length > 0 && (
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                          {patient.chronicConditions.length} chronic condition(s)
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">View All Patients</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access complete patient database
                </p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Write Prescription</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create new prescription
                </p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Manage Schedule</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Update availability slots
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;