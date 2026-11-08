import React, { useState } from 'react';
import { Calendar, Clock, Phone, User, Send, CheckCircle2, AlertCircle, MessageCircle, ClipboardList, Check, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClinicInfo, AppointmentRequest } from '../types/clinic';

interface BookingSectionProps {
  clinicInfo: ClinicInfo;
  appointmentRequests: AppointmentRequest[];
  onAppointmentBooked: (req: AppointmentRequest) => void;
  onClearRequests: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  clinicInfo,
  appointmentRequests,
  onAppointmentBooked,
  onClearRequests,
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    reason: 'Spine Care & Decompression',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showReceptionRegister, setShowReceptionRegister] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<AppointmentRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.mobileNumber || !formData.preferredDate) return;

    const newReq: AppointmentRequest = {
      id: `req-${Date.now()}`,
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
    setLastSubmitted(newReq);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#16B8A6', '#10243A'],
      });
    } catch {
      // ignore
    }
  };

  const whatsappUrl = lastSubmitted
    ? `https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hello Aries Spine Physiooz Clinic, I would like to request an appointment:\n\n` +
        `*Patient:* ${lastSubmitted.patientName}\n` +
        `*Mobile:* ${lastSubmitted.mobileNumber}\n` +
        `*Preferred Date:* ${lastSubmitted.preferredDate}\n` +
        `*Time Slot:* ${lastSubmitted.preferredTime}\n` +
        `*Condition / Reason:* ${lastSubmitted.reason}\n` +
        (lastSubmitted.message ? `*Notes:* ${lastSubmitted.message}\n` : '')
      )}`
    : '#';

  return (
    <section id="appointment" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context, Working Hours & Reception Log Toggle (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold tracking-wider text-[#16B8A6] uppercase">
              Schedule Your Consultation
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
              Take The First Step Towards Spine Relief
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Appointments at Aries Spine Physiooz Clinic are structured to ensure every patient receives dedicated one-on-one time for posture evaluation, manual assessment, and progressive therapy.
            </p>

            {/* Operating Hours Card */}
            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-[#10243A] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#16B8A6]" />
                <span>Clinic Timings</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {clinicInfo.workingHours}
              </p>
              <p className="text-xs text-slate-500">
                Prior appointment booking is encouraged to minimize wait times and ensure dedicated clinical attention.
              </p>
            </div>

            {/* Reception Register Toggle for Clinic Staff */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowReceptionRegister(!showReceptionRegister)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#10243A] p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ClipboardList className="w-4 h-4 text-[#16B8A6]" />
                <span>
                  {showReceptionRegister ? "Hide Reception Requests Log" : `View Reception Requests Log (${appointmentRequests.length})`}
                </span>
              </button>

              {showReceptionRegister && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 max-h-72 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10243A]">Live Requests Register</span>
                    {appointmentRequests.length > 0 && (
                      <button
                        onClick={onClearRequests}
                        className="text-[11px] text-rose-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>

                  {appointmentRequests.length === 0 ? (
                    <p className="text-xs text-slate-400 py-3 text-center">No appointment requests logged yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {appointmentRequests.map((req) => (
                        <div key={req.id} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="flex justify-between font-semibold text-slate-800">
                            <span>{req.patientName}</span>
                            <span className="text-slate-400 font-normal">{req.submittedAt}</span>
                          </div>
                          <div className="text-slate-600">
                            {req.preferredDate} · {req.preferredTime}
                          </div>
                          <div className="text-[#16B8A6] font-medium">
                            {req.reason} (Tel: {req.mobileNumber})
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Appointment Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {/* Demo Notice Banner */}
            <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Booking Transparency Notice:</strong> Submitting this demo request records your details in the clinic register and allows you to instantly send your appointment details directly to the clinic's WhatsApp for immediate confirmation.
              </div>
            </div>

            {submitted && lastSubmitted ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#10243A]">
                    Appointment Request Recorded
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Thank you, <span className="font-semibold text-slate-900">{lastSubmitted.patientName}</span>. Your request for {lastSubmitted.preferredDate} ({lastSubmitted.preferredTime}) has been recorded.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <div><strong>Patient:</strong> {lastSubmitted.patientName}</div>
                  <div><strong>Phone:</strong> {lastSubmitted.mobileNumber}</div>
                  <div><strong>Treatment:</strong> {lastSubmitted.reason}</div>
                  <div><strong>Clinic:</strong> Kolar Road, Sarvdharm Colony, Bhopal</div>
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send to Clinic WhatsApp ({clinicInfo.whatsapp})</span>
                  </a>

                  <div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      Fill another request
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="e.g., Ramesh Sharma"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                    />
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
                      placeholder="e.g., 98930 12345"
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
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
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#16B8A6]" />
                      <span>Preferred Time</span>
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your symptoms or any previous diagnosis..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
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
      </div>
    </section>
  );
};
