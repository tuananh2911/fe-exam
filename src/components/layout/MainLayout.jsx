import React from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Navigation from './Navigation';

const MainLayout = ({
                        children,
                        currentView,
                        setCurrentView,
                        isSidebarOpen,
                        setIsSidebarOpen
                    }) => {
    // Mock user data
    const user = {
        name: 'Nguyễn Văn A',
        role: 'Giáo viên',
        avatar: '/api/placeholder/32/32'
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Hệ thống chấm thi</h1>
                <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                />
            </header>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-40 h-full bg-white border-r transition-all duration-200 ease-in-out
        ${isSidebarOpen ? 'w-72' : 'w-20'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className={`font-bold transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
                        {isSidebarOpen ? 'Hệ thống chấm thi' : ''}
                    </h2>
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="hidden lg:flex"
                        >
                            {isSidebarOpen ? (
                                <ChevronLeft className="h-5 w-5" />
                            ) : (
                                <ChevronRight className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Navigation */}
                <Navigation
                    currentView={currentView}
                    onNavClick={setCurrentView}
                    isCollapsed={!isSidebarOpen}
                    user={user}
                />
            </aside>

            {/* Main Content */}
            <main className={`
        min-h-screen pt-0 lg:pt-4
        transition-all duration-200 ease-in-out
        ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-20'}
      `}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;