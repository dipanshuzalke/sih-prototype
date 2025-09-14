import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  Stethoscope,
  Pill,
  ClipboardList,
  BarChart3,
  User,
  Search
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { currentRole } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    switch (currentRole) {
      case 'patient':
        return [
          { icon: Home, label: t('common.dashboard'), path: '/patient' },
          { icon: Calendar, label: t('patient.bookConsultation'), path: '/patient/book' },
          { icon: FileText, label: t('patient.healthRecords'), path: '/patient/records' },
          { icon: Search, label: t('patient.symptomChecker'), path: '/patient/symptoms' },
          { icon: User, label: t('common.profile'), path: '/patient/profile' },
        ];
      case 'doctor':
        return [
          { icon: Home, label: t('common.dashboard'), path: '/doctor' },
          { icon: Users, label: t('doctor.patientList'), path: '/doctor/patients' },
          { icon: Stethoscope, label: t('doctor.consultations'), path: '/doctor/consultations' },
          { icon: FileText, label: t('doctor.prescriptions'), path: '/doctor/prescriptions' },
          { icon: User, label: t('common.profile'), path: '/doctor/profile' },
        ];
      case 'pharmacy':
        return [
          { icon: Home, label: t('common.dashboard'), path: '/pharmacy' },
          { icon: Pill, label: t('pharmacy.stockManagement'), path: '/pharmacy/stock' },
          { icon: ClipboardList, label: t('pharmacy.prescriptionOrders'), path: '/pharmacy/orders' },
          { icon: User, label: t('common.profile'), path: '/pharmacy/profile' },
        ];
      case 'admin':
        return [
          { icon: Home, label: t('common.dashboard'), path: '/admin' },
          { icon: Users, label: t('admin.userManagement'), path: '/admin/users' },
          { icon: Calendar, label: t('admin.appointmentManagement'), path: '/admin/appointments' },
          { icon: BarChart3, label: t('admin.analytics'), path: '/admin/analytics' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={cn('pb-12 min-h-screen border-r bg-background', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start bg-white text-black dark:bg-black dark:text-white"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;