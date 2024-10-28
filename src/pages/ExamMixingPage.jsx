import React, { useState, useRef } from 'react';
import {
    Upload,
    Download,
    FileText,
    AlertCircle,
    Shuffle,
    Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';

const ExamMixingPage = ({ onBack }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [numVariants, setNumVariants] = useState(4); // Số lượng mã đề
    const fileInputRef = useRef(null);

    // Xử lý khi chọn file
    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Kiểm tra định dạng file
        if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
            setError('Vui lòng chọn file CSV hoặc Excel');
            return;
        }

        setFile(selectedFile);
        setError('');

        // Đọc và hiển thị preview
        try {
            if (selectedFile.name.endsWith('.csv')) {
                const text = await selectedFile.text();
                const lines = text.split('\n').slice(0, 6); // Hiển thị 5 dòng đầu
                setPreview(lines.join('\n'));
            } else {
                setPreview('Xem trước không khả dụng cho file Excel');
            }
        } catch (err) {
            setError('Không thể đọc file. Vui lòng kiểm tra lại.');
        }
    };

    // Tạo và tải về file mẫu
    const downloadTemplate = () => {
        const template = `STT,Câu hỏi,Đáp án A,Đáp án B,Đáp án C,Đáp án D,Đáp án đúng
1,Câu hỏi mẫu 1,Lựa chọn A1,Lựa chọn B1,Lựa chọn C1,Lựa chọn D1,A
2,Câu hỏi mẫu 2,Lựa chọn A2,Lựa chọn B2,Lựa chọn C2,Lựa chọn D2,B
3,Câu hỏi mẫu 3,Lựa chọn A3,Lựa chọn B3,Lựa chọn C3,Lựa chọn D3,C`;

        const blob = new Blob([template], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'template_de_thi.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleImport = async () => {
        if (!file) return;

        setLoading(true);
        try {
            // Giả lập xử lý file
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Trộn đề thành công!');
        } catch (err) {
            setError('Có lỗi xảy ra khi xử lý. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hướng dẫn */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Hướng dẫn trộn đề
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium mb-2">Yêu cầu file:</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>File CSV hoặc Excel (.xlsx)</li>
                            <li>Đúng format theo file mẫu</li>
                            <li>Mỗi câu hỏi một dòng</li>
                            <li>Đáp án đúng phải là một trong các đáp án (A, B, C, D)</li>
                        </ul>
                    </div>

                    <Button
                        variant="outline"
                        onClick={downloadTemplate}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Tải file mẫu
                    </Button>
                </CardContent>
            </Card>

            {/* Upload Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Import đề thi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Upload Area */}
                        <div
                            className="border-2 border-dashed rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept=".csv,.xlsx"
                                className="hidden"
                            />
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <div className="text-sm text-gray-600">
                                <span className="font-medium text-blue-600">Click để chọn file</span> hoặc kéo thả file vào đây
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                Chấp nhận file CSV hoặc Excel (.xlsx)
                            </div>
                        </div>

                        {file && (
                            <div className="space-y-4">
                                {/* File Info */}
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                                    <FileText className="h-5 w-5 text-gray-500" />
                                    <span className="text-sm">{file.name}</span>
                                </div>

                                {/* Preview */}
                                {preview && (
                                    <div className="p-4 bg-gray-50 rounded overflow-x-auto">
                                        <h4 className="text-sm font-medium mb-2">Xem trước:</h4>
                                        <pre className="text-xs">{preview}</pre>
                                    </div>
                                )}

                                {/* Options */}
                                <Card>
                                    <CardContent className="p-4">
                                        <h4 className="font-medium mb-4">Tùy chọn trộn đề</h4>
                                        <div className="space-y-4">
                                            {/* Số lượng mã đề */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Số lượng mã đề
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => setNumVariants(Math.max(1, numVariants - 1))}
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="w-12 text-center">{numVariants}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => setNumVariants(numVariants + 1)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Generate Button */}
                                <Button
                                    onClick={handleImport}
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            <span>Đang xử lý...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Shuffle className="h-4 w-4" />
                                            <span>Tạo {numVariants} mã đề</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExamMixingPage;