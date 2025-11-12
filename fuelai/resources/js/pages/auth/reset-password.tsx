import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavbarTop from '@/components/navbar';
import { login } from '@/routes';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <>
            <Head title="Reset password">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="mt-16 pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                        <div className="w-full max-w-md">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
                                <p className="text-gray-600">
                                    Enter your new password below to regain access to your account
                                </p>
                            </div>

                            {/* Reset Password Card */}
                            <div className="card bg-white shadow-lg">
                                <div className="card-body p-8">
                                    <Form
                                        {...NewPasswordController.store.form()}
                                        transform={(data) => ({ ...data, token, email })}
                                        resetOnSuccess={['password', 'password_confirmation']}
                                        className="space-y-6"
                                    >
                                        {({ processing, errors }) => (
                                            <>
                                                {/* Email Input (Read-only) */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                                                        Email address
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
                                                        value={email}
                                                        className="w-full bg-gray-50"
                                                        readOnly
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>

                                                {/* New Password Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="password" className="text-gray-700 font-semibold">
                                                        New Password
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        autoComplete="new-password"
                                                        className="w-full"
                                                        autoFocus
                                                        placeholder="Enter your new password"
                                                    />
                                                    <InputError message={errors.password} />
                                                </div>

                                                {/* Confirm Password Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="password_confirmation" className="text-gray-700 font-semibold">
                                                        Confirm New Password
                                                    </Label>
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        name="password_confirmation"
                                                        autoComplete="new-password"
                                                        className="w-full"
                                                        placeholder="Re-enter your new password"
                                                    />
                                                    <InputError message={errors.password_confirmation} />
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
                                                    disabled={processing}
                                                >
                                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                    Reset password
                                                </button>

                                                {/* Back to Login Link */}
                                                <div className="text-center pt-4 border-t border-gray-200">
                                                    <p className="text-sm text-gray-600">
                                                        Remember your password?{' '}
                                                        <TextLink
                                                            href={login()}
                                                            className="text-blue-600 hover:text-blue-700 font-semibold"
                                                        >
                                                            Back to log in
                                                        </TextLink>
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-500">
                                    Choose a strong password with at least 8 characters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
