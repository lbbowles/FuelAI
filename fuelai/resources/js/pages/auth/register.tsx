import { useState } from 'react';
import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavbarTop from '@/components/navbar';

export default function Register() {

    // Image preview state
   const [preview, setPreview] = useState<string | null>(null);


    // Handle preview
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (!file) {
        setPreview(null);
        return;
    }

    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
        const result = ev.target?.result;

        if (typeof result === "string") {
            setPreview(result);
        }
    };

    reader.readAsDataURL(file);
}


    return (
        <>
            <Head title="Register">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="mt-16 pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                        <div className="w-full max-w-md">

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h1>
                                <p className="text-gray-600">
                                    Join us and start planning your meals today
                                </p>
                            </div>

                            {/* Register Card */}
                            <div className="card bg-white shadow-lg">
                                <div className="card-body p-8">

                                    <Form
                                        {...RegisteredUserController.store.form()}
                                        method="post"
                                        enctype="multipart/form-data"
                                        resetOnSuccess={['password', 'password_confirmation']}
                                        disableWhileProcessing
                                        className="space-y-6"
                                    >
                                        {({ processing, errors }) => (
                                            <>

                                                {/* Name Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="username" className="text-gray-700 font-semibold">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="username"
                                                        type="text"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="username"
                                                        name="username"
                                                        placeholder="Enter your full name"
                                                        className="w-full"
                                                    />
                                                    <InputError message={errors.username} />
                                                </div>

                                                {/* Email Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                                                        Email address
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="email"
                                                        name="email"
                                                        placeholder="email@example.com"
                                                        className="w-full"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>

                                                {/* Password Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="password" className="text-gray-700 font-semibold">
                                                        Password
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        required
                                                        tabIndex={3}
                                                        autoComplete="new-password"
                                                        name="password"
                                                        placeholder="Create a strong password"
                                                        className="w-full"
                                                    />
                                                    <InputError message={errors.password} />
                                                </div>

                                                {/* Confirm Password Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="password_confirmation" className="text-gray-700 font-semibold">
                                                        Confirm password
                                                    </Label>
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        required
                                                        tabIndex={4}
                                                        autoComplete="new-password"
                                                        name="password_confirmation"
                                                        placeholder="Re-enter your password"
                                                        className="w-full"
                                                    />
                                                    <InputError message={errors.password_confirmation} />
                                                </div>

                                                {/* Hidden Role Input - Locked to "user" */}
                                                <input
                                                    type="hidden"
                                                    name="role"
                                                    value="user"
                                                />

                                                {/* Profile Image Upload */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="image" className="text-gray-700 font-semibold">
                                                        Profile Image
                                                    </Label>

                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        tabIndex={6}
                                                        onChange={handleImageChange}
                                                        className="w-full"
                                                    />
                                                    <InputError message={errors.image} />

                                                    {/* Image Preview */}
                                                    {preview && (
                                                        <div className="mt-3">
                                                            <img
                                                                src={preview}
                                                                alt="Preview"
                                                                className="w-32 h-32 rounded-full object-cover border shadow"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
                                                    tabIndex={7}
                                                    disabled={processing}
                                                >
                                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                    Create account
                                                </button>

                                                {/* Login Link */}
                                                <div className="text-center pt-4 border-t border-gray-200">
                                                    <p className="text-sm text-gray-600">
                                                        Already have an account?{' '}
                                                        <TextLink
                                                            href={login()}
                                                            tabIndex={8}
                                                            className="text-blue-600 hover:text-blue-700 font-semibold"
                                                        >
                                                            Log in
                                                        </TextLink>
                                                    </p>
                                                </div>

                                            </>
                                        )}
                                    </Form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
