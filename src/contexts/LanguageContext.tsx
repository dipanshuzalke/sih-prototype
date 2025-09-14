import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'pa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, any>) => string;
}

const translations = {
  en: {
    // Common
    'common.welcome': 'Welcome',
    'common.login': 'Login',
    'common.register': 'Register',
    'common.dashboard': 'Dashboard',
    'common.profile': 'Profile',
    'common.logout': 'Logout',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.loading': 'Loading...',
    'common.syncPending': 'Sync Pending',
    
    // Patient App
    'patient.welcomeMessage': 'Welcome to Rural Health Connect',
    'patient.selectLanguage': 'Select your preferred language',
    'patient.phoneNumber': 'Phone Number',
    'patient.enterOTP': 'Enter OTP',
    'patient.verifyOTP': 'Verify OTP',
    'patient.bookConsultation': 'Book Consultation',
    'patient.upcomingAppointments': 'Upcoming Appointments',
    'patient.healthRecords': 'Health Records',
    'patient.symptomChecker': 'Symptom Checker',
    'patient.selectDoctor': 'Select Doctor',
    'patient.selectTimeSlot': 'Select Time Slot',
    'patient.confirmBooking': 'Confirm Booking',
    
    // Doctor Portal
    'doctor.todaySchedule': "Today's Schedule",
    'doctor.patientList': 'Patient List',
    'doctor.consultations': 'Consultations',
    'doctor.prescriptions': 'Prescriptions',
    'doctor.videoCall': 'Video Call',
    'doctor.chatMessages': 'Chat Messages',
    'doctor.addPrescription': 'Add Prescription',
    
    // Pharmacy Portal
    'pharmacy.stockManagement': 'Stock Management',
    'pharmacy.updateStock': 'Update Stock',
    'pharmacy.prescriptionOrders': 'Prescription Orders',
    'pharmacy.medicineAvailable': 'Available',
    'pharmacy.medicineOutOfStock': 'Out of Stock',
    
    // Admin Dashboard
    'admin.userManagement': 'User Management',
    'admin.appointmentManagement': 'Appointment Management',
    'admin.analytics': 'Analytics',
    'admin.reports': 'Reports',
    'admin.totalPatients': 'Total Patients',
    'admin.totalDoctors': 'Total Doctors',
    'admin.totalPharmacies': 'Total Pharmacies',
    'admin.todayConsultations': "Today's Consultations"
  },
  hi: {
    // Common
    'common.welcome': 'स्वागत है',
    'common.login': 'लॉग इन',
    'common.register': 'पंजीकरण',
    'common.dashboard': 'डैशबोर्ड',
    'common.profile': 'प्रोफ़ाइल',
    'common.logout': 'लॉग आउट',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.date': 'दिनांक',
    'common.time': 'समय',
    'common.status': 'स्थिति',
    'common.actions': 'क्रियाएं',
    'common.loading': 'लोड हो रहा है...',
    'common.syncPending': 'सिंक लंबित',
    
    // Patient App
    'patient.welcomeMessage': 'ग्रामीण स्वास्थ्य कनेक्ट में आपका स्वागत है',
    'patient.selectLanguage': 'अपनी पसंदीदा भाषा चुनें',
    'patient.phoneNumber': 'फ़ोन नंबर',
    'patient.enterOTP': 'OTP दर्ज करें',
    'patient.verifyOTP': 'OTP सत्यापित करें',
    'patient.bookConsultation': 'परामर्श बुक करें',
    'patient.upcomingAppointments': 'आगामी अपॉइंटमेंट',
    'patient.healthRecords': 'स्वास्थ्य रिकॉर्ड',
    'patient.symptomChecker': 'लक्षण जांचकर्ता',
    'patient.selectDoctor': 'डॉक्टर चुनें',
    'patient.selectTimeSlot': 'समय स्लॉट चुनें',
    'patient.confirmBooking': 'बुकिंग की पुष्टि करें',
    
    // Doctor Portal
    'doctor.todaySchedule': 'आज का कार्यक्रम',
    'doctor.patientList': 'रोगी सूची',
    'doctor.consultations': 'परामर्श',
    'doctor.prescriptions': 'प्रिस्क्रिप्शन',
    'doctor.videoCall': 'वीडियो कॉल',
    'doctor.chatMessages': 'चैट संदेश',
    'doctor.addPrescription': 'प्रिस्क्रिप्शन जोड़ें',
    
    // Pharmacy Portal
    'pharmacy.stockManagement': 'स्टॉक प्रबंधन',
    'pharmacy.updateStock': 'स्टॉक अपडेट करें',
    'pharmacy.prescriptionOrders': 'प्रिस्क्रिप्शन ऑर्डर',
    'pharmacy.medicineAvailable': 'उपलब्ध',
    'pharmacy.medicineOutOfStock': 'स्टॉक में नहीं',
    
    // Admin Dashboard
    'admin.userManagement': 'उपयोगकर्ता प्रबंधन',
    'admin.appointmentManagement': 'अपॉइंटमेंट प्रबंधन',
    'admin.analytics': 'विश्लेषण',
    'admin.reports': 'रिपोर्ट',
    'admin.totalPatients': 'कुल मरीज़',
    'admin.totalDoctors': 'कुल डॉक्टर',
    'admin.totalPharmacies': 'कुल फार्मेसी',
    'admin.todayConsultations': 'आज के परामर्श'
  },
  pa: {
    // Common
    'common.welcome': 'ਜੀ ਆਇਆਂ ਨੂੰ',
    'common.login': 'ਲਾਗਇਨ',
    'common.register': 'ਰਜਿਸਟਰ',
    'common.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'common.profile': 'ਪ੍ਰੋਫਾਇਲ',
    'common.logout': 'ਲਾਗਆਉਟ',
    'common.save': 'ਸੇਵ',
    'common.cancel': 'ਰੱਦ',
    'common.delete': 'ਮਿਟਾਓ',
    'common.edit': 'ਐਡਿਟ',
    'common.view': 'ਵੇਖੋ',
    'common.search': 'ਖੋਜ',
    'common.filter': 'ਫਿਲਟਰ',
    'common.date': 'ਮਿਤੀ',
    'common.time': 'ਸਮਾਂ',
    'common.status': 'ਸਥਿਤੀ',
    'common.actions': 'ਕਾਰਵਾਈਆਂ',
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.syncPending': 'ਸਿੰਕ ਬਾਕੀ',
    
    // Patient App
    'patient.welcomeMessage': 'ਪਿੰਡਾਂ ਦੇ ਸਿਹਤ ਕਨੈਕਟ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ',
    'patient.selectLanguage': 'ਆਪਣੀ ਮਨਪਸੰਦ ਭਾਸ਼ਾ ਚੁਣੋ',
    'patient.phoneNumber': 'ਫੋਨ ਨੰਬਰ',
    'patient.enterOTP': 'OTP ਦਰਜ਼ ਕਰੋ',
    'patient.verifyOTP': 'OTP ਪ੍ਰਮਾਣਿਤ ਕਰੋ',
    'patient.bookConsultation': 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    'patient.upcomingAppointments': 'ਆਉਣ ਵਾਲੀਆਂ ਮੁਲਾਕਾਤਾਂ',
    'patient.healthRecords': 'ਸਿਹਤ ਰਿਕਾਰਡ',
    'patient.symptomChecker': 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    'patient.selectDoctor': 'ਡਾਕਟਰ ਚੁਣੋ',
    'patient.selectTimeSlot': 'ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ',
    'patient.confirmBooking': 'ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    
    // Doctor Portal
    'doctor.todaySchedule': 'ਅੱਜ ਦਾ ਸਮਾਂ-ਸਾਰਣੀ',
    'doctor.patientList': 'ਮਰੀਜ਼ਾਂ ਦੀ ਸੂਚੀ',
    'doctor.consultations': 'ਸਲਾਹ-ਮਸ਼ਵਰੇ',
    'doctor.prescriptions': 'ਨੁਸਖ਼ੇ',
    'doctor.videoCall': 'ਵੀਡੀਓ ਕਾਲ',
    'doctor.chatMessages': 'ਚੈਟ ਸੰਦੇਸ਼',
    'doctor.addPrescription': 'ਨੁਸਖ਼ਾ ਜੋੜੋ',
    
    // Pharmacy Portal
    'pharmacy.stockManagement': 'ਸਟਾਕ ਪ੍ਰਬੰਧਨ',
    'pharmacy.updateStock': 'ਸਟਾਕ ਅਪਡੇਟ ਕਰੋ',
    'pharmacy.prescriptionOrders': 'ਨੁਸਖ਼ਾ ਆਰਡਰ',
    'pharmacy.medicineAvailable': 'ਉਪਲਬਧ',
    'pharmacy.medicineOutOfStock': 'ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ',
    
    // Admin Dashboard
    'admin.userManagement': 'ਯੂਜ਼ਰ ਪ੍ਰਬੰਧਨ',
    'admin.appointmentManagement': 'ਮੁਲਾਕਾਤ ਪ੍ਰਬੰਧਨ',
    'admin.analytics': 'ਵਿਸ਼ਲੇਸ਼ਣ',
    'admin.reports': 'ਰਿਪੋਰਟਾਂ',
    'admin.totalPatients': 'ਕੁੱਲ ਮਰੀਜ਼',
    'admin.totalDoctors': 'ਕੁੱਲ ਡਾਕਟਰ',
    'admin.totalPharmacies': 'ਕੁੱਲ ਫਾਰਮੇਸੀ',
    'admin.todayConsultations': 'ਅੱਜ ਦੇ ਸਲਾਹ-ਮਸ਼ਵਰੇ'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('telemedicine-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('telemedicine-language', language);
  }, [language]);

  const t = (key: string, options: Record<string, any> = {}) => {
    const translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    // Simple interpolation
    return Object.keys(options).reduce((text, optionKey) => {
      return text.replace(`{{${optionKey}}}`, options[optionKey]);
    }, translation);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};