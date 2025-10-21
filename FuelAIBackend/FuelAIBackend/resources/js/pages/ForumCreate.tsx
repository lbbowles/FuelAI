import { Head, Link, useForm } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState, FormEvent } from 'react';

interface Forum {
    id: number;
    name: string;
    description: string | null;
}

interface ForumCreateProps {
    forums: Forum[];
}

interface FormData {
    title: string;
    content: string;
    forum_id: string;
}

export default function ForumCreate({ forums }: ForumCreateProps) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: '',
        content: '',
        forum_id: ''
    });

    const [charCount, setCharCount] = useState<number>(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Form submitted');
        console.log('Data:', data);
        console.log('Errors:', errors);

        post('/forums', {
            onSuccess: () => {
                console.log('Success!');
            },
            onError: (errors) => {
                console.log('Errors:', errors);
            }
        });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setData('content', content);
        setCharCount(content.length);
    };

    return (
        <>
            <Head title="Create Forum Post">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="mt-16 pt-16 min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create a Forum
                        </h1>
                        <p className="text-gray-600">
                            Write down a forum and your contents here!
                        </p>
                    </div>

                    {/* Form */}
                    <div className="card bg-white shadow-lg">
                        <div className="card-body p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Category Selection */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base">
                                            Select a Category <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <select
                                        value={data.forum_id}
                                        onChange={(e) => setData('forum_id', e.target.value)}
                                        className={`select select-bordered w-full ${
                                            errors.forum_id ? 'select-error' : ''
                                        }`}
                                        disabled={processing}
                                    >
                                        <option value="">Category</option>
                                        {forums.map((forum) => (
                                            <option key={forum.id} value={forum.id}>
                                                {forum.name}
                                                {forum.description && ` - ${forum.description}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.forum_id && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.forum_id}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                {/* Title */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base">
                                            Title <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={`input input-bordered w-full ${
                                            errors.title ? 'input-error' : ''
                                        }`}
                                        disabled={processing}
                                        maxLength={255}
                                    />
                                    <label className="label">
                                        {errors.title ? (
                                            <span className="label-text-alt text-error">
                                                {errors.title}
                                            </span>
                                        ) : (
                                            <span className="label-text-alt text-gray-500">
                                                {data.title.length}/255
                                            </span>
                                        )}
                                    </label>
                                </div>

                                {/* Content */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base">
                                            Content <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <textarea
                                        placeholder="Write down your content here!"
                                        value={data.content}
                                        onChange={handleContentChange}
                                        className={`textarea textarea-bordered w-full h-64 ${
                                            errors.content ? 'textarea-error' : ''
                                        }`}
                                        disabled={processing}
                                    />
                                    <label className="label">
                                        {errors.content ? (
                                            <span className="label-text-alt text-error">
                                                {errors.content}
                                            </span>
                                        ) : (
                                            <span className="label-text-alt text-gray-500">
                                                {charCount} {'Word Count'}
                                            </span>
                                        )}
                                    </label>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 justify-end pt-4">
                                    <Link
                                        href="/forums"
                                        className="btn btn-ghost"
                                    >
                                        Back
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                Submitting
                                            </>
                                        ) : (
                                            <>
                                                Publish Forum
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}
