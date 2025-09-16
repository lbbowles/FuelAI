import { Head } from '@inertiajs/react';
import Navbar from '@/components/navbar';


export default function Calendar() {
    return (
        <>
            {/* Template for an outline box */}
            <Head title="Calendar">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                            <h1 className="text-2xl font-semibold text-gray-900">ADMIN</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
