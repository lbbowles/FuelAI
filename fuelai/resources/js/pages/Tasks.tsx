import { Head } from '@inertiajs/react';
import NavbarTop from '@/components/navbar';
import { useState, FormEvent } from 'react';


// TO DO:
// Add in a description of tasks, that you can click on
// Add in deadline for tasks
// Move add tasks to be a popup window
// Connection with calendar


interface DatabaseTask {
    id: number;
    user_id: number;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert' | null;
    category: string | null;
    is_completed: boolean;
    deadline: string | null;
    created_at: string;
    updated_at: string;
}


interface TasksProps {
    tasks: DatabaseTask[];
    auth: {
        user: {
            id: number;
        }
    };
}

const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Education', 'Other'];



export default function Tasks({ tasks: initialTasks, auth }: TasksProps) {

    // Set initial states
    const [tasks, setTasks] = useState<DatabaseTask[]>(initialTasks);
    const [newTaskText, setNewTaskText] = useState('');
    const [newTaskDifficulty, setNewTaskDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('medium');
    const [newTaskCategory, setNewTaskCategory] = useState('General');
    const [newTaskDeadline, setNewTaskDeadline] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const completedCount = tasks.filter(task => task.is_completed).length;
    const pendingCount = tasks.filter(task => !task.is_completed).length;

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return !task.is_completed;
        if (filter === 'completed') return task.is_completed;
        return true;
    });

    const getDifficultyColor = (difficulty: string | null) => {
        switch (difficulty) {
            case 'expert': return 'text-error font-semibold';
            case 'hard': return 'text-warning font-semibold';
            case 'medium': return 'text-info font-medium';
            case 'easy': return 'text-success font-medium';
            default: return 'text-base-content/70';
        }
    };

    const isOverdue = (deadline: string | null) => {
        if (!deadline) return false;
        return new Date(deadline) < new Date();
    };

    const formatDeadline = (deadline: string | null) => {
        if (!deadline) return null;
        const date = new Date(deadline);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Reset time for comparison
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(date);
        deadlineDate.setHours(0, 0, 0, 0);

        if (deadlineDate.getTime() === today.getTime()) {
            return 'Today';
        } else if (deadlineDate.getTime() === tomorrow.getTime()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString();
        }
    };

    const handleAddTaskSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            (e.target as HTMLFormElement).submit();
        }
    };

    // Uses DaisyUI + Tailwind
    return (
        <>
            <Head title="Tasks">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <NavbarTop />

            <div className="drawer lg:drawer-open">
                <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-base-200 min-h-screen">
                    <div className="navbar bg-base-100 lg:hidden">
                        <div className="flex-none">
                            <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1">
                            <h1 className="normal-case text-xl">Tasks</h1>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="p-4 pt-32 lg:pt-32">
                    {/* Hero section*/}
                        <div className="hero bg-primary rounded-box mb-8">
                            <div className="hero-content text-center text-primary-content py-12">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Tasks</h1>
                                    <p className="mb-5">
                                        Stay productive and organized with your personal task manager
                                    </p>
                                    <div className="stats shadow stats-horizontal">
                                        <div className="stat bg-base-100/20 text-primary-content">
                                            <div className="stat-title text-primary-content/70">Total</div>
                                            <div className="stat-value text-2xl">{tasks.length}</div>
                                        </div>
                                        <div className="stat bg-base-100/20 text-primary-content">
                                            <div className="stat-title text-primary-content/70">Done</div>
                                            <div className="stat-value text-2xl">{completedCount}</div>
                                        </div>
                                        <div className="stat bg-base-100/20 text-primary-content">
                                            <div className="stat-title text-primary-content/70">Left</div>
                                            <div className="stat-value text-2xl">{pendingCount}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="tabs tabs-boxed bg-base-100 mb-6 p-1">
                            <button
                                onClick={() => setFilter('all')}
                                className={`tab flex-1 ${filter === 'all' ? 'tab-active' : ''}`}
                            >
                                All Tasks
                                <div className="badge badge-neutral badge-sm ml-2">{tasks.length}</div>
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`tab flex-1 ${filter === 'pending' ? 'tab-active' : ''}`}
                            >
                                Pending
                                <div className="badge badge-warning badge-sm ml-2">{pendingCount}</div>
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`tab flex-1 ${filter === 'completed' ? 'tab-active' : ''}`}
                            >
                                Completed
                                <div className="badge badge-success badge-sm ml-2">{completedCount}</div>
                            </button>
                        </div>

                        {/* Tasks */}
                        <div className="space-y-3">
                            {filteredTasks.length === 0 ? (
                                <div className="card bg-base-100 shadow-xl">
                                    <div className="card-body text-center py-16">
                                        <h3 className="text-2xl font-bold mb-2">No tasks here!</h3>
                                        <p className="text-base-content/60">
                                            {filter === 'all'
                                                ? 'Create your first task to get started'
                                                : `No ${filter} tasks at the moment`
                                            }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                filteredTasks.map(task => (
                                    <div key={task.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
                                        <div className="card-body">
                                            <div className="flex items-start gap-4">
                                                {/* Toggle completion form */}
                                                <form method="POST" action={`/tasks/${task.id}`}>
                                                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                                                    <input type="hidden" name="_method" value="PATCH" />
                                                    <input type="hidden" name="is_completed" value={task.is_completed ? '0' : '1'} />
                                                    <div className="form-control">
                                                        <label className="cursor-pointer label">
                                                            <input
                                                                type="checkbox"
                                                                checked={task.is_completed}
                                                                onChange={(e) => e.currentTarget.form?.submit()}
                                                                className="checkbox checkbox-primary checkbox-lg border-2 border-black"
                                                            />
                                                        </label>
                                                    </div>
                                                </form>

                                                <div className="flex-1">
                                                    <div className={`text-lg ${task.is_completed ? 'line-through opacity-60' : ''}`}>
                                                        {task.description}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                        {task.difficulty && (
                                                            <>
                                                                <div className={`text-sm ${getDifficultyColor(task.difficulty)}`}>
                                                                    {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                                                                </div>
                                                                <span className="text-base-content/50">•</span>
                                                            </>
                                                        )}
                                                        {task.category && (
                                                            <>
                                                                <div className="text-sm text-base-content/70">
                                                                    {task.category}
                                                                </div>
                                                                <span className="text-base-content/50">•</span>
                                                            </>
                                                        )}
                                                        {task.deadline && (
                                                            <>
                                                                <div className={`badge badge-sm ${
                                                                    isOverdue(task.deadline) && !task.is_completed
                                                                        ? 'badge-error'
                                                                        : 'badge-ghost'
                                                                }`}>
                                                                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                    {formatDeadline(task.deadline)}
                                                                </div>
                                                                <span className="text-base-content/50">•</span>
                                                            </>
                                                        )}
                                                        <div className="text-xs text-base-content/50">
                                                            {new Date(task.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="dropdown dropdown-end">
                                                    <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </label>
                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                                                        <li>
                                                            <form method="POST" action={`/tasks/${task.id}`}>
                                                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                                                                <input type="hidden" name="_method" value="PATCH" />
                                                                <input type="hidden" name="is_completed" value={task.is_completed ? '0' : '1'} />
                                                                <button type="submit" className="w-full text-left">
                                                                    {task.is_completed ? 'Mark as Pending' : 'Mark as Complete'}
                                                                </button>
                                                            </form>
                                                        </li>
                                                        <li>
                                                            <form method="POST" action={`/tasks/${task.id}`} onSubmit={(e) => {
                                                                if (!confirm('Are you sure you want to delete this task?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}>
                                                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                                                                <input type="hidden" name="_method" value="DELETE" />
                                                                <button type="submit" className="w-full text-left text-error">
                                                                    Delete Task
                                                                </button>
                                                            </form>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-40">
                    <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
                    <aside className="w-80 min-h-full bg-base-100">
                        <div className="sticky top-0 p-4 pt-24 lg:pt-8">
                            <div className="card bg-base-200 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-xl">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Quick Add
                                    </h2>

                                    <form method="POST" action="/tasks" onSubmit={handleAddTaskSubmit}>
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Task Description</span>
                                            </label>
                                            <textarea
                                                name="description"
                                                placeholder="What needs to be done?"
                                                value={newTaskText}
                                                onChange={(e) => setNewTaskText(e.target.value)}
                                                className="textarea textarea-bordered h-24 resize-none"
                                                required
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Category</span>
                                            </label>
                                            <select
                                                name="category"
                                                value={newTaskCategory}
                                                onChange={(e) => setNewTaskCategory(e.target.value)}
                                                className="select select-bordered"
                                            >
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Deadline (Optional)</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="deadline"
                                                value={newTaskDeadline}
                                                onChange={(e) => setNewTaskDeadline(e.target.value)}
                                                className="input input-bordered"
                                            />
                                        </div>

                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text">Difficulty</span>
                                            </label>
                                            <div className="join w-full">
                                                <input
                                                    type="radio"
                                                    name="difficulty"
                                                    value="easy"
                                                    className="join-item btn"
                                                    aria-label="Easy"
                                                    checked={newTaskDifficulty === 'easy'}
                                                    onChange={() => setNewTaskDifficulty('easy')}
                                                />
                                                <input
                                                    type="radio"
                                                    name="difficulty"
                                                    value="medium"
                                                    className="join-item btn"
                                                    aria-label="Medium"
                                                    checked={newTaskDifficulty === 'medium'}
                                                    onChange={() => setNewTaskDifficulty('medium')}
                                                />
                                                <input
                                                    type="radio"
                                                    name="difficulty"
                                                    value="hard"
                                                    className="join-item btn"
                                                    aria-label="Hard"
                                                    checked={newTaskDifficulty === 'hard'}
                                                    onChange={() => setNewTaskDifficulty('hard')}
                                                />
                                            </div>
                                        </div>

                                        <div className="card-actions justify-end mt-4">
                                            <button
                                                type="submit"
                                                disabled={!newTaskText.trim()}
                                                className="btn btn-primary btn-block"
                                            >
                                                Add Task
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
