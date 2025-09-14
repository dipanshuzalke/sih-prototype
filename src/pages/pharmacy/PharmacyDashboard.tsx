import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Pill, 
  Package, 
  ShoppingCart, 
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import pharmacyData from '@/data/pharmacyStock.json';
import prescriptionsData from '@/data/prescriptions.json';

const PharmacyDashboard: React.FC = () => {
  const { t } = useLanguage();
  
  // Get pharmacy data (using first pharmacy for demo)
  const pharmacy = pharmacyData[0];
  const medicines = pharmacy.medicines;
  
  // Get pending prescriptions for this pharmacy
  const pendingPrescriptions = prescriptionsData.filter(rx => 
    rx.pharmacyId === pharmacy.id && !rx.dispensed
  );

  const stats = [
    {
      title: 'Total Medicines',
      value: medicines.length.toString(),
      icon: Pill,
      color: 'bg-blue-500'
    },
    {
      title: 'In Stock',
      value: medicines.filter(m => m.available).length.toString(),
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Out of Stock',
      value: medicines.filter(m => !m.available).length.toString(),
      icon: AlertCircle,
      color: 'bg-red-500'
    },
    {
      title: 'Pending Orders',
      value: pendingPrescriptions.length.toString(),
      icon: ShoppingCart,
      color: 'bg-orange-500'
    }
  ];

  const lowStockMedicines = medicines.filter(m => m.stock < 50 && m.available);
  const outOfStockMedicines = medicines.filter(m => !m.available);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('common.welcome')}, {pharmacy.owner}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {pharmacy.name} - Stock Management Dashboard
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Badge variant="outline" className="text-sm">
            License: {pharmacy.license}
          </Badge>
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
        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                Stock Alerts
              </CardTitle>
              <CardDescription>
                Medicines running low or out of stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockMedicines.length > 0 || outOfStockMedicines.length > 0 ? (
                <div className="space-y-4">
                  {outOfStockMedicines.map((medicine) => (
                    <div key={medicine.id} className="flex items-center justify-between p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200">
                          {medicine.name}
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Out of Stock
                        </p>
                        <p className="text-xs text-red-500 dark:text-red-400">
                          {medicine.manufacturer} • Batch: {medicine.batchNo}
                        </p>
                      </div>
                      <Badge variant="destructive">
                        Out of Stock
                      </Badge>
                    </div>
                  ))}
                  
                  {lowStockMedicines.map((medicine) => (
                    <div key={medicine.id} className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                          {medicine.name}
                        </h4>
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                          Stock: {medicine.stock} units
                        </p>
                        <p className="text-xs text-orange-500 dark:text-orange-400">
                          {medicine.manufacturer} • ₹{medicine.price}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Low Stock
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">All medicines are adequately stocked</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Prescription Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('pharmacy.prescriptionOrders')}
              </CardTitle>
              <CardDescription>
                Recent prescription orders to fulfill
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {pendingPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          Prescription #{prescription.id}
                        </h4>
                        <Badge variant="secondary">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {prescription.date}
                      </div>
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
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">
                          Mark as Dispensed
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No pending prescription orders</p>
                </div>
              )}
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
              Common pharmacy management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">{t('pharmacy.updateStock')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Update medicine inventory
                </p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <ShoppingCart className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Process Orders</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Handle prescription orders
                </p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Sales Report</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View sales analytics
                </p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Expiry Alerts</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check expiring medicines
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PharmacyDashboard;