import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Car, Compass, Building } from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface LocationSectionProps {
  clinicInfo: ClinicInfo;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ clinicInfo }) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${clinicInfo.addressLine1}, ${clinicInfo.colony}, ${clinicInfo.area}, ${clinicInfo.city}, ${clinicInfo.state} - ${clinicInfo.pincode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Maps embed URL for Sarvdharm Colony, Kolar Road, Bhopal
  const mapEmbedUrl = "https://maps.google.com/maps?q=Sarvdharm+Colony+Kolar+Road+Bhopal+Madhya+Pradesh+462042&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
            Verified Physical Location
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
            Visit Aries Spine Physiooz Clinic
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Conveniently located in C Sector, Sarvdharm Colony on Kolar Road, Bhopal, with easy access and ground-level reception.
          </p>
        </div>

        {/* Map & Address Details Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address Card & Transit Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#F7FAFC] p-6 sm:p-8 rounded-3xl border border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#16B8A6] uppercase tracking-wider mb-3">
                <Building className="w-4 h-4" />
                <span>Clinic Address</span>
              </div>

              <div className="text-xl font-bold text-[#10243A] leading-snug">
                {clinicInfo.name}
              </div>

              {/* Exact Address */}
              <div className="mt-4 space-y-1 text-sm text-slate-700 leading-relaxed">
                <p className="font-medium text-[#10243A]">{clinicInfo.addressLine1}</p>
                <p>{clinicInfo.colony}</p>
                <p>{clinicInfo.area}, {clinicInfo.city}</p>
                <p>{clinicInfo.state} - {clinicInfo.pincode}</p>
              </div>

              {/* Copy Address Button */}
              <button
                onClick={handleCopy}
                className="mt-4 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Address Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Full Address</span>
                  </>
                )}
              </button>

              {/* Landmark Guidance */}
              <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-[#16B8A6] shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A]">Landmark Reference</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Directly near Abhishek Florist Bimakunj in C Sector.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-[#16B8A6] shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10243A]">Parking & Access</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Ground level access with street and roadside parking on Kolar Road.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direction CTAs */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row gap-3">
              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-xl shadow-sm transition-all duration-200"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all duration-200"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Embedded Map View (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative min-h-[380px] lg:min-h-full bg-slate-100">
            <iframe
              title="Aries Spine Physiooz Clinic Google Map Location"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />

            {/* Floating Top Map Card */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-md text-xs text-slate-700 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#16B8A6] shrink-0" />
                <div>
                  <span className="font-bold text-[#10243A]">Sarvdharm Colony, Kolar Road</span>
                  <div className="text-[11px] text-slate-500">Bhopal, Madhya Pradesh 462042</div>
                </div>
              </div>
              <a
                href={clinicInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#16B8A6] hover:underline shrink-0"
              >
                View on Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
