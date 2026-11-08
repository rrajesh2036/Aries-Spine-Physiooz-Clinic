export interface ClinicInfo {
  name: string;
  tagline: string;
  addressLine1: string;
  landmark: string;
  colony: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: string;
  doctorName: string;
  doctorQualification: string;
  isPhoneVerified: boolean;
  isDoctorVerified: boolean;
  isHoursVerified: boolean;
}

export interface TreatmentItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  symptoms: string[];
  rehabApproach: string[];
  duration: string;
  confirmedByClinic: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isGoogleVerified: boolean;
}

export interface AppointmentRequest {
  id: string;
  patientName: string;
  mobileNumber: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message: string;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'contacted';
}
