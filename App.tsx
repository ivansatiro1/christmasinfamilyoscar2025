
import React, { useState, useEffect } from 'react';
import { Screen, Nominee, AwardCategory } from './types';
import { NOMINEES, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Presenter from './pages/Presenter';
import Categories from './pages/Categories';
import NomineeList from './pages/NomineeList';
import Winner from './pages/Winner';
import Speech from './pages/Speech';
import Credits from './pages/Credits';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<AwardCategory>(CATEGORIES[0]);
  const [selectedWinner, setSelectedWinner] = useState<Nominee>(NOMINEES[0]);

  // Simple scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const navigateTo = (screen: Screen, data?: any) => {
    if (screen === 'nominees' && data) setSelectedCategory(data);
    if ((screen === 'winner' || screen === 'speech') && data) setSelectedWinner(data);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <Home onNavigate={navigateTo} nominees={NOMINEES.slice(0, 5)} />;
      case 'presenter': return <Presenter onNavigate={navigateTo} />;
      case 'categories': return <Categories onNavigate={navigateTo} categories={CATEGORIES} />;
      case 'nominees': return <NomineeList category={selectedCategory} onNavigate={navigateTo} />;
      case 'winner': return <Winner winner={selectedWinner} category={selectedCategory.title} onNavigate={navigateTo} />;
      case 'speech': return <Speech winner={selectedWinner} category={selectedCategory.title} onNavigate={navigateTo} />;
      case 'credits': return <Credits onNavigate={navigateTo} />;
      default: return <Home onNavigate={navigateTo} nominees={NOMINEES} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-white font-body selection:bg-primary selection:text-white">
      <Navbar onNavigate={navigateTo} activeScreen={currentScreen} />
      <main className="flex-grow">
        {renderScreen()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
