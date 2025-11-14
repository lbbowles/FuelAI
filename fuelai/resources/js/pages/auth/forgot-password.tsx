// Components
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavbarTop from '@/components/navbar';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                        <div className="w-full max-w-md">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                                <p className="text-gray-600">
                                    No worries! Enter your email and we'll send you a reset link
                                </p>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div className="card bg-green-50 shadow-lg mb-6">
                                    <div className="card-body p-4">
                                        <p className="text-center text-sm font-medium text-green-600">{status}</p>
                                    </div>
                                </div>
                            )}

                            {/* Forgot Password Card */}
                            <div className="card bg-white shadow-lg">
                                <div className="card-body p-8">
                                    <Form {...PasswordResetLinkController.store.form()} className="space-y-6">
                                        {({ processing, errors }) => (
                                            <>
                                                {/* Email Input */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                                                        Email address
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        autoComplete="email"
                                                        autoFocus
                                                        placeholder="email@example.com"
                                                        className="w-full"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
                                                    disabled={processing}
                                                >
                                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                    Email password reset link
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
