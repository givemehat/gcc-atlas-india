import React, { useState, useEffect } from 'react';
import { ActiveTab, GCC, City } from './types';
import gccDataRaw from '../data/gcc.json';
import citiesDataRaw from '../data/cities.json';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GCCDetailDrawer } from './components/GCCDetailDrawer';
import { CorrectionModal } from './components/CorrectionModal';
import { ErrorBoundary } from './components/ErrorBoundary';

import { HomePage } from './pages/HomePage';
import { RegistryPage } from './pages/RegistryPage';
import { ComparePage } from './pages/ComparePage';
import { RecommenderPage } from './pages/RecommenderPage';
import { AboutPage } from './pages/AboutPage';
import { DeckPage } from './pages/DeckPage';

export const App: React.FC = () => {
  const gccList: GCC[] = gccDataRaw as GCC[];
  const cities: City[] = citiesDataRaw as City[];

  // Read initial tab from URL parameter if present
  const getInitialTab = (): ActiveTab => {
    if (typeof window === 'undefined') return 'home';
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as ActiveTab;
    if (['home', 'registry', 'compare', 'recommender', 'about', 'deck'].includes(tabParam)) {
      return tabParam;
    }
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    if (['home', 'registry', 'compare', 'recommender', 'about', 'deck'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [selectedGCC, setSelectedGCC] = useState<GCC | null>(null);
  const [isCorrectionOpen, setIsCorrectionOpen] = useState<boolean>(false);
  const [correctionPrefill, setCorrectionPrefill] = useState<GCC | null>(null);
  const [registryInitialCity, setRegistryInitialCity] = useState<string>('All');
  const [compareInitialCities, setCompareInitialCities] = useState<string[] | undefined>(undefined);

  // Sync tab with URL
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (tab === 'home') {
        params.delete('tab');
      } else {
        params.set('tab', tab);
      }
      const newQuery = params.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}${window.location.hash}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // Jump from Home or Recommender to Registry filtered by city
  const handleOpenRegistryWithCity = (city: string) => {
    setRegistryInitialCity(city);
    handleSelectTab('registry');
  };

  // Jump from Recommender to Compare with selected cities
  const handleOpenCompareWithCities = (cityIds: string[]) => {
    setCompareInitialCities(cityIds);
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', 'compare');
      params.set('cities', cityIds.join(','));
      const newQuery = params.toString();
      const newUrl = `${window.location.pathname}?${newQuery}${window.location.hash}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // Open correction modal with prefilled GCC
  const handleReportCorrectionForGCC = (gcc: GCC) => {
    setCorrectionPrefill(gcc);
    setIsCorrectionOpen(true);
  };

  // Open correction modal blank
  const handleOpenGeneralCorrection = () => {
    setCorrectionPrefill(null);
    setIsCorrectionOpen(true);
  };

  // Listen for browser popstate (back/forward)
  useEffect(() => {
    const onPopState = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-900 flex flex-col font-sans selection:bg-stone-200 overflow-x-hidden w-full max-w-full">
      {/* Editorial Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenCorrectionModal={handleOpenGeneralCorrection}
        gccCount={gccList.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary>
          {activeTab === 'home' && (
            <HomePage
              onSelectTab={handleSelectTab}
              onOpenRegistryWithCity={handleOpenRegistryWithCity}
              cities={cities}
              gccList={gccList}
            />
          )}

          {activeTab === 'registry' && (
            <RegistryPage
              gccList={gccList}
              onSelectGCC={(gcc) => setSelectedGCC(gcc)}
              initialCityFilter={registryInitialCity}
            />
          )}

          {activeTab === 'compare' && (
            <ComparePage cities={cities} initialCities={compareInitialCities} />
          )}

          {activeTab === 'recommender' && (
            <RecommenderPage
              cities={cities}
              onSelectTab={handleSelectTab}
              onOpenRegistryWithCity={handleOpenRegistryWithCity}
              onOpenCompareWithCities={handleOpenCompareWithCities}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage onOpenCorrectionModal={handleOpenGeneralCorrection} />
          )}

          {activeTab === 'deck' && (
            <DeckPage onSelectTab={handleSelectTab} />
          )}
        </ErrorBoundary>
      </main>

      {/* Institutional Sourced Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenCorrectionModal={handleOpenGeneralCorrection}
      />

      {/* Side-Over Drawer for GCC Details */}
      <GCCDetailDrawer
        gcc={selectedGCC}
        onClose={() => setSelectedGCC(null)}
        onReportCorrection={(gcc) => {
          setSelectedGCC(null);
          handleReportCorrectionForGCC(gcc);
        }}
      />

      {/* Correction Form Modal (logs to console) */}
      <CorrectionModal
        isOpen={isCorrectionOpen}
        onClose={() => setIsCorrectionOpen(false)}
        prefilledGCC={correctionPrefill}
      />
    </div>
  );
};

export default App;
