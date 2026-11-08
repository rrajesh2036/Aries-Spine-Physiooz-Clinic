import React from 'react';
import { MapPin, Calendar, Navigation, ArrowRight, Shield, Award, CheckCircle2 } from 'lucide-react';
import { SpineModel3D } from './3d/SpineModel3D';
import { ClinicInfo } from '../types/clinic';

interface HeroProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ clinicInfo, onOpenBooking }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-16 lg:py-20 border-b border-slate-200/60">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#16B8A6]/10 to-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Proposition & Actions (7 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4">
            {/* Location Label - Clean unboxed metadata with icon */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#16B8A6] uppercase">
              <MapPin className="w-4 h-4 text-[#16B8A6]" />
              <span>Kolar Road, Bhopal</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">Madhya Pradesh</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#10243A] tracking-tight leading-[1.08] [text-wrap:balance]">
              Move Better. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10243A] via-[#16B8A6] to-[#0ea5e9]">
                Live Stronger.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#263746]/85 leading-relaxed max-w-xl">
              Your journey towards better movement and mobility starts here. Specialized physiotherapy, spinal decompression, and targeted rehabilitation designed for lasting clinical relief.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#10243A] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-all duration-200"
              >
                <Navigation className="w-4 h-4 text-[#16B8A6]" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Clean Trust Pillars (Zero-pill text format with typographic dots) */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#16B8A6]" />
                  Spinal Decompression & Care
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#16B8A6]" />
                  Orthopedic Rehabilitation
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#16B8A6]" />
                  Postural Correction
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Spine Interactive Viewport (6 cols on lg) */}
          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-3xl bg-gradient-to-b from-white to-slate-50/80 border border-slate-200/90 shadow-xl overflow-hidden p-2 sm:p-4 aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
              {/* Subtle grid pattern background */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#10243A 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* 3D Anatomical Spine Canvas Component */}
              <SpineModel3D className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Verified Location Banner Strip directly adjacent to hero */}
        <div className="mt-12 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDF8F5] flex items-center justify-center text-[#16B8A6] shrink-0 mt-0.5 sm:mt-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Verified Clinic Location
              </div>
              <div className="text-sm font-semibold text-[#10243A]">
                {clinicInfo.addressLine1}, {clinicInfo.colony}, {clinicInfo.area}, {clinicInfo.city} {clinicInfo.pincode}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-500">Opposite Abhishek Florist Bimakunj</span>
            <a
              href={clinicInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#16B8A6] hover:text-[#10243A] hover:bg-[#DDF8F5] rounded-lg transition-colors whitespace-nowrap"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
