import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { route } from 'ziggy-js';

interface Stats {
    totalUsers: number;
    totalRecipes: number;
    totalThreads: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(route('admin.dashboard.index'))
            .then(response => {
                setStats(response.data.data);
            })
            .catch(err => {
                setError('Failed to fetch dashboard statistics. Are you logged in as an admin?');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AppLayout>
            <Head>
                <title>Admin Dashboard</title>
            </Head>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>

                {error && <p className="text-red-500">{error}</p>}
                {loading && <p>Loading statistics...</p>}

                {stats && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Recipes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalRecipes}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Forum Threads</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalThreads}</div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
