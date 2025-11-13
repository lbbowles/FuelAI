import { Head } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FormEvent, useEffect, useState } from 'react';
import {
    Users,
    FileText,
    MessageSquare,
    ShieldAlert,
    Trash2,
    Pencil,
} from 'lucide-react';

interface AppStats {
    userCount: number;
    postCount: number;
    replyCount: number;
}

interface AdminUser {
    id: number;
    username: string | null;
    email: string;
    role: string | null;
    created_at: string;
}

interface ForumPostSummary {
    id: number;
    title: string;
    content: string;
    author: string;
}

interface ForumReplySummary {
    id: number;
    content: string;
    author: string;
    original_post_title: string;
}

interface EditFormState {
    username: string;
    email: string;
    role: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AppStats | null>(null);
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [posts, setPosts] = useState<ForumPostSummary[]>([]);
    const [replies, setReplies] = useState<ForumReplySummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<EditFormState>({
        username: '',
        email: '',
        role: 'user',
    });
    const [savingEdit, setSavingEdit] = useState(false);

    // pagination state for Users table
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

    const csrfToken =
        (document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') as string | null) ?? '';

    useEffect(() => {
        const loadAdminData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [statsRes, usersRes, postsRes, repliesRes] =
                    await Promise.all([
                        fetch('/admin/stats'),
                        fetch('/admin/users'),
                        fetch('/admin/forum-posts'),
                        fetch('/admin/forum-replies'),
                    ]);

                if (
                    !statsRes.ok ||
                    !usersRes.ok ||
                    !postsRes.ok ||
                    !repliesRes.ok
                ) {
                    throw new Error('Failed to load admin data');
                }

                const statsJson: AppStats = await statsRes.json();
                const usersJson: AdminUser[] = await usersRes.json();
                const postsJson: ForumPostSummary[] = await postsRes.json();
                const repliesJson: ForumReplySummary[] =
                    await repliesRes.json();

                setStats(statsJson);
                setUsers(usersJson);
                setPosts(postsJson);
                setReplies(repliesJson);
            } catch (err) {
                setError('Failed to load admin data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadAdminData();
    }, []);

    // keep currentPage in range when users length changes (e.g., after delete)
    useEffect(() => {
        const newTotalPages = Math.max(1, Math.ceil(users.length / pageSize));
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
        }
    }, [users.length, currentPage, pageSize]);

    const handleDeleteUser = async (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const res = await fetch(`/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                alert(data?.error ?? 'Failed to delete user.');
                return;
            }

            setUsers((prev) => prev.filter((u) => u.id !== id));

            if (editingUserId === id) {
                setEditingUserId(null);
            }
        } catch (err) {
            alert('Something went wrong while deleting the user.');
        }
    };

    const handleDeletePost = async (id: number) => {
        if (!confirm('Delete this forum post and its replies?')) {
            return;
        }

        try {
            const res = await fetch(`/admin/forum-posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                alert('Failed to delete forum post.');
                return;
            }

            setPosts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            alert('Something went wrong while deleting the forum post.');
        }
    };

    const handleDeleteReply = async (id: number) => {
        if (!confirm('Delete this reply?')) {
            return;
        }

        try {
            const res = await fetch(`/admin/forum-replies/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                alert('Failed to delete reply.');
                return;
            }

            setReplies((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            alert('Something went wrong while deleting the reply.');
        }
    };

    const startEditingUser = (user: AdminUser) => {
        setEditingUserId(user.id);
        setEditForm({
            username: user.username ?? '',
            email: user.email,
            role: user.role ?? 'user',
        });
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setEditForm({
            username: '',
            email: '',
            role: 'user',
        });
    };

    const handleEditInputChange = (
        field: keyof EditFormState,
        value: string,
    ) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();
        if (editingUserId === null) return;

        setSavingEdit(true);

        try {
            const res = await fetch(`/admin/users/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    username: editForm.username,
                    email: editForm.email,
                    role: editForm.role,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                const message =
                    data?.message ||
                    data?.error ||
                    'Failed to update user.';
                alert(message);
                return;
            }

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === editingUserId
                        ? {
                            ...user,
                            username: editForm.username,
                            email: editForm.email,
                            role: editForm.role,
                        }
                        : user,
                ),
            );

