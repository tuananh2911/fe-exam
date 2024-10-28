import React from 'react';

const UserInfo = ({ user }) => {
    return (
        <div className="p-4 border-b">
            <div className="flex items-center gap-3">
                <img
                    src={user.avatar || '/api/placeholder/32/32'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;