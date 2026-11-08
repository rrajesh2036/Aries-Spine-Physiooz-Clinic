import React, { useState } from 'react';
import { Camera, ExternalLink, X, ChevronLeft, ChevronRight, CheckCircle2, MapPin, ZoomIn } from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  googleMapsUrl: string;
  badge: string;
}

export const CLINIC_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    src: '/images/google_clinic/clinic_photo_1.jpg',
    title: 'Clinic Treatment Bays & Rehabilitation Area',
    category: 'Facility & Equipment',
    description: 'Spacious treatment setup at Kolar Road featuring private examination plinths, parallel walking rehabilitation bars, posture mirrors, and therapeutic exercise equipment.',
    googleMapsUrl: 'https://maps.app.goo.gl/D2gQrVQ4zeX9WYVh6',
    badge: 'Verified Interior',
  },
  {
    id: 'photo-2',
    src: '/images/google_clinic/clinic_photo_2.jpg',
    title: 'Gait Training & Active Exercise Gym',
    category: 'Rehabilitation Studio',
    description: 'Dedicated functional rehabilitation gym inside the clinic for balance restoration, gait retraining, and active musculoskeletal strengthening.',
    googleMapsUrl: 'https://maps.app.goo.gl/zYBMA4uBfy79TvPa6',
    badge: 'Rehab Equipment',
  },
  {
    id: 'photo-3',
    src: '/images/google_clinic/clinic_photo_3.jpg',
    title: 'Official Clinic Practice & Contact Information',
    category: 'Practice Profile',
    description: 'Official clinic notice affirming phone (+91 95847 84784), email (ariesspinephysiooz@gmail.com), and the verified Kolar Road address in Bhopal.',
    googleMapsUrl: 'https://maps.app.goo.gl/CRk8RboEKJMo5VSp6',
    badge: 'Verified Credentials',
  },
  {
    id: 'photo-4',
    src: '/images/google_clinic/clinic_photo_4.jpg',
    title: 'Post-Surgery Physical Therapy Protocol',
    category: 'Clinical Focus',
    description: 'Structured post-surgical orthopedic physical therapy ensuring faster, safer, and complete recovery following spine and joint procedures.',
    googleMapsUrl: 'https://maps.app.goo.gl/Hgup9xMg4MXGjPej9',
    badge: 'Specialized Protocol',
  },
  {
    id: 'photo-5',
    src: '/images/google_clinic/clinic_photo_5.jpg',
    title: 'Official Registration Mark (Reg. No. 37509)',
    category: 'Accreditation & Modalities',
    description: 'Official clinic identity card showing registration (Reg. No. 37509) and specialized treatment modalities: Manual Therapy, Osteopathy & Chiropractic Technique, Pilates Exercise, PNF Therapy, and Laser Modalities.',
    googleMapsUrl: 'https://maps.app.goo.gl/SMq5tTreGVHCiZaF7',
    badge: 'Reg. No. 37509',
  },
];

