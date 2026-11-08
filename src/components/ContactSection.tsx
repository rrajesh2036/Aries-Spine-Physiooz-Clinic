import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Edit3, ExternalLink, ShieldCheck } from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface ContactSectionProps {
  clinicInfo: ClinicInfo;
  onOpenCms: () => void;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  clinicInfo,
  onOpenCms,
  onOpenBooking,
}) => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F7FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
            Get In Touch
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
            Contact Aries Spine Physiooz Clinic
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Reach out to our clinical reception on Kolar Road, Bhopal for consultations, appointment scheduling, and patient inquiries.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Verified Address */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#DDF8F5] text-[#16B8A6] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Verified Address
              </div>
              <div className="text-sm font-bold text-[#10243A] mt-1">
                Aries Spine Physiooz
              </div>
              <div className="text-xs text-slate-600 mt-2 leading-relaxed">
                56, near Abhishek Florist Bimakunj, C Sector, Sarvdharm Colony, Kolar Road, Bhopal 462042
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#16B8A6] hover:underline flex items-center gap-1"
              >
                <span>Navigate on Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#10243A] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center justify-between">
                <span>Clinic Phone</span>
                {!clinicInfo.isPhoneVerified && (
                  <span className="text-[10px] text-amber-600 font-normal">Pending verify</span>
                )}
              </div>
              <div className="text-sm font-bold text-[#10243A] mt-1">
                {clinicInfo.phone}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Direct phone inquiries for appointments and recovery queries.
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="text-xs font-semibold text-[#16B8A6] hover:underline"
              >
                Call Clinic
              </a>
              <button
                onClick={onOpenCms}
                className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit in CMS
              </button>
            </div>
          </div>

          {/* Card 3: WhatsApp Direct */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                WhatsApp Desk
              </div>
              <div className="text-sm font-bold text-[#10243A] mt-1">
                {clinicInfo.whatsapp}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Fast chat support for appointment bookings and scan reports.
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Working Hours */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#10243A] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Consultation Hours
              </div>
              <div className="text-sm font-bold text-[#10243A] mt-1 leading-snug">
                {clinicInfo.workingHours}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Prior booking recommended for dedicated one-on-one therapy.
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <button
                onClick={onOpenBooking}
                className="text-xs font-semibold text-[#16B8A6] hover:underline"
              >
                Schedule Visit →
              </button>
            </div>
          </div>
        </div>

        {/* Accuracy Assurance Footer Callout */}
        <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16B8A6] shrink-0" />
            <span>
              <strong>Clinical Accuracy Note:</strong> All contact information can be confirmed or updated by the clinic owner via the built-in CMS.
            </span>
          </div>
          <button
            onClick={onOpenCms}
            className="text-xs font-semibold text-[#10243A] hover:text-[#16B8A6] underline whitespace-nowrap"
          >
            Launch Clinic CMS
          </button>
        </div>
      </div>
    </section>
  );
};
