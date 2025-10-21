import { Head } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import FeaturesSectionDemo from '@/components/features-section-demo-3'


// Aceternity

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
