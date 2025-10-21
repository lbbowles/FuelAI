import { Head } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState, ChangeEvent, DragEvent } from 'react';

interface ApiResponse {
    field1?: string;
    field2?: string;
    [key: string]: any;
}

export default function ImageRecognition() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setSelectedFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(null);
        }
        setApiResponse(null); // reset previous result
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] ?? null;
        setSelectedFile(file);
        if (file) setPreviewUrl(URL.createObjectURL(file));
        setApiResponse(null);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleAnalyzeImage = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setApiResponse(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);


            const response = await fetch('https://web-production-c0e3d.up.railway.app/predict_food', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setApiResponse(data);
        } catch (err) {
            console.error(err);
            setApiResponse({ error: 'Error processing image' });
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setApiResponse(null);
    };

    return (
        <>
            <Head title="Quick Food Log" />
            <NavbarTop />

            <div className="max-w-3xl mx-auto p-6 pt-70">
                <h1 className="text-4xl font-bold mb-2 text-center">Fuel Recognition</h1>
                <p className="text-center text-base-content/70 mb-6">
                    Use our smart food recognition feature to quickly log your meals. Simply upload a photo and we’ll pre-fill the form for you!
                </p>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-primary rounded-lg p-4 text-center cursor-pointer bg-base-100 hover:bg-base-200 transition-colors mb-4"
                >
                    <p className="mb-2 text-sm text-base-content/70">
                        Drag & drop a photo of your food, or click below to select a file
                    </p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full max-w-xs mx-auto mt-2"
                    />
                </div>

                {previewUrl && (
                    <div className="mb-4 flex flex-col items-center">
                        <img src={previewUrl} alt="Preview" className="max-w-xs rounded border mb-4" />
                        <div className="flex gap-4">
                            <button
                                onClick={handleAnalyzeImage}
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? 'Analyzing...' : 'Log This Meal'}
                            </button>
                            <button onClick={handleClear} className="btn btn-secondary">
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {apiResponse?.predictions && (
                    <div className="mt-6 p-4 bg-base-200 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Detected Foods</h2>
                        <ul className="space-y-2">
                            {apiResponse.predictions.map((item: any, index: number) => (
                                <li key={index} className="flex justify-between border-b border-base-300 pb-1">
                                    <span className="capitalize">{item.label.replace(/_/g, ' ')}</span>
                                    <span className="text-sm text-gray-500">
                                        {(item.confidence * 100).toFixed(2)}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}