import React from 'react';
import {
    FileText,
    Users,
    BarChart2,
    Clock,
    School,
    BookOpen,
    Rocket,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const HomePage = () => {
    // Mock data cho thống kê
    const stats = [
        {
            title: 'Tổng số bài thi',
            value: '1,234',
            trend: '+12%',
            description: 'So với tháng trước',
            icon: FileText,
            color: 'text-blue-600 bg-blue-100'
        },
        {
            title: 'Số học sinh',
            value: '856',
            trend: '+5%',
            description: 'So với tháng trước',
            icon: Users,
            color: 'text-green-600 bg-green-100'
        },
        {
            title: 'Điểm trung bình',
            value: '7.8',
            trend: '-0.2',
            description: 'So với tháng trước',
            icon: BarChart2,
            color: 'text-purple-600 bg-purple-100'
        },
        {
            title: 'Website đang hoạt động',
            value: '12',
            trend: '+2',
            description: 'Trang web hiển thị điểm',
            icon: Rocket,
            color: 'text-orange-600 bg-orange-100'
        }
    ];

    // Mock data cho hoạt động gần đây
    const recentActivities = [
        {
            type: 'exam_graded',
            title: 'Đã chấm bài kiểm tra Toán 15p',
            time: '5 phút trước',
            details: 'Lớp 10A1 - 35 bài',
            extraInfo: 'Điểm trung bình: 7.5'
        },
        {
            type: 'web_deployed',
            title: 'Đã triển khai trang web điểm mới',
            time: '30 phút trước',
            details: 'Bài kiểm tra Văn học kỳ 1 - Khối 11',
            extraInfo: 'URL: scores.example.com/11a2'
        },
        {
            type: 'exam_mixed',
            title: 'Đã tạo đề thi Tiếng Anh',
            time: '1 giờ trước',
            details: '4 mã đề - Khối 12',
            extraInfo: '40 câu hỏi/đề'
        }
    ];

    // Mock data cho thống kê theo môn học
    const subjectStats = [
        {
            subject: 'Toán',
            exams: 45,
            avgScore: 7.8,
            papers: 1250,
            trend: '+0.3',
            lastUpdate: '2 giờ trước'
        },
        {
            subject: 'Văn',
            exams: 32,
            avgScore: 6.9,
            papers: 980,
            trend: '-0.2',
            lastUpdate: '1 giờ trước'
        },
        {
            subject: 'Anh',
            exams: 28,
            avgScore: 8.1,
            papers: 875,
            trend: '+0.5',
            lastUpdate: '30 phút trước'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Xin chào, Thầy/Cô!</h1>
                <p className="text-gray-600">
                    Đây là tổng quan hoạt động trong hệ thống của bạn
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <div className="flex items-baseline">
                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                        <span className={`ml-2 text-sm flex items-center ${
                                            stat.trend.startsWith('+')
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}>
                      {stat.trend}
                                            {stat.trend.startsWith('+')
                                                ? <ArrowUp className="h-3 w-3 ml-0.5" />
                                                : <ArrowDown className="h-3 w-3 ml-0.5" />
                                            }
                    </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.description}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Hoạt động gần đây
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="mt-1">
                                        {activity.type === 'exam_graded' && (
                                            <FileText className="h-5 w-5 text-blue-500" />
                                        )}
                                        {activity.type === 'web_deployed' && (
                                            <Rocket className="h-5 w-5 text-green-500" />
                                        )}
                                        {activity.type === 'exam_mixed' && (
                                            <FileText className="h-5 w-5 text-purple-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{activity.title}</p>
                                        <p className="text-sm text-gray-600">{activity.details}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                            <p className="text-xs text-gray-600">{activity.extraInfo}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Subject Stats */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Thống kê theo môn học
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {subjectStats.map((subject, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium flex items-center gap-2">
                                            {subject.subject}
                                            <span className={`text-sm flex items-center ${
                                                subject.trend.startsWith('+')
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}>
                        {subject.trend}
                                                {subject.trend.startsWith('+')
                                                    ? <ArrowUp className="h-3 w-3 ml-0.5" />
                                                    : <ArrowDown className="h-3 w-3 ml-0.5" />
                                                }
                      </span>
                                        </h4>
                                        <span className="text-sm text-gray-600">
                      {subject.papers} bài
                    </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Số đề thi</p>
                                            <p className="font-medium">{subject.exams} đề</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Điểm trung bình</p>
                                            <p className="font-medium">{subject.avgScore}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Cập nhật: {subject.lastUpdate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HomePage;