            cancelEditing();
        } catch (err) {
            alert('Something went wrong while updating the user.');
        } finally {
            setSavingEdit(false);
        }
    };

    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString();

    const truncated = (text: string, max = 80) =>
        text.length > max ? `${text.slice(0, max - 3)}...` : text;

    const isLoadingStats = loading && !stats;
    const currentlyEditingUser =
        editingUserId !== null
            ? users.find((u) => u.id === editingUserId) ?? null
            : null;

    return (
        <>
            <Head title="Admin Dashboard">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>

            <NavbarTop />

            <div className="bg-base-200 min-h-screen">
                <div className="p-4 pt-32 lg:pt-32 space-y-6 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Admin Dashboard
                            </h1>
                            <p className="mt-1 text-sm text-base-content/60">
                                Manage users and moderate forum activity.
                            </p>
                        </div>

                        {loading && (
                            <span className="text-xs text-base-content/60">
                                Loading admin data…
                            </span>
                        )}
                    </div>

                    {error && (
                        <div className="alert alert-error shadow-lg text-sm">
                            <ShieldAlert className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Application Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Users
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {isLoadingStats
                                                ? '...'
                                                : stats?.userCount ?? 0}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Forum Posts
                                        </CardTitle>
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {isLoadingStats
                                                ? '...'
                                                : stats?.postCount ?? 0}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Forum Replies
                                        </CardTitle>
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {isLoadingStats
                                                ? '...'
                                                : stats?.replyCount ?? 0}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Users</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    View, edit, and delete users.
                                </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Total: {users.length}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {users.length === 0 && !loading ? (
                                <p className="text-sm text-muted-foreground">
                                    No users found.
                                </p>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead className="border-b text-xs uppercase text-muted-foreground">
                                            <tr>
                                                <th className="py-2 pr-4 text-left">
                                                    User
                                                </th>
                                                <th className="py-2 pr-4 text-left">
                                                    Email
                                                </th>
                                                <th className="py-2 pr-4 text-left">
                                                    Role
                                                </th>
                                                <th className="py-2 pr-4 text-left">
                                                    Created
                                                </th>
                                                <th className="py-2 text-right">
                                                    Actions
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {paginatedUsers.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b last:border-0"
                                                >
                                                    <td className="py-2 pr-4">
                                                        <div className="font-medium">
                                                            {user.username ||
                                                                '(no username)'}
                                                        </div>
                                                    </td>
                                                    <td className="py-2 pr-4 text-base-content/80">
                                                        {user.email}
                                                    </td>
                                                    <td className="py-2 pr-4">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                    user.role ===
                                                                    'admin'
                                                                        ? 'bg-red-100 text-red-800'
                                                                        : 'bg-emerald-100 text-emerald-800'
                                                                }`}
                                                            >
                                                                {user.role ??
                                                                    'user'}
                                                            </span>
                                                    </td>
                                                    <td className="py-2 pr-4 text-xs text-base-content/60">
                                                        {formatDate(
                                                            user.created_at,
                                                        )}
                                                    </td>
                                                    <td className="py-2 text-right space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                startEditingUser(
                                                                    user,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-md border border-base-300 px-2 py-1 text-xs hover:bg-base-200 transition-colors"
                                                        >
                                                            <Pencil className="h-3 w-3" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user.id,
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-md border border-base-300 px-2 py-1 text-xs text-error hover:bg-error hover:text-error-content transition-colors"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                        {users.length > 0 && (
                                            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                                <span>
                                                    Showing{' '}
                                                    {startIndex + 1}–
                                                    {Math.min(
                                                        startIndex + pageSize,
                                                        users.length,
                                                    )}{' '}
                                                    of {users.length} users
                                                </span>

                                                <div className="join">
                                                    <button
                                                        type="button"
                                                        className="btn btn-xs join-item"
                                                        disabled={
                                                            currentPage === 1
                                                        }
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                (p) =>
                                                                    Math.max(
                                                                        1,
                                                                        p - 1,
                                                                    ),
                                                            )
                                                        }
                                                    >
                                                        Previous
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-xs join-item"
                                                        disabled={
                                                            currentPage ===
                                                            totalPages
                                                        }
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                (p) =>
                                                                    Math.min(
                                                                        totalPages,
                                                                        p + 1,
                                                                    ),
                                                            )
                                                        }
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {currentlyEditingUser && (
                                        <div className="mt-6 border-t pt-4">
                                            <h3 className="text-sm font-semibold mb-2">
                                                Edit User:{' '}
                                                {currentlyEditingUser.username ||
                                                    currentlyEditingUser.email}
                                            </h3>
                                            <form
                                                onSubmit={handleUpdateUser}
                                                className="grid gap-3 md:grid-cols-3 items-end"
                                            >
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Username
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        value={
                                                            editForm.username
                                                        }
                                                        onChange={(e) =>
                                                            handleEditInputChange(
                                                                'username',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Email
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="input input-bordered w-full"
                                                        value={editForm.email}
                                                        onChange={(e) =>
                                                            handleEditInputChange(
                                                                'email',
                                                                e.target
                                                                    .value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Role
                                                        </span>
                                                    </label>
                                                    <select
                                                        className="select select-bordered w-full"
                                                        value={editForm.role}
                                                        onChange={(e) =>
                                                            handleEditInputChange(
                                                                'role',
                                                                e.target
                                                                    .value,
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="user">
                                                            User
                                                        </option>
                                                        <option value="admin">
                                                            Admin
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="flex gap-2 md:col-span-3 justify-end mt-2">
                                                    <button
                                                        type="button"
                                                        onClick={cancelEditing}
                                                        className="btn btn-ghost btn-sm"
                                                        disabled={savingEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm"
                                                        disabled={savingEdit}
                                                    >
                                                        {savingEdit
                                                            ? 'Saving...'
                                                            : 'Save Changes'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Forum Posts</CardTitle>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Recent threads created by users.
                                    </p>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Total: {posts.length}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {posts.length === 0 && !loading ? (
                                    <p className="text-sm text-muted-foreground">
                                        No forum posts found.
                                    </p>
                                ) : (
                                    <ul className="space-y-3">
                                        {posts.slice(0, 8).map((post) => (
                                            <li
                                                key={post.id}
                                                className="flex items-start justify-between gap-3 border-b pb-2 last:border-0 last:pb-0"
                                            >
                                                <div>
                                                    <div className="text-sm font-semibold">
                                                        {post.title}
                                                    </div>
                                                    <div className="mt-1 text-xs text-base-content/60">
                                                        by {post.author}
                                                    </div>
                                                    <p className="mt-1 text-xs text-base-content/70">
                                                        {truncated(
                                                            post.content,
                                                            120,
                                                        )}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeletePost(
                                                            post.id,
                                                        )
                                                    }
                                                    className="mt-1 inline-flex items-center gap-1 rounded-md border border-base-300 px-2 py-1 text-xs text-error hover:bg-error hover:text-error-content transition-colors"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Forum Replies</CardTitle>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Latest replies across all threads.
                                    </p>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Total: {replies.length}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {replies.length === 0 && !loading ? (
                                    <p className="text-sm text-muted-foreground">
                                        No replies found.
                                    </p>
                                ) : (
                                    <ul className="space-y-3">
                                        {replies.slice(0, 8).map((reply) => (
                                            <li
                                                key={reply.id}
                                                className="flex items-start justify-between gap-3 border-b pb-2 last:border-0 last:pb-0"
                                            >
                                                <div>
                                                    <div className="text-sm font-medium">
                                                        Reply by{' '}
                                                        {reply.author}
                                                    </div>
                                                    <div className="mt-1 text-xs text-base-content/60">
                                                        on “
                                                        {
                                                            reply.original_post_title
                                                        }
                                                        ”
                                                    </div>
                                                    <p className="mt-1 text-xs text-base-content/70">
                                                        {truncated(
                                                            reply.content,
                                                            120,
                                                        )}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteReply(
                                                            reply.id,
                                                        )
                                                    }
                                                    className="mt-1 inline-flex items-center gap-1 rounded-md border border-base-300 px-2 py-1 text-xs text-error hover:bg-error hover:text-error-content transition-colors"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
