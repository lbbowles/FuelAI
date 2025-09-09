// Interface file just to describe the shape of data to be expected.  Utilized our Database Schema.


interface Meal {
    id: number;
    title: string;
    description: string;
    instructions: string;
    creator_id: number;
    created_at: string;
}

interface NutritionalInfo {
    id: number;
    meal_id: number;
    calories: number;
    protein: number;
    carb: number;
    fat: number;
    fiber: number;
    sugar: number;
    other_nutrients: string | null;
    // Including as we put it in schema.  At the moment there is no real functionality for it
}

interface MealPlans {
    id: number;
    user_id: number;
    title: string;
    description?: string | null;
    created_at: string;
    updated_at: string;
}

//Join table between meal_plan and meals
interface MealPlanMeal {
    id: number;
    meal_plan_id: number;
    meal_id: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    profile_image_url?: string | null;
    created_at: string;
}

interface Follow {
    id: number;
    follower_id: number;
    following_id: number;
    created_at: string;
}

interface Forum {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

interface ForumPost {
    id: number;
    thread_id: number;
    user_id: number;
    content: string;
    created_at: string;
}

interface ForumThread {
    id: number;
    forum_id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
}

interface ImageRecognitionResult {
    id: number;
    meal_id: number;
    detected_label: string;
    confidence_score: number;
    created_at: string;
}

interface UserMealLog{
    id: number;
    user_id: number;
    meal_id: number;
    log_date: string;
    quantity: number;
}


// Add relational nesting potentially?