export const ClinicGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto = selectedPhotoIndex !== null ? CLINIC_PHOTOS[selectedPhotoIndex] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % CLINIC_PHOTOS.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + CLINIC_PHOTOS.length) % CLINIC_PHOTOS.length);
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#16B8A6] uppercase mb-2">
              <Camera className="w-4 h-4 text-[#16B8A6]" />
              <span>Verified Google Business Gallery</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10243A] tracking-tight [text-wrap:balance]">
              Inside Aries Spine Physiooz Clinic
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Authentic facility photographs, treatment bays, and clinical equipment directly verified from our Google Business Profile in Sarvdharm Colony, Kolar Road, Bhopal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://maps.app.goo.gl/kkYjMkwcqHXvaaJY8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#10243A] bg-slate-100 hover:bg-[#10243A] hover:text-white rounded-xl transition-all shadow-2xs whitespace-nowrap"
            >
              <span>View All on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Hero Photo: Treatment Bays (Col-span 2 on md/lg) */}
          <div
            onClick={() => setSelectedPhotoIndex(0)}
            className="md:col-span-2 group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[16/10] bg-slate-100"
          >
            <img
              src={CLINIC_PHOTOS[0].src}
              alt={CLINIC_PHOTOS[0].title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#10243A] text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16B8A6]" />
                {CLINIC_PHOTOS[0].badge}
              </span>
              <span className="p-2 bg-black/40 backdrop-blur-md text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-xs font-semibold text-[#16B8A6] uppercase tracking-wider mb-1">
                {CLINIC_PHOTOS[0].category}
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl leading-tight">
                {CLINIC_PHOTOS[0].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {CLINIC_PHOTOS[0].description}
              </p>
            </div>
          </div>

          {/* Photo 5: Official Registration Card / Modalities */}
          <div
            onClick={() => setSelectedPhotoIndex(4)}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[4/3] md:aspect-auto bg-slate-900"
          >
            <img
              src={CLINIC_PHOTOS[4].src}
              alt={CLINIC_PHOTOS[4].title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 bg-[#16B8A6] text-[#10243A] text-xs font-bold rounded-lg shadow-sm">
                {CLINIC_PHOTOS[4].badge}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="text-[11px] font-semibold text-[#16B8A6] uppercase tracking-wider">
                Official Certification
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base leading-tight mt-0.5">
                {CLINIC_PHOTOS[4].title}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                Manual Therapy · Osteopathy · PNF · Pilates
              </p>
            </div>
          </div>

          {/* Photo 2: Active Gym & Gait Studio */}
          <div
            onClick={() => setSelectedPhotoIndex(1)}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[4/3] bg-slate-100"
          >
            <img
              src={CLINIC_PHOTOS[1].src}
              alt={CLINIC_PHOTOS[1].title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#10243A] text-xs font-bold rounded-lg">
                {CLINIC_PHOTOS[1].badge}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                {CLINIC_PHOTOS[1].title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                Walking bars & exercise equipment
              </p>
            </div>
          </div>

          {/* Photo 3: Official Clinic Practice Banner */}
          <div
            onClick={() => setSelectedPhotoIndex(2)}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[4/3] bg-slate-100"
          >
            <img
              src={CLINIC_PHOTOS[2].src}
              alt={CLINIC_PHOTOS[2].title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#10243A] text-xs font-bold rounded-lg">
                {CLINIC_PHOTOS[2].badge}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                {CLINIC_PHOTOS[2].title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                Phone: 9584784784 · Kolar Road, Bhopal
              </p>
            </div>
          </div>

          {/* Photo 4: Post-Surgery Physical Therapy */}
          <div
            onClick={() => setSelectedPhotoIndex(3)}
            className="group relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 aspect-[4/3] bg-slate-100"
          >
            <img
              src={CLINIC_PHOTOS[3].src}
              alt={CLINIC_PHOTOS[3].title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#10243A] text-xs font-bold rounded-lg">
                {CLINIC_PHOTOS[3].badge}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="font-display font-bold text-sm sm:text-base leading-tight">
                {CLINIC_PHOTOS[3].title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                Post-surgical rehabilitation protocols
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Authenticity Guarantee Footer */}
        <div className="mt-8 p-4 bg-[#F7FAFC] rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16B8A6] shrink-0" />
            <span>
              <strong>Authentic Clinic Imagery:</strong> All 5 images are sourced directly from Aries Spine Physiooz Clinic's verified Google Business profile.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#10243A]">
            <span>Reg. No. 37509</span>
            <span className="text-slate-300">·</span>
            <span>Tel: +91 95847 84784</span>
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#10243A] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span className="px-2 py-0.5 bg-[#16B8A6] text-[#10243A] font-bold rounded">
                  {activePhoto.badge}
                </span>
                <span>Photo {selectedPhotoIndex + 1} of {CLINIC_PHOTOS.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePhoto.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg text-xs flex items-center gap-1 transition-colors"
                  title="View on Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Google Maps</span>
                </a>
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Viewport */}
            <div className="relative flex items-center justify-center bg-black/50 min-h-[340px] max-h-[65vh] p-4 overflow-hidden">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[60vh] max-w-full object-contain rounded-xl"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-[#16B8A6] text-white rounded-full transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-[#16B8A6] text-white rounded-full transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Caption & Details */}
            <div className="p-6 text-white bg-[#0e1d2e] border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-[#16B8A6] uppercase tracking-wider">
                    {activePhoto.category}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mt-0.5">
                    {activePhoto.title}
                  </h4>
                </div>

                <a
                  href={activePhoto.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto px-4 py-1.5 bg-[#16B8A6] hover:bg-[#16B8A6]/90 text-[#10243A] text-xs font-bold rounded-xl transition-all"
                >
                  Open in Google Maps
                </a>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
