import React, { useState } from 'react';
import { X, Check, AlertCircle, Save, RotateCcw, ShieldCheck, MapPin } from 'lucide-react';
import { ClinicInfo } from '../types/clinic';
import { INITIAL_CLINIC_INFO } from '../data/clinicData';

interface CmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicInfo: ClinicInfo;
  onSave: (updated: ClinicInfo) => void;
}

export const CmsModal: React.FC<CmsModalProps> = ({
  isOpen,
  onClose,
  clinicInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState<ClinicInfo>(clinicInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof ClinicInfo, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData(INITIAL_CLINIC_INFO);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#10243A] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#16B8A6]/20 rounded-lg text-[#16B8A6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base leading-tight">Clinic Information CMS & Verification</h3>
              <p className="text-xs text-slate-300">
                Update confirmed clinic credentials or maintain clear editable placeholders.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Permanent Verified Notice */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Verified Source of Truth:</span> The physical clinic address
              <span className="font-semibold"> "56, near Abhishek Florist Bimakunj, C Sector, Sarvdharm Colony, Kolar Road, Bhopal 462042" </span>
              is verified via the Google Maps Business Profile. Other variables below can be customized once confirmed.
            </div>
          </div>

          {/* Contact Verification Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#10243A] uppercase tracking-wider flex items-center gap-2">
              <span>Contact Channels</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                  placeholder="+91 95847 84784"
                />
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={formData.isPhoneVerified}
                    onChange={(e) => handleChange('isPhoneVerified', e.target.checked)}
                    className="rounded text-[#16B8A6] focus:ring-[#16B8A6]"
                  />
                  <span>Mark as verified by clinic owner</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Direct Number</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                  placeholder="+91 95847 84784"
                />
                <p className="text-[11px] text-slate-400 mt-1">Used for 1-click patient appointment chat</p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                  placeholder="ariesspinephysiooz@gmail.com"
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h4 className="text-sm font-bold text-[#10243A] uppercase tracking-wider">
              Working Hours
            </h4>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Weekly Clinic Schedule</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                placeholder="Mon - Sat: 9:00 AM - 8:00 PM"
              />
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.isHoursVerified}
                  onChange={(e) => handleChange('isHoursVerified', e.target.checked)}
                  className="rounded text-[#16B8A6] focus:ring-[#16B8A6]"
                />
                <span>Confirmed clinic operating hours</span>
              </label>
            </div>
          </div>

          {/* Staff & Doctor Credentials */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h4 className="text-sm font-bold text-[#10243A] uppercase tracking-wider flex items-center justify-between">
              <span>Practitioner Profile (Do not invent facts)</span>
              {!formData.isDoctorVerified && (
                <span className="text-[11px] text-amber-600 font-normal flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Pending clinic confirmation
                </span>
              )}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor / Lead Physiotherapist Name</label>
                <input
                  type="text"
                  value={formData.doctorName}
                  onChange={(e) => handleChange('doctorName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                  placeholder="e.g., Dr. Rajesh Kumar (or leave placeholder)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Qualifications & Specialization</label>
                <input
                  type="text"
                  value={formData.doctorQualification}
                  onChange={(e) => handleChange('doctorQualification', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
                  placeholder="e.g., BPT, MPT (Musculoskeletal & Sports)"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={formData.isDoctorVerified}
                    onChange={(e) => handleChange('isDoctorVerified', e.target.checked)}
                    className="rounded text-[#16B8A6] focus:ring-[#16B8A6]"
                  />
                  <span>I confirm this practitioner name & credentials are authentic</span>
                </label>
              </div>
            </div>
          </div>

          {/* Google Maps Profile Reference */}
          <div className="space-y-3 pt-3 border-t border-slate-200">
            <h4 className="text-sm font-bold text-[#10243A] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#16B8A6]" />
              <span>Google Maps Profile URL</span>
            </h4>
            <input
              type="text"
              value={formData.googleMapsUrl}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16B8A6]"
              placeholder="https://maps.app.goo.gl/kkYjMkwcqHXvaaJY8"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-lg shadow-sm transition-colors"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
