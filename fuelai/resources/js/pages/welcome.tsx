import { Head, Link } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import FeaturesSectionDemo from '@/components/features-section-demo-3'


// To Do:
// Get rid of placeholder data
// Make the data consistent between pages
// Add in a login feature / register feature
// Expand on the page so it looks better
// Add Gradients to keep it consist
// https://daisyui.com/components/

export default function Welcome() {

    return (
        <>
            <Head title="FuelAI">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>

            <NavbarTop />
            <FeaturesSectionDemo />
        </>
    );
}
