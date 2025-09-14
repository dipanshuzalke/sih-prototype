import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, Star, Video, Phone, ArrowLeft, Check } from 'lucide-react';
import doctorsData from '@/data/doctors.json';
import { toast } from 'sonner';

const BookConsultation: React.FC = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<'doctors' | 'slots' | 'details' | 'confirmation'>('doctors');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'phone'>('video');
  const [symptoms, setSymptoms] = useState('');

  const getLocalizedName = (doctor: any) => {
    switch (language) {
      case 'hi': return doctor.nameHi || doctor.name;
      case 'pa': return doctor.namePa || doctor.name;
      default: return doctor.name;
    }
  };

  const getLocalizedSpecialty = (doctor: any) => {
    switch (language) {
      case 'hi': return doctor.specialtyHi || doctor.specialty;
      case 'pa': return doctor.specialtyPa || doctor.specialty;
      default: return doctor.specialty;
    }
  };

  const availableSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep('slots');
  };

  const handleSlotSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('details');
  };

  const handleBookingConfirm = () => {
    toast.success('Consultation booked successfully!');
    setStep('confirmation');
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getDayAfterTomorrowDate = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split('T')[0];
  };

  if (step === 'confirmation') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your consultation has been successfully booked
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">{getLocalizedName(selectedDoctor)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDate} at {selectedTime}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type: {consultationType === 'video' ? 'Video Call' : 'Phone Call'}
              </p>
            </div>
            <Button onClick={() => setStep('doctors')} className="w-full">
              Book Another Consultation
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        {step !== 'doctors' && (
          <Button
            variant="ghost"
            onClick={() => {
              if (step === 'slots') setStep('doctors');
              if (step === 'details') setStep('slots');
            }}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div>
          <h1 className="text-3xl font-bold">{t('patient.bookConsultation')}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {step === 'doctors' && 'Select a doctor'}
            {step === 'slots' && 'Choose your preferred time'}
            {step === 'details' && 'Provide consultation details'}
          </p>
        </div>
      </div>

      {/* Step 1: Doctor Selection */}
      {step === 'doctors' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6"
        >
          {doctorsData.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.avatar} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{getLocalizedName(doctor)}</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {getLocalizedSpecialty(doctor)}
                          </p>
                          <p className="text-sm text-gray-500">{doctor.qualification}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="font-semibold">{doctor.rating}</span>
                          </div>
                          <Badge variant={doctor.isOnline ? 'default' : 'secondary'}>
                            {doctor.isOnline ? 'Online' : 'Offline'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>{doctor.experience} years experience</p>
                          <p>{doctor.totalConsultations} consultations</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">₹{doctor.consultationFee}</p>
                          <Button
                            onClick={() => handleDoctorSelect(doctor)}
                            disabled={!doctor.isOnline}
                          >
                            {t('patient.selectDoctor')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Step 2: Time Slot Selection */}
      {step === 'slots' && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Selected Doctor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                  <AvatarFallback>{selectedDoctor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{getLocalizedName(selectedDoctor)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getLocalizedSpecialty(selectedDoctor)} • ₹{selectedDoctor.consultationFee}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tomorrow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Tomorrow
                </CardTitle>
                <CardDescription>{getTomorrowDate()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSlotSelect(getTomorrowDate(), time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Day After Tomorrow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Day After
                </CardTitle>
                <CardDescription>{getDayAfterTomorrowDate()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((time) => (
                    <Button
                      key={time}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSlotSelect(getDayAfterTomorrowDate(), time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Step 3: Consultation Details */}
      {step === 'details' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>
                {getLocalizedName(selectedDoctor)} on {selectedDate} at {selectedTime}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Consultation Type</label>
                <div className="flex space-x-4 mt-2">
                  <Button
                    variant={consultationType === 'video' ? 'default' : 'outline'}
                    onClick={() => setConsultationType('video')}
                    className="flex-1"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                  <Button
                    variant={consultationType === 'phone' ? 'default' : 'outline'}
                    onClick={() => setConsultationType('phone')}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone Call
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Symptoms / Reason for Consultation</label>
                <Textarea
                  placeholder="Describe your symptoms or reason for consultation..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Doctor:</span>
                    <span>{getLocalizedName(selectedDoctor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>{consultationType === 'video' ? 'Video Call' : 'Phone Call'}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Consultation Fee:</span>
                    <span>₹{selectedDoctor.consultationFee}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleBookingConfirm} className="w-full">
                {t('patient.confirmBooking')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default BookConsultation;