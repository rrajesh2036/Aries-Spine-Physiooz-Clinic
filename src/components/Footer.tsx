import React, { useState } from 'react';
import { Activity, MapPin, Phone, Mail, Navigation, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface FooterProps {
  clinicInfo: ClinicInfo;
}

export const Footer: React.FC<FooterProps> = ({ clinicInfo }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#10243A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Verified Location (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-[#16B8A6] flex items-center justify-center text-[#10243A]">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                {clinicInfo.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Specialized physiotherapy, mechanical spinal decompression, and comprehensive musculoskeletal rehabilitation in Kolar Road, Bhopal.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#16B8A6] shrink-0 mt-0.5" />
                <span>
                  {clinicInfo.addressLine1}, {clinicInfo.colony}, {clinicInfo.area}, {clinicInfo.city}, {clinicInfo.state} {clinicInfo.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-[#16B8A6] shrink-0" />
                <a
                  href={clinicInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#16B8A6] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Google Maps Business Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#16B8A6] transition-colors">Home & 3D Spine</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#16B8A6] transition-colors">About The Clinic</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#16B8A6] transition-colors">Clinic Gallery & Facility</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#16B8A6] transition-colors">Spine & Therapy Services</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#16B8A6] transition-colors">Clinical Standards</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#16B8A6] transition-colors">Verified Google Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#16B8A6] transition-colors">Location & Directions</a>
              </li>
              <li>
                <a href="#appointment" className="hover:text-[#16B8A6] transition-colors">Request Appointment</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Treatments (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Specialized Care Areas
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Spinal Decompression & Disc Care</li>
              <li>Cervical Spondylosis & Neck Pain</li>
              <li>Lumbar Spine & Sciatica Management</li>
              <li>Adhesive Capsulitis (Frozen Shoulder)</li>
              <li>Athletic & Sports Injury Rehabilitation</li>
              <li>Postural Correction & Ergonomic Counseling</li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-500">
              Consultation at Sarvdharm Colony, Kolar Road, Bhopal.
            </div>
          </div>
        </div>

        {/* Bottom bar with legal notices */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {clinicInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <a
              href={clinicInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16B8A6] transition-colors"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Legal Information Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#10243A] text-white">
              <h3 className="font-bold text-base">
                {modalType === 'privacy' ? 'Patient Privacy Policy' : 'Terms & Clinical Disclaimer'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-xs text-slate-600 space-y-3 max-h-[60vh] overflow-y-auto leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Patient Confidentiality:</strong> Aries Spine Physiooz Clinic is committed to protecting all clinical and personal details submitted through this website or during in-person consultations in Kolar Road, Bhopal.
                  </p>
                  <p>
                    <strong>2. Data Use:</strong> Patient contact details submitted via our appointment request form are solely utilized for clinical coordination, appointment confirmation, and direct practitioner-patient correspondence.
                  </p>
                  <p>
                    <strong>3. No Third-Party Sharing:</strong> We do not sell, rent, or lease patient contact information to any third-party marketing services.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Medical Information Disclaimer:</strong> The anatomical graphics, 3D visualizations, and educational descriptions on this website are intended for general health literacy and informational purposes. They do not constitute a formal medical diagnosis.
                  </p>
                  <p>
                    <strong>2. Clinical Assessment Required:</strong> Proper physical therapy protocol requires an in-person clinical assessment by a qualified physiotherapist before initiating specialized spinal decompression or exercise therapy.
                  </p>
                  <p>
                    <strong>3. Emergency Care:</strong> If you are experiencing sudden severe neurological symptoms (loss of sensation, acute weakness, loss of bowel/bladder control), seek immediate emergency hospital care.
                  </p>
                </>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#10243A] rounded-lg hover:bg-[#16B8A6] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
