import { Head, router, usePage } from "@inertiajs/react";
import NavbarTop from "@/components/navbar";
import { useState, ChangeEvent } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    image_base64?: string | null;
    created_at: string;
}

export default function Profile() {
    const { auth } = usePage().props as any;
    const user: User = auth.user;

    const [showEditModal, setShowEditModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Handle image selection
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    // Profile picture fallback
    const profilePic = user.image_base64
        ? user.image_base64
        : "https://ui-avatars.com/api/?background=random&name=" +
          encodeURIComponent(user.username);

    // Save user info (username, email, password)
    const saveUserInfo = () => {
        router.post(
            `/profile/update`,
            {
                username,
                email,
                password: password || undefined,
                password_confirmation: passwordConfirm || undefined,
            },
            {
                onSuccess: () => {
                    setShowEditModal(false);
                    setPassword("");
                    setPasswordConfirm("");
                },
            }
        );
    };

    // Save profile image (FormData)
    const saveProfileImage = () => {
        if (!image) {
            console.error("No file selected");
            return;
        }

        const fd = new FormData();
        fd.append("username", username);
        fd.append("email", email);
        fd.append("image", image);

        router.post("/profile/update", fd, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowImageModal(false);
                setImage(null);
                setPreview(null);
            },
            onError: (err) => console.error(err),
        });
    };

    return (
        <>
            <Head title="Profile" />
            <NavbarTop />

            <div className="max-w-3xl mx-auto p-6 pt-38">

                <h1 className="text-4xl font-bold mb-6 text-center">Your Profile</h1>

                {/* Main Profile Card */}
                <div className="card bg-base-100 shadow-xl p-6">

                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={preview || profilePic}
                            className="w-32 h-32 rounded-full object-cover border shadow"
                        />
                        <button
                            className="btn btn-sm btn-outline mt-3"
                            onClick={() => setShowImageModal(true)}
                        >
                            Change Picture
                        </button>
                    </div>

                    {/* User Details */}
                    <div className="space-y-2">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary" onClick={() => setShowEditModal(true)}>
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Profile Info Modal */}
            <div className={`modal ${showEditModal ? "modal-open" : ""}`}>
                <div className="modal-box max-w-xl">

                    <h3 className="font-bold text-2xl mb-6">Edit Profile</h3>

                    {/* GRID: Username + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Username */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Username</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Password Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">New Password</label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Leave blank to keep current"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Confirm Password</label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="modal-action mt-8">
                        <button className="btn btn-ghost" onClick={() => setShowEditModal(false)}>
                            Cancel
                        </button>

                        <button className="btn btn-primary" onClick={saveUserInfo}>
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>

            {/* Edit Profile Image Modal */}
            <div className={`modal ${showImageModal ? "modal-open" : ""}`}>
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-xl mb-4">Update Profile Picture</h3>

                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        onChange={handleImageChange}
                    />

                    {preview && (
                        <img
                            src={preview}
                            className="w-32 h-32 rounded-full mx-auto mt-4 object-cover border shadow"
                        />
                    )}

                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={() => setShowImageModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={saveProfileImage}>
                            Save Image
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}
