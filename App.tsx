import { useState } from 'react';
import {
  AtmosphericBackground,
  type TimeOfDayMode,
} from './components/AtmosphericBackground';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InfoSections } from './components/InfoSections';
import { ServiceWizard } from './components/ServiceWizard';

export default function App() {
  const [sceneMode, setSceneMode] = useState<TimeOfDayMode>('night');

  const scrollToWizard = () => {
    const el = document.getElementById('booking-wizard');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ErrorBoundary>
      <div dir="rtl" className="relative min-h-screen flex flex-col text-[#1E1D1B]">
        <AtmosphericBackground mode={sceneMode} />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header onStartBooking={scrollToWizard} />
          <main className="flex-1">
            <HeroSection
              onStartBooking={scrollToWizard}
              sceneMode={sceneMode}
              onChangeSceneMode={setSceneMode}
            />
            <ServiceWizard />
            <InfoSections />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
