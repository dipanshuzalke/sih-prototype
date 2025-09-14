import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  Calendar, 
  Stethoscope,
  Pill,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import analyticsData from '@/data/analytics.json';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('admin.totalPatients'),
      value: analyticsData.overview.totalPatients.toString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: t('admin.totalDoctors'),
      value: analyticsData.overview.totalDoctors.toString(),
      icon: Stethoscope,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: t('admin.totalPharmacies'),
      value: analyticsData.overview.totalPharmacies.toString(),
      icon: Pill,
      color: 'bg-purple-500',
      change: '+2%'
    },
    {
      title: t('admin.todayConsultations'),
      value: analyticsData.overview.todayConsultations.toString(),
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+18%'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            System overview and analytics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600 dark:text-green-400">System Online</span>
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Consultations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Daily Consultations</CardTitle>
              <CardDescription>
                Number of consultations over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.consultationStats.daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="consultations" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Consultations by Specialty */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Consultations by Specialty</CardTitle>
              <CardDescription>
                Distribution of consultations across medical specialties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.consultationStats.bySpecialty}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {analyticsData.consultationStats.bySpecialty.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {analyticsData.consultationStats.bySpecialty.map((item, index) => (
                  <div key={item.specialty} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{item.specialty}</span>
                    </div>
                    <span className="font-semibold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Patient Age Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.patientDemographics.ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Language Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.patientDemographics.languages.map((lang, _index) => (
                  <div key={lang.language} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{lang.language}</span>
                      <span className="font-semibold">{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sync Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Data Sync Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Synced</span>
                  </div>
                  <span className="font-semibold">{analyticsData.syncStatus.synced}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-semibold">{analyticsData.syncStatus.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm">Failed</span>
                  </div>
                  <span className="font-semibold">{analyticsData.syncStatus.failed}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((analyticsData.syncStatus.synced / analyticsData.syncStatus.total) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;