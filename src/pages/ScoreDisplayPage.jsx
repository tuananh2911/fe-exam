import React, { useState } from 'react';
import {
    Settings,
    Eye,
    Rocket,
    ChevronDown,
    Search,
    Globe,
    Layout
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';

// Mock data cho dropdown
const mockData = {
    schools: ['THPT Chu Văn An', 'THPT Nguyễn Huệ', 'THPT Lê Lợi'],
    grades: ['Khối 10', 'Khối 11', 'Khối 12'],
    classes: ['10A1', '10A2', '11A1', '11A2', '12A1', '12A2'],
    exams: ['Kiểm tra 15p Toán', 'Kiểm tra 1 tiết Văn', 'Thi học kỳ Anh']
};

const ScoreDisplayPage = () => {
    // State cho form
    const [formData, setFormData] = useState({
        title: 'Bảng điểm học sinh',
        school: '',
        grade: '',
        class: '',
        exam: '',
        showClass: true,
        showGrade: true,
        showSchool: true,
        enableSearch: true,
        theme: 'light'
    });

    // State cho preview
    const [previewData, setPreviewData] = useState([
        { id: 1, name: 'Nguyễn Văn A', class: '10A1', score: 9.5 },
        { id: 2, name: 'Trần Thị B', class: '10A1', score: 8.5 },
        { id: 3, name: 'Lê Văn C', class: '10A1', score: 7.5 },
    ]);

    const handleInputChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleDeploy = () => {
        // Xử lý triển khai website
        console.log('Deploying website with config:', formData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Configuration */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Cấu hình trang web
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tiêu đề trang
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Nhập tiêu đề trang web"
                                    />
                                </div>

                                {/* Dropdowns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Trường học
                                        </label>
                                        <select
                                            className="w-full p-2 border rounded-md"
                                            value={formData.school}
                                            onChange={(e) => handleInputChange('school', e.target.value)}
                                        >
                                            <option value="">Chọn trường</option>
                                            {mockData.schools.map(school => (
                                                <option key={school} value={school}>{school}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Khối
                                        </label>
                                        <select
                                            className="w-full p-2 border rounded-md"
                                            value={formData.grade}
                                            onChange={(e) => handleInputChange('grade', e.target.value)}
                                        >
                                            <option value="">Chọn khối</option>
                                            {mockData.grades.map(grade => (
                                                <option key={grade} value={grade}>{grade}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Lớp
                                        </label>
                                        <select
                                            className="w-full p-2 border rounded-md"
                                            value={formData.class}
                                            onChange={(e) => handleInputChange('class', e.target.value)}
                                        >
                                            <option value="">Chọn lớp</option>
                                            {mockData.classes.map(cls => (
                                                <option key={cls} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Bài thi
                                        </label>
                                        <select
                                            className="w-full p-2 border rounded-md"
                                            value={formData.exam}
                                            onChange={(e) => handleInputChange('exam', e.target.value)}
                                        >
                                            <option value="">Chọn bài thi</option>
                                            {mockData.exams.map(exam => (
                                                <option key={exam} value={exam}>{exam}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Display Options */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-medium mb-4">Tùy chọn hiển thị</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.showSchool}
                                                onChange={(e) => handleInputChange('showSchool', e.target.checked)}
                                            />
                                            Hiển thị tên trường
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.showGrade}
                                                onChange={(e) => handleInputChange('showGrade', e.target.checked)}
                                            />
                                            Hiển thị khối
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.showClass}
                                                onChange={(e) => handleInputChange('showClass', e.target.checked)}
                                            />
                                            Hiển thị lớp
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.enableSearch}
                                                onChange={(e) => handleInputChange('enableSearch', e.target.checked)}
                                            />
                                            Cho phép tìm kiếm
                                        </label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Theme Selection */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-medium mb-4">Giao diện</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            className={`p-4 border rounded-lg text-center ${
                                                formData.theme === 'light' ? 'border-blue-500 bg-blue-50' : ''
                                            }`}
                                            onClick={() => handleInputChange('theme', 'light')}
                                        >
                                            <div className="w-full h-20 bg-white border rounded mb-2"></div>
                                            Sáng
                                        </button>
                                        <button
                                            className={`p-4 border rounded-lg text-center ${
                                                formData.theme === 'dark' ? 'border-blue-500 bg-blue-50' : ''
                                            }`}
                                            onClick={() => handleInputChange('theme', 'dark')}
                                        >
                                            <div className="w-full h-20 bg-gray-900 border rounded mb-2"></div>
                                            Tối
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                Xem trước
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`border rounded-lg p-4 ${
                                formData.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'
                            }`}>
                                {/* Preview Header */}
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
                                    {formData.showSchool && formData.school && (
                                        <div className="text-sm">{formData.school}</div>
                                    )}
                                    {formData.showGrade && formData.grade && (
                                        <div className="text-sm">{formData.grade}</div>
                                    )}
                                    {formData.showClass && formData.class && (
                                        <div className="text-sm">{formData.class}</div>
                                    )}
                                    {formData.exam && (
                                        <div className="text-sm font-medium mt-2">{formData.exam}</div>
                                    )}
                                </div>

                                {/* Search Bar */}
                                {formData.enableSearch && (
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm học sinh..."
                                            className={`w-full p-2 pl-8 border rounded-md ${
                                                formData.theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''
                                            }`}
                                        />
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    </div>
                                )}

                                {/* Score Table */}
                                <table className="w-full">
                                    <thead className={`${
                                        formData.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                                    }`}>
                                    <tr>
                                        <th className="p-2 text-left">STT</th>
                                        <th className="p-2 text-left">Họ và tên</th>
                                        {formData.showClass && (
                                            <th className="p-2 text-left">Lớp</th>
                                        )}
                                        <th className="p-2 text-left">Điểm</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {previewData.map((student, index) => (
                                        <tr key={student.id} className={`${
                                            formData.theme === 'dark' ? 'border-gray-800' : ''
                                        } border-t`}>
                                            <td className="p-2">{index + 1}</td>
                                            <td className="p-2">{student.name}</td>
                                            {formData.showClass && (
                                                <td className="p-2">{student.class}</td>
                                            )}
                                            <td className="p-2">{student.score}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Deploy Button */}
                    <Button
                        onClick={handleDeploy}
                        className="w-full h-12 text-lg"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Rocket className="h-5 w-5" />
                            <span>Triển khai website</span>
                        </div>
                    </Button>

                    {/* Preview Links */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value="https://scores.example.com/your-page"
                                        readOnly
                                        className="flex-1 p-2 border rounded bg-gray-50 text-sm"
                                    />
                                    <Button variant="outline" size="sm">
                                        Copy
                                    </Button>
                                </div>
                                <div className="text-sm text-gray-500">
                                    * Website sẽ được cập nhật tự động khi có điểm mới
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ScoreDisplayPage;