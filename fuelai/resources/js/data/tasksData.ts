
export interface TaskInterface {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
    priority: 'low' | 'medium' | 'high';
    category: string;
}

export const categories = ['General', 'Cooking', 'Meal Planning', 'Shopping', 'Fitness', 'Research', 'Health'];

export const initialTasks: TaskInterface[] = [
    {
        id: 1,
        text: "Try the Mediterranean chicken recipe from FuelAI",
        completed: false,
        createdAt: new Date('2025-01-15'),
        priority: 'medium',
        category: 'Cooking'
    },
    {
        id: 2,
        text: "Plan weekly meal prep for next week",
        completed: true,
        createdAt: new Date('2025-01-14'),
        priority: 'high',
        category: 'Meal Planning'
    },
    {
        id: 3,
        text: "Buy ingredients for keto dinner recipes",
        completed: false,
        createdAt: new Date('2025-01-16'),
        priority: 'medium',
        category: 'Shopping'
    },
    {
        id: 4,
        text: "Complete 30-minute workout routine",
        completed: true,
        createdAt: new Date('2025-01-16'),
        priority: 'high',
        category: 'Fitness'
    },
    {
        id: 5,
        text: "Research vegan protein sources",
        completed: false,
        createdAt: new Date('2024-01-17'),
        priority: 'low',
        category: 'Research'
    }
];
