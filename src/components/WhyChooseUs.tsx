import React from 'react';
import { UserCheck, Activity, ShieldCheck, GraduationCap, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: UserCheck,
      title: "Personalised Care",
      desc: "Every spine and musculoskeletal profile is distinct. We develop individualized therapy protocols based on your exact biomechanical assessment.",
    },
    {
      icon: Activity,
      title: "Professional Assessment",
      desc: "Structured clinical evaluation assessing spinal posture, range of motion, neural flexibility, and muscular imbalance prior to therapy.",
    },
    {
      icon: ShieldCheck,
      title: "Guided Rehabilitation",
      desc: "Evidence-based manual therapy and gentle spinal decompression conducted under professional supervision to ensure safe, sustainable healing.",
    },
    {
      icon: GraduationCap,
      title: "Patient Education",
      desc: "We empower you with ergonomic strategies, spinal hygiene principles, and preventative home exercises to keep pain from returning.",
    },
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
            Clinical Distinction
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
            Why Choose Aries Spine Physiooz Clinic
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            A patient-first, scientific philosophy rooted in physical medicine, modern spinal ergonomics, and long-term functional vitality.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#16B8A6]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 group-hover:bg-[#10243A] group-hover:border-[#10243A] flex items-center justify-center text-[#16B8A6] group-hover:text-white transition-all duration-300 mb-5 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#10243A] mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-[#16B8A6] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clinical Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency note */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Core patient care values guiding practice at Aries Spine Physiooz Clinic, Kolar Road, Bhopal.
        </div>
      </div>
    </section>
  );
};
