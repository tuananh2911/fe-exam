import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

const MobileHeader = ({ onMenuClick, pageTitle, user }) => {
    return (
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
            <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden"
            >
                <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
            <img
                src={user.avatar || '/api/placeholder/32/32'}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
            />
        </header>
    );
};

export default MobileHeader;