import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Stethoscope, 
  Pill, 
  BarChart3,
  Heart,
  Shield,
  Globe
} from 'lucide-react';

const Landing: React.FC = () => {
  // const { t } = useLanguage();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'patient' | 'doctor' | 'pharmacy' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  const roles = [
    {
      id: 'patient',
      title: 'Patient Portal',
      titleHi: 'रोगी पोर्टल',
      titlePa: 'ਮਰੀਜ਼ ਪੋਰਟਲ',
      description: 'Book consultations, view health records, check symptoms',
      descriptionHi: 'परामर्श बुक करें, स्वास्थ्य रिकॉर्ड देखें, लक्षण जांचें',
      descriptionPa: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ, ਸਿਹਤ ਰਿਕਾਰਡ ਵੇਖੋ, ਲੱਛਣ ਜਾਂਚੋ',
      icon: Users,
      color: 'bg-blue-500',
      role: 'patient' as const
    },
    {
      id: 'doctor',
      title: 'Doctor Portal',
      titleHi: 'डॉक्टर पोर्टल',
      titlePa: 'ਡਾਕਟਰ ਪੋਰਟਲ',
      description: 'Manage patients, conduct consultations, write prescriptions',
      descriptionHi: 'मरीजों का प्रबंधन करें, परामर्श करें, प्रिस्क्रिप्शन लिखें',
      descriptionPa: 'ਮਰੀਜ਼ਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ, ਸਲਾਹ ਕਰੋ, ਨੁਸਖ਼ੇ ਲਿਖੋ',
      icon: Stethoscope,
      color: 'bg-green-500',
      role: 'doctor' as const
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Portal',
      titleHi: 'फार्मेसी पोर्टल',
      titlePa: 'ਫਾਰਮੇਸੀ ਪੋਰਟਲ',
      description: 'Manage medicine stock, process prescription orders',
      descriptionHi: 'दवा स्टॉक प्रबंधित करें, प्रिस्क्रिप्शन ऑर्डर प्रोसेस करें',
      descriptionPa: 'ਦਵਾਈ ਸਟਾਕ ਪ੍ਰਬੰਧਿਤ ਕਰੋ, ਨੁਸਖ਼ਾ ਆਰਡਰ ਪ੍ਰੋਸੈਸ ਕਰੋ',
      icon: Pill,
      color: 'bg-orange-500',
      role: 'pharmacy' as const
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      titleHi: 'एडमिन डैशबोर्ड',
      titlePa: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
      description: 'System administration, analytics, user management',
      descriptionHi: 'सिस्टम प्रशासन, विश्लेषण, उपयोगकर्ता प्रबंधन',
      descriptionPa: 'ਸਿਸਟਮ ਪ੍ਰਸ਼ਾਸਨ, ਵਿਸ਼ਲੇਸ਼ਣ, ਯੂਜ਼ਰ ਪ੍ਰਬੰਧਨ',
      icon: BarChart3,
      color: 'bg-purple-500',
      role: 'admin' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-red-500 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Rural Health Connect
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Connecting rural communities with quality healthcare through technology. 
            Bridging the gap between patients, doctors, and pharmacies.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Secure & Private
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              Multilingual Support
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Trusted by 1000+ Users
            </div>
          </div>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Choose Your Portal
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {role.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full"
                        onClick={() => handleRoleSelect(role.role)}
                      >
                        Enter Portal
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Why Choose Rural Health Connect?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Multilingual Support</h4>
              <p className="text-gray-600 dark:text-gray-400">Available in English, Hindi, and Punjabi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Quality Care</h4>
              <p className="text-gray-600 dark:text-gray-400">Connect with qualified healthcare professionals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Secure Platform</h4>
              <p className="text-gray-600 dark:text-gray-400">Your health data is safe and encrypted</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;