import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NavbarTop from '@/components/navbar';
import { register } from '@/routes';
import { store as loginStore } from '@/routes/login';
import { request } from '@/routes/password';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(loginStore.url(), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="min-h-screen bg-base-200 pt-32 lg:pt-32">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                        <div className="w-full max-w-md">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                                <p className="text-gray-600">
                                    Log in to access your meal planning dashboard
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

                            {/* Login Card */}
                            <div className="card bg-white shadow-lg">
                                <div className="card-body p-8">
                                    <form onSubmit={submit} className="space-y-6">
                                        {/* Email Input */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-700 font-semibold">
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="w-full"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Password Input */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="text-gray-700 font-semibold">
                                                    Password
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-sm text-blue-600 hover:text-blue-700"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                className="w-full"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        {/* Remember Me */}
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={data.remember}
                                                onCheckedChange={(checked) => setData('remember', checked as boolean)}
                                                tabIndex={3}
                                            />
                                            <Label htmlFor="remember" className="text-gray-700 cursor-pointer">
                                                Remember me for 30 days
                                            </Label>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            tabIndex={4}
                                            disabled={processing}
                                        >
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                            Log in
                                        </Button>

                                        {/* Sign Up Link */}
                                        <div className="text-center pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600">
                                                Don't have an account?{' '}
                                                <TextLink
                                                    href={register()}
                                                    tabIndex={5}
                                                    className="text-blue-600 hover:text-blue-700 font-semibold"
                                                >
                                                    Sign up for free
                                                </TextLink>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
