import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ExamGradingPage from './pages/ExamGradingPage';
import ExamMixingPage from './pages/ExamMixingPage';
import ScoreDisplayPage from './pages/ScoreDisplayPage';
import { TooltipProvider } from './components/ui/tooltip';

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Xử lý chuyển view
    const handleViewChange = (view) => {
        setCurrentView(view);
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    // Render content dựa trên currentView
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <HomePage
                        onAddNewExam={() => handleViewChange('grading')}
                        onImportExam={() => handleViewChange('mixing')}
                    />
                );

            case 'grading':
                return (
                    <ExamGradingPage
                        onBack={() => handleViewChange('home')}
                    />
                );

            case 'mixing':
                return (
                    <ExamMixingPage
                        onBack={() => handleViewChange('home')}
                    />
                );

            case 'scores':
                return (
                    <ScoreDisplayPage
                        onBack={() => handleViewChange('home')}
                    />
                );

            default:
                return (
                    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">
                                Tính năng đang phát triển
                            </h2>
                            <p className="text-gray-600">
                                Chức năng này sẽ sớm được cập nhật.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <TooltipProvider>
            <MainLayout
                currentView={currentView}
                setCurrentView={handleViewChange}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            >
                <div className={`
          transition-all duration-200 ease-in-out
          ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
        `}>
                    {renderContent()}
                </div>
            </MainLayout>
        </TooltipProvider>
    );
};

export default App;