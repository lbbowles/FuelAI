import { Head } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { TaskInterface, initialTasks } from '@/data/tasksData';

type Task = TaskInterface;

export default function Tasks() {

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const [newTaskText, setNewTaskText] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [newTaskCategory, setNewTaskCategory] = useState('General');
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const categories = ['General', 'Cooking', 'Meal Planning', 'Shopping', 'Fitness', 'Research', 'Health'];


    const addTask = () => {
        if (newTaskText.trim()) {
            const newTask: Task = {
                id: Math.max(...tasks.map(t => t.id), 0) + 1,
                text: newTaskText.trim(),
                completed: false,
                createdAt: new Date(),
                priority: newTaskPriority,
                category: newTaskCategory
            };
            setTasks([newTask, ...tasks]);
            setNewTaskText('');
            setNewTaskPriority('medium');
            setNewTaskCategory('General');
        }
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const completedCount = tasks.filter(task => task.completed).length;
    const pendingCount = tasks.filter(task => !task.completed).length;

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'high': return 'badge-error';
            case 'medium': return 'badge-warning';
            case 'low': return 'badge-success';
            default: return 'badge-neutral';
        }
    };

    return (
        <>
            <Head title="Tasks">
                <link rel="icon" type="image/svg+xml" href="/fuelai.svg" />
            </Head>
            <Navbar />

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

                    <div className="p-4 pt-20 lg:pt-4">
                        {/* Hero Section */}
                        <div className="hero bg-gradient-to-r from-primary to-secondary rounded-box mb-8 pt-8">
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

                        {/* Filter Tabs */}
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
                                        <div className="text-6xl mb-4">📝</div>
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
                                                <div className="form-control">
                                                    <label className="cursor-pointer label">
                                                        <input
                                                            type="checkbox"
                                                            checked={task.completed}
                                                            onChange={() => toggleTask(task.id)}
                                                            className="checkbox checkbox-primary checkbox-lg"
                                                        />
                                                    </label>
                                                </div>

                                                <div className="flex-1">
                                                    <div className={`text-lg ${task.completed ? 'line-through opacity-60' : ''}`}>
                                                        {task.text}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <div className={`font-medium ${getPriorityBadge(task.priority)}`}>
                                                            {task.priority}
                                                        </div>
                                                        <span className="text-base-content/50">•</span>
                                                        <div className="text-sm text-base-content/70">
                                                            {task.category}
                                                        </div>
                                                        <span className="text-base-content/50">•</span>
                                                        <div className="text-xs text-base-content/50">
                                                            {task.createdAt.toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="dropdown dropdown-end">
                                                    <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </label>
                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li>
                                                            <button
                                                                onClick={() => toggleTask(task.id)}
                                                                className="text-left"
                                                            >
                                                                {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                onClick={() => deleteTask(task.id)}
                                                                className="text-error text-left"
                                                            >
                                                                Delete Task
                                                            </button>
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

                {/* Drawer Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
                    <aside className="w-80 min-h-full bg-base-100">
                        <div className="p-4 pt-20 lg:pt-4">
                            <div className="card bg-base-200 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-xl">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Quick Add
                                    </h2>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Task Description</span>
                                        </label>
                                        <textarea
                                            placeholder="What needs to be done?"
                                            value={newTaskText}
                                            onChange={(e) => setNewTaskText(e.target.value)}
                                            className="textarea textarea-bordered h-24 resize-none"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    addTask();
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Category</span>
                                        </label>
                                        <select
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
                                            <span className="label-text">Priority</span>
                                        </label>
                                        <div className="join w-full">
                                            <input
                                                type="radio"
                                                name="priority"
                                                className="join-item btn"
                                                aria-label="Low"
                                                checked={newTaskPriority === 'low'}
                                                onChange={() => setNewTaskPriority('low')}
                                            />
                                            <input
                                                type="radio"
                                                name="priority"
                                                className="join-item btn"
                                                aria-label="Medium"
                                                checked={newTaskPriority === 'medium'}
                                                onChange={() => setNewTaskPriority('medium')}
                                            />
                                            <input
                                                type="radio"
                                                name="priority"
                                                className="join-item btn"
                                                aria-label="High"
                                                checked={newTaskPriority === 'high'}
                                                onChange={() => setNewTaskPriority('high')}
                                            />
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end mt-4">
                                        <button
                                            onClick={addTask}
                                            disabled={!newTaskText.trim()}
                                            className="btn btn-primary btn-block"
                                        >
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
