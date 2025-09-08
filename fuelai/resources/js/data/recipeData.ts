export interface RecipeFormData {
    dietaryRequirements: string[];
    allergies: string[];
    proteins: string[];
    caloriesTarget: string;
    proteinsTarget: string;
    servings: string;
    cookingTime: string;
    difficulty: string;
    cuisine: string;
    mealType: string;
    additionalNotes: string;
}

export const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Diabetes'
];

export const commonAllergies = [
    'Nuts', 'Peanuts', 'Shellfish', 'Fish', 'Eggs', 'Dairy',
    'Soy', 'Wheat', 'Sesame', 'Lactose'
];

export const proteinOptions = [
    'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Turkey',
    'Tofu', 'Beans', 'Eggs', 'Cheese'
];
