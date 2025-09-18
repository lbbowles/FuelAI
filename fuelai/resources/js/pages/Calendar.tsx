import { Head } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';

// To DO:
// Create the calendar (maybe use some open source software)
// Send data to database
// Pull from other parts to show on the calendar
// Add Gradients to keep it consist

export default function Calendar() {
    return (
        <>
            {/* Template for an outline box */}
            <Head title="Calendar">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                            <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
