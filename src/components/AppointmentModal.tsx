import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, MessageSquare, AlertCircle, CheckCircle, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClinicInfo, AppointmentRequest } from '../types/clinic';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicInfo: ClinicInfo;
  initialReason?: string;
  onAppointmentBooked: (req: AppointmentRequest) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  clinicInfo,
  initialReason = '',
  onAppointmentBooked,
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    reason: initialReason || 'Spine Care & Decompression',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedReq, setLastSubmittedReq] = useState<AppointmentRequest | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.patientName.trim()) {
      errs.patientName = 'Patient full name is required.';
    }
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required.';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.mobileNumber.trim())) {
      errs.mobileNumber = 'Please enter a valid phone number.';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newReq: AppointmentRequest = {
      id: `apt-${Date.now()}`,
      patientName: formData.patientName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      reason: formData.reason,
      message: formData.message.trim(),
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
      status: 'pending',
    };

    onAppointmentBooked(newReq);
    setLastSubmittedReq(newReq);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#16B8A6', '#10243A', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  const whatsappUrl = lastSubmittedReq
    ? `https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hello Aries Spine Physiooz Clinic, I would like to request an appointment:\n\n` +
        `*Patient:* ${lastSubmittedReq.patientName}\n` +
        `*Mobile:* ${lastSubmittedReq.mobileNumber}\n` +
        `*Preferred Date:* ${lastSubmittedReq.preferredDate}\n` +
        `*Time Slot:* ${lastSubmittedReq.preferredTime}\n` +
        `*Condition / Reason:* ${lastSubmittedReq.reason}\n` +
        (lastSubmittedReq.message ? `*Notes:* ${lastSubmittedReq.message}\n` : '')
      )}`
    : '#';

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      patientName: '',
      mobileNumber: '',
      preferredDate: '',
      preferredTime: 'Morning (09:00 AM - 12:00 PM)',
      reason: 'Spine Care & Decompression',
      message: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#10243A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16B8A6]/20 flex items-center justify-center text-[#16B8A6]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Request an Appointment
              </h3>
              <p className="text-xs text-slate-300">
                Aries Spine Physiooz Clinic · Kolar Road, Bhopal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo / Preview Mode Notice - Strict Data Accuracy & Transparency */}
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Appointment System Notice:</strong> Until direct SMS gateway credentials are provided by the clinic, this booking form saves your request locally in the clinic reception log with an instant direct WhatsApp transmission option.
          </div>
        </div>

        {submitted && lastSubmittedReq ? (
          /* Submission State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold text-2xl text-[#10243A]">
                Appointment Request Received
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{lastSubmittedReq.patientName}</span>. Your appointment request for <span className="font-semibold text-slate-900">{lastSubmittedReq.preferredDate} ({lastSubmittedReq.preferredTime})</span> has been logged.
              </p>
            </div>

            {/* Request Summary Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-slate-800">{lastSubmittedReq.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Care Category:</span>
                <span className="font-semibold text-[#16B8A6]">{lastSubmittedReq.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">Kolar Road, Bhopal (Sarvdharm Colony)</span>
              </div>
            </div>

            {/* Direct WhatsApp Action for instant response */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Request Directly to Clinic WhatsApp ({clinicInfo.whatsapp})</span>
              </a>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Book Another Request
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-[#10243A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#16B8A6]" />
                <span>Patient Name *</span>
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                  errors.patientName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-[#16B8A6]`}
                placeholder="Full name of patient"
              />
              {errors.patientName && (
                <p className="text-xs text-rose-600 mt-1">{errors.patientName}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#16B8A6]" />
                <span>Mobile Number *</span>
              </label>
              <input
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                  errors.mobileNumber ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-[#16B8A6]`}
                placeholder="10-digit mobile number (e.g. 98930 12345)"
              />
              {errors.mobileNumber && (
                <p className="text-xs text-rose-600 mt-1">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Date & Time Slot Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#16B8A6]" />
                  <span>Preferred Date *</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    errors.preferredDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#16B8A6]`}
                />
                {errors.preferredDate && (
                  <p className="text-xs text-rose-600 mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#16B8A6]" />
                  <span>Preferred Time</span>
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                >
                  <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Reason for Appointment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Reason for Appointment
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
              >
                <option value="Spine Care & Decompression">Spine Care & Decompression</option>
                <option value="Lower Back Pain Management">Lower Back Pain Management</option>
                <option value="Cervical Spine & Neck Relief">Cervical Spine & Neck Relief</option>
                <option value="Sports Injury Rehabilitation">Sports Injury Rehabilitation</option>
                <option value="Frozen Shoulder (Adhesive Capsulitis)">Frozen Shoulder (Adhesive Capsulitis)</option>
                <option value="Joint Pain & Osteoarthritis">Joint Pain & Osteoarthritis</option>
                <option value="Posture Correction & Ergonomics">Posture Correction & Ergonomics</option>
                <option value="General Physiotherapy Consultation">General Physiotherapy Consultation</option>
              </select>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#16B8A6]" />
                <span>Additional Message (Symptoms, duration or notes)</span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                placeholder="Mention how long you have experienced pain or any prior scans/treatments..."
              />
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 font-semibold text-sm text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-xl shadow-md transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Request Appointment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
