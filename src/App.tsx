import React, { useState, useEffect } from 'react';
import { MessageCircle, Settings, ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ClinicGallery } from './components/ClinicGallery';
import { TreatmentsSection } from './components/TreatmentsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { CmsModal } from './components/CmsModal';
import { ClinicInfo, TreatmentItem, ReviewItem, AppointmentRequest } from './types/clinic';
import { INITIAL_CLINIC_INFO, INITIAL_TREATMENTS, INITIAL_REVIEWS } from './data/clinicData';

export default function App() {
  // State for clinic info with localStorage persistence
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() => {
    try {
      const saved = localStorage.getItem('aries_clinic_info');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CLINIC_INFO;
  });

  const [treatments] = useState<TreatmentItem[]>(INITIAL_TREATMENTS);
  const [reviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Appointment requests logged in preview mode
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>(() => {
    try {
      const saved = localStorage.getItem('aries_appointment_requests');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialReason, setBookingInitialReason] = useState<string>('');
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveClinicInfo = (updated: ClinicInfo) => {
    setClinicInfo(updated);
    try {
      localStorage.setItem('aries_clinic_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAppointmentBooked = (req: AppointmentRequest) => {
    const updated = [req, ...appointmentRequests];
    setAppointmentRequests(updated);
    try {
      localStorage.setItem('aries_appointment_requests', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearRequests = () => {
    setAppointmentRequests([]);
    try {
      localStorage.removeItem('aries_appointment_requests');
    } catch {
      // ignore
    }
  };

  const openBookingWithReason = (reason: string) => {
    setBookingInitialReason(reason);
    setIsBookingOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#263746] flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        clinicInfo={clinicInfo}
        onOpenBooking={() => {
          setBookingInitialReason('');
          setIsBookingOpen(true);
        }}
        onOpenCms={() => setIsCmsOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with 3D Anatomical Spine */}
        <Hero
          clinicInfo={clinicInfo}
          onOpenBooking={() => {
            setBookingInitialReason('');
            setIsBookingOpen(true);
          }}
        />

        {/* 2. About The Clinic (Evidence-based care in Kolar Road, Bhopal) */}
        <AboutSection
          clinicInfo={clinicInfo}
          onOpenCms={() => setIsCmsOpen(true)}
        />

        {/* 3. Verified Google Business Photos Gallery */}
        <ClinicGallery />

        {/* 4. 3D Interactive Treatment Cards */}
        <TreatmentsSection
          treatments={treatments}
          onSelectTreatmentForBooking={openBookingWithReason}
        />

        {/* 4. Why Choose Us (Clinical Principles) */}
        <WhyChooseUs />

        {/* 5. Patient Reviews (Verified Google Reviews) */}
        <ReviewsSection
          clinicInfo={clinicInfo}
          reviews={reviews}
        />

        {/* 6. Clinic Location & Interactive Map */}
        <LocationSection clinicInfo={clinicInfo} />

        {/* 7. Appointment Booking Section */}
        <BookingSection
          clinicInfo={clinicInfo}
          appointmentRequests={appointmentRequests}
          onAppointmentBooked={handleAppointmentBooked}
          onClearRequests={handleClearRequests}
        />

        {/* 8. Contact Section */}
        <ContactSection
          clinicInfo={clinicInfo}
          onOpenCms={() => setIsCmsOpen(true)}
          onOpenBooking={() => {
            setBookingInitialReason('');
            setIsBookingOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer clinicInfo={clinicInfo} />

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        clinicInfo={clinicInfo}
        initialReason={bookingInitialReason}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* Clinic Content Management (CMS) & Verification Modal */}
      <CmsModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        clinicInfo={clinicInfo}
        onSave={handleSaveClinicInfo}
      />

      {/* Floating Action Buttons: WhatsApp & Scroll to Top */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-white/90 hover:bg-white text-[#10243A] border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct WhatsApp Patient Chat */}
        <a
          href={`https://wa.me/${clinicInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            "Hello Aries Spine Physiooz Clinic, I would like to inquire about physiotherapy consultation at your Kolar Road clinic."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          title="Chat with Aries Spine Physiooz Clinic on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">
            Chat with Clinic
          </span>
        </a>
      </div>
    </div>
  );
}
