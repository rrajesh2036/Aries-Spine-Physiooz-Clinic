import React from 'react';
import { MapPin, Shield, CheckCircle, UserCheck, Stethoscope, ArrowUpRight, Clock } from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface AboutSectionProps {
  clinicInfo: ClinicInfo;
  onOpenCms: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clinicInfo, onOpenCms }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Heading */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
            About Aries Spine Physiooz Clinic
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
            Care That Keeps You Moving
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#263746]/80 leading-relaxed">
            Situated in Sarvdharm Colony along Kolar Road in Bhopal, Aries Spine Physiooz Clinic specializes in targeted spinal rehabilitation, neuromuscular reconditioning, and progressive musculoskeletal therapy.
          </p>
        </div>

        {/* Visual & Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Clinic Imagery Showcase (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="/images/google_clinic/clinic_photo_1.jpg"
                alt="Aries Spine Physiooz Clinic real treatment bays and rehabilitation gym in Kolar Road, Bhopal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#10243A]/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#16B8A6]" />
                <span>Verified Clinic Treatment Facility · Kolar Road</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/images/google_clinic/clinic_photo_2.jpg"
                  alt="Gait training and active exercise gym in clinic"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-[11px] font-medium">
                  Active Exercise & Gait Studio
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-[4/3] bg-slate-900 flex items-center justify-center p-2">
                <img
                  src="/images/google_clinic/clinic_photo_5.jpg"
                  alt="Aries Spine Physiooz Clinic Registration Reg. No. 37509"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] font-medium text-center">
                  Official Registration Reg. No. 37509
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Clinic Attributes & Clinical Methodology (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                At <span className="font-semibold text-[#10243A]">Aries Spine Physiooz Clinic</span>, we prioritize an anatomy-first, non-surgical pathway to spinal health and functional recovery. Our focus encompasses cervical, thoracic, and lumbar conditions, as well as sports injuries and persistent joint stiffness.
              </p>
              <p>
                Each treatment session begins with an in-depth biomechanical assessment to identify specific joint hypomobility, muscular imbalances, or neural tensions before initiating targeted manual decompression and therapeutic exercises.
              </p>
            </div>

            {/* Core Clinical Pillars */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2.5 text-[#10243A] font-semibold text-sm">
                  <Stethoscope className="w-4 h-4 text-[#16B8A6]" />
                  <span>Anatomy-Guided Decompression</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tailored decompression and mobilization aimed at easing intervertebral pressure and improving nutrient exchange in spinal discs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2.5 text-[#10243A] font-semibold text-sm">
                  <CheckCircle className="w-4 h-4 text-[#16B8A6]" />
                  <span>Active Neuromuscular Re-education</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Transitioning from passive pain management to active core stabilization, postural endurance, and self-management ergonomics.
                </p>
              </div>
            </div>

            {/* Practitioner Profile & Accurate Data Notice */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-[#DDF8F5]/30">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10243A] text-white flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-[#16B8A6]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Clinical Leadership
                    </div>
                    <div className="text-sm font-bold text-[#10243A]">
                      {clinicInfo.doctorName}
                    </div>
                    <div className="text-xs text-[#16B8A6] font-medium mt-0.5">
                      {clinicInfo.doctorQualification}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenCms}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-[#10243A] bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
                  title="Edit or confirm doctor credentials in CMS"
                >
                  Edit in CMS
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {clinicInfo.workingHours}
                </span>
                <span className="text-[11px] text-slate-400 italic">
                  {clinicInfo.isDoctorVerified ? "Verified credentials" : "Editable placeholder"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
