import React from 'react';
import { X, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import Navigation from './Navigation';
import UserInfo from './UserInfo';

const Sidebar = ({
                     isOpen,
                     onClose,
                     currentView,
                     onNavClick,
                     user,
                     onLogout
                 }) => {
    return (
        <>
            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-40 h-full w-72 bg-white border-r transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
                {/* Sidebar Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Hệ thống chấm thi</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* User Info */}
                <UserInfo user={user} />

                {/* Navigation */}
                <Navigation
                    currentView={currentView}
                    onNavClick={(view) => {
                        onNavClick(view);
                        onClose();
                    }}
                />

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={onLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Đăng xuất</span>
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;