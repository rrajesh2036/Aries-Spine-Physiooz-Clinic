import React from 'react';
import { Star, ExternalLink, MapPin, CheckCircle2 } from 'lucide-react';
import { ClinicInfo, ReviewItem } from '../types/clinic';

interface ReviewsSectionProps {
  clinicInfo: ClinicInfo;
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ clinicInfo, reviews }) => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#F7FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Google Business Profile Callout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Patient Experiences</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
              Verified Feedback & Google Reviews
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Read authentic experiences shared by patients who received spine, joint, and physiotherapy care at our Kolar Road clinic.
            </p>
          </div>

          {/* Primary CTA: Read Google Reviews on Google Maps */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={clinicInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-xl shadow-sm transition-all duration-200"
            >
              <span>Read Google Reviews</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={clinicInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all duration-200"
            >
              <span>Write a Review</span>
            </a>
          </div>
        </div>

        {/* Google Reviews Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Google Star Rating & Source Attribution */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16B8A6]" />
                    Google Maps
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#10243A]">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Bhopal, MP</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Data Accuracy & Source of Truth Disclaimer Banner */}
        <div className="mt-10 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#10243A]">Original Source Attribution:</span>
            <span>All reviews are referenced from the official Google Business Profile of Aries Spine Physiooz Clinic.</span>
          </div>
          <a
            href={clinicInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#16B8A6] font-semibold hover:underline whitespace-nowrap"
          >
            Open Profile on Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
};
