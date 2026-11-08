import React, { useState } from 'react';
import { ArrowUpRight, Activity, Bone, HeartPulse, Sparkles, Check, X, ShieldAlert, Calendar } from 'lucide-react';
import { TreatmentItem } from '../types/clinic';

interface TreatmentsSectionProps {
  treatments: TreatmentItem[];
  onSelectTreatmentForBooking: (treatmentTitle: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  treatments,
  onSelectTreatmentForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTreatment, setActiveModalTreatment] = useState<TreatmentItem | null>(null);

  const categories = ['All', 'Spine Health', 'Joint Care', 'Sports Medicine', 'Wellness & Prevention'];

  const filteredTreatments = selectedCategory === 'All'
    ? treatments
    : treatments.filter((t) => t.category === selectedCategory);

  return (
    <section id="treatments" className="py-16 lg:py-24 bg-[#F7FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
              Clinical Specializations
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
              Comprehensive Spine & Musculoskeletal Care
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Targeted therapy protocols designed to restore spinal mobility, alleviate nerve impingement, and rehabilitate acute or chronic injuries.
            </p>
          </div>

          {/* Interactive Category Filter Controls (Allowed buttons as per §1.A) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-[#10243A] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTreatments.map((treatment, idx) => (
            <div
              key={treatment.id}
              className="group relative bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:border-[#16B8A6]/40 transition-all duration-300 flex flex-col justify-between"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div>
                {/* Visual Medical Illustration Container */}
                <div className="w-full h-36 rounded-xl bg-gradient-to-br from-[#10243A] via-[#10243A] to-[#16B8A6]/30 relative overflow-hidden flex items-center justify-center mb-5 group-hover:shadow-inner transition-all">
                  {/* Procedural Anatomical Graphic */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#16B8A6] group-hover:scale-110 group-hover:text-white transition-all duration-300">
                      {idx % 3 === 0 ? (
                        <Bone className="w-7 h-7" />
                      ) : idx % 3 === 1 ? (
                        <Activity className="w-7 h-7" />
                      ) : (
                        <HeartPulse className="w-7 h-7" />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-white/80 uppercase tracking-widest mt-2">
                      {treatment.category}
                    </span>
                  </div>

                  {/* Grid overlay & glowing radial gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(#16B8A6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#16B8A6]/20 rounded-full blur-xl group-hover:bg-[#16B8A6]/35 transition-all" />
                </div>

                {/* Treatment Heading & Category */}
                <h3 className="font-display font-bold text-lg text-[#10243A] group-hover:text-[#16B8A6] transition-colors leading-snug">
                  {treatment.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {treatment.shortDesc}
                </p>

                {/* Unboxed Metadata Indicators */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span>{treatment.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>Targeted Protocol</span>
                </div>
              </div>

              {/* Action Button: Learn More */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalTreatment(treatment)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#10243A] group-hover:text-[#16B8A6] transition-colors"
                >
                  <span>Learn Protocol Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#16B8A6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTreatmentForBooking(treatment.title)}
                  className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-[#10243A] hover:text-white rounded-lg transition-all"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency note regarding confirmed services */}
        <div className="mt-10 p-3.5 bg-slate-100/70 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
          <span>
            <strong className="text-slate-800">Clinic Scope Notice:</strong> These clinical care categories represent the primary spine & physiotherapy domains treated at Aries Spine Physiooz Clinic. Individual treatment pathways are customized post clinical examination.
          </span>
        </div>
      </div>

      {/* Learn More Interactive Modal */}
      {activeModalTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            {/* Modal Header */}
            <div className="p-6 bg-[#10243A] text-white">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#16B8A6]">
                  {activeModalTreatment.category}
                </div>
                <button
                  onClick={() => setActiveModalTreatment(null)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl mt-1">
                {activeModalTreatment.title}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Clinical Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalTreatment.detailedDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Common Symptoms Treated
                </h4>
                <ul className="space-y-1.5">
                  {activeModalTreatment.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#16B8A6] shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Rehabilitation Methodology
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalTreatment.rehabApproach.map((approach, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium">
                      {approach}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#DDF8F5]/40 border border-[#16B8A6]/30 rounded-xl text-xs text-[#10243A]">
                <strong>Standard Session Length:</strong> {activeModalTreatment.duration}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveModalTreatment(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const title = activeModalTreatment.title;
                  setActiveModalTreatment(null);
                  onSelectTreatmentForBooking(title);
                }}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-xl shadow-sm transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book This Therapy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
