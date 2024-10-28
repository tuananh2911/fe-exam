import React from 'react';
import {
    Home, FileText, Users, School,
    Settings, LogOut, LayoutGrid,
    Shuffle, PenTool, BarChart
} from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const navigationItems = [
    {
        icon: Home,
        label: 'Trang chủ',
        view: 'home'
    },
    {
        icon: LayoutGrid,
        label: 'Quản lý bài thi',
        view: 'management'
    },
    {
        icon: PenTool,
        label: 'Chấm bài thi',
        view: 'grading'
    },
    {
        icon: Shuffle,
        label: 'Trộn đề thi',
        view: 'mixing',
        description: 'Import và tạo các mã đề khác nhau'
    },
    {
        icon: BarChart,
        label: 'Hiển thị điểm',
        view: 'scores',
        description: 'Xem và phân tích kết quả học sinh'
    },
    {
        icon: School,
        label: 'Quản lý lớp học',
        view: 'classes'
    },
    {
        icon: Users,
        label: 'Quản lý học sinh',
        view: 'students'
    },
    {
        icon: Settings,
        label: 'Cài đặt',
        view: 'settings'
    }
];

const Navigation = ({ currentView, onNavClick, isCollapsed, user }) => {
    const NavItem = ({ item }) => {
        const Icon = item.icon;
        const isActive = currentView === item.view;

        const button = (
            <button
                onClick={() => onNavClick(item.view)}
                className={`
          w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1
          transition-colors duration-200
          ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'}
        `}
            >
                <Icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && (
                    <div className="text-left">
                        <div>{item.label}</div>
                        {item.description && !isActive && (
                            <div className="text-xs text-gray-500">{item.description}</div>
                        )}
                    </div>
                )}
            </button>
        );

        return isCollapsed ? (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {button}
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                    <p>{item.label}</p>
                    {item.description && (
                        <p className="text-xs text-gray-500">{item.description}</p>
                    )}
                </TooltipContent>
            </Tooltip>
        ) : (
            button
        );
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* User Info */}
            {!isCollapsed && (
                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.role}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-2">
                {navigationItems.map((item) => (
                    <NavItem key={item.view} item={item} />
                ))}
            </nav>

            {/* Logout Button */}
            <div className="p-2 border-t">
                {isCollapsed ? (
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                            Đăng xuất
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Đăng xuất</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Navigation;