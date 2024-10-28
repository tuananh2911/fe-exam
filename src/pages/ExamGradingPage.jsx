import React, { useState, useRef } from 'react';
import { Camera, Upload, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';

const ExamGradingPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const [isMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    // Xử lý khi chọn file
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError("Vui lòng chỉ upload file ảnh");
                return;
            }
            setError('');
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // Xử lý chụp ảnh từ camera (mobile only)
    const handleCameraCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Xử lý stream camera ở đây
        } catch (err) {
            setError("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hướng dẫn */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        Hướng dẫn chấm bài
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium mb-2">Cách chụp ảnh bài thi:</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Đặt bài thi trên mặt phẳng, đủ ánh sáng</li>
                            <li>Căn chỉnh bài thi thẳng với khung hình</li>
                            <li>Đảm bảo ảnh rõ nét, không bị mờ</li>
                            <li>Chụp toàn bộ phiếu trả lời trong một khung hình</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Card className="flex-1">
                            <CardContent className="p-4">
                                <h4 className="font-medium mb-2">Bài thi đạt yêu cầu</h4>
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Ảnh mẫu đạt yêu cầu"
                                    className="w-full rounded-lg"
                                />
                            </CardContent>
                        </Card>

                        <Card className="flex-1">
                            <CardContent className="p-4">
                                <h4 className="font-medium mb-2">Bài thi không đạt yêu cầu</h4>
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Ảnh mẫu không đạt yêu cầu"
                                    className="w-full rounded-lg"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Upload Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Tải lên bài thi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Image Preview */}
                        {selectedImage && (
                            <div className="relative w-full max-w-2xl mx-auto">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    aria-label="Remove image"
                                >
                                    <span className="text-lg leading-none">&times;</span>
                                </button>
                            </div>
                        )}

                        {/* Upload Options */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Upload from Device */}
                            <Button
                                variant="outline"
                                className="h-32 flex flex-col items-center justify-center gap-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-8 w-8" />
                                <span>Tải lên từ thiết bị</span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    className="hidden"
                                    capture={isMobile ? "environment" : undefined}
                                />
                            </Button>

                            {/* Camera Capture (Mobile Only) */}
                            {isMobile && (
                                <Button
                                    variant="outline"
                                    className="h-32 flex flex-col items-center justify-center gap-2"
                                    onClick={handleCameraCapture}
                                >
                                    <Camera className="h-8 w-8" />
                                    <span>Chụp ảnh mới</span>
                                </Button>
                            )}
                        </div>

                        {/* Process Button */}
                        {selectedImage && (
                            <Button
                                className="w-full"
                                disabled={loading}
                                onClick={() => setLoading(true)}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        <span>Đang xử lý...</span>
                                    </div>
                                ) : (
                                    'Chấm bài'
                                )}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExamGradingPage;