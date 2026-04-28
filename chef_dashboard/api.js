/**
 * Mock API service — provides realistic data for frontend development
 * before the Spring Boot backend is running.
 * 
 * When the backend is live, replace these with fetch() calls to /api/*.
 */

const MOCK_INGREDIENTS = [
  { id: '1',  name: 'Tomato',          category: 'Produce' },
  { id: '2',  name: 'Garlic',          category: 'Produce' },
  { id: '3',  name: 'Olive Oil',       category: 'Pantry' },
  { id: '4',  name: 'Pasta',           category: 'Pantry' },
  { id: '5',  name: 'Basil',           category: 'Produce' },
  { id: '6',  name: 'Chicken Breast',  category: 'Protein' },
  { id: '7',  name: 'Onion',           category: 'Produce' },
  { id: '8',  name: 'Bell Pepper',     category: 'Produce' },
  { id: '9',  name: 'Rice',            category: 'Pantry' },
  { id: '10', name: 'Soy Sauce',       category: 'Pantry' },
  { id: '11', name: 'Ginger',          category: 'Produce' },
  { id: '12', name: 'Lemon',           category: 'Produce' },
  { id: '13', name: 'Parmesan Cheese', category: 'Dairy' },
  { id: '14', name: 'Butter',          category: 'Dairy' },
  { id: '15', name: 'Egg',             category: 'Dairy' },
  { id: '16', name: 'Salt',            category: 'Pantry' },
  { id: '17', name: 'Black Pepper',    category: 'Pantry' },
  { id: '18', name: 'Cumin',           category: 'Pantry' },
  { id: '19', name: 'Chili Flakes',    category: 'Pantry' },
  { id: '20', name: 'Coconut Milk',    category: 'Pantry' },
  { id: '21', name: 'Shrimp',          category: 'Protein' },
  { id: '22', name: 'Cilantro',        category: 'Produce' },
  { id: '23', name: 'Lime',            category: 'Produce' },
  { id: '24', name: 'Avocado',         category: 'Produce' },
  { id: '25', name: 'Tortilla',        category: 'Pantry' },
  { id: '26', name: 'Mozzarella',      category: 'Dairy' },
  { id: '27', name: 'Mushroom',        category: 'Produce' },
  { id: '28', name: 'Spinach',         category: 'Produce' },
  { id: '29', name: 'Cream',           category: 'Dairy' },
  { id: '30', name: 'Flour',           category: 'Pantry' },
];

// Track the next mock ID
let _nextMockId = 8;

const MOCK_RECIPES = [
  {
    id: 1,
    title: 'Classic Tomato Pasta',
    description: 'A simple yet flavorful Italian pasta with fresh tomatoes and basil.',
    cuisine: 'Italian',
    difficulty: 'EASY',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    servings: 4,
    imageUrl: null,
    ingredients: [
      { name: 'Pasta', quantity: '400', unit: 'g' },
      { name: 'Tomato', quantity: '500', unit: 'g' },
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Olive Oil', quantity: '3', unit: 'tbsp' },
      { name: 'Basil', quantity: '10', unit: 'leaves' },
      { name: 'Parmesan Cheese', quantity: '50', unit: 'g' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Black Pepper', quantity: '0.5', unit: 'tsp' },
    ],
  },
  {
    id: 2,
    title: 'Garlic Butter Chicken',
    description: 'Juicy pan-seared chicken in a rich garlic butter sauce with herbs.',
    cuisine: 'American',
    difficulty: 'MEDIUM',
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    totalTimeMinutes: 40,
    servings: 2,
    imageUrl: null,
    ingredients: [
      { name: 'Chicken Breast', quantity: '500', unit: 'g' },
      { name: 'Garlic', quantity: '6', unit: 'cloves' },
      { name: 'Butter', quantity: '40', unit: 'g' },
      { name: 'Lemon', quantity: '1', unit: 'pcs' },
      { name: 'Olive Oil', quantity: '1', unit: 'tbsp' },
      { name: 'Salt', quantity: '1', unit: 'tsp' },
      { name: 'Black Pepper', quantity: '0.5', unit: 'tsp' },
    ],
  },
  {
    id: 3,
    title: 'Stir-Fried Rice',
    description: 'Quick and satisfying fried rice with vegetables and soy sauce.',
    cuisine: 'Asian',
    difficulty: 'EASY',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    servings: 3,
    imageUrl: null,
    ingredients: [
      { name: 'Rice', quantity: '300', unit: 'g' },
      { name: 'Egg', quantity: '2', unit: 'pcs' },
      { name: 'Soy Sauce', quantity: '3', unit: 'tbsp' },
      { name: 'Onion', quantity: '1', unit: 'pcs' },
      { name: 'Bell Pepper', quantity: '1', unit: 'pcs' },
      { name: 'Garlic', quantity: '3', unit: 'cloves' },
      { name: 'Olive Oil', quantity: '2', unit: 'tbsp' },
    ],
  },
  {
    id: 4,
    title: 'Coconut Shrimp Curry',
    description: 'Creamy Thai-inspired curry with plump shrimp and aromatic spices.',
    cuisine: 'Thai',
    difficulty: 'MEDIUM',
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTimeMinutes: 35,
    servings: 4,
    imageUrl: null,
    ingredients: [
      { name: 'Shrimp', quantity: '400', unit: 'g' },
      { name: 'Coconut Milk', quantity: '400', unit: 'ml' },
      { name: 'Onion', quantity: '1', unit: 'pcs' },
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Ginger', quantity: '15', unit: 'g' },
      { name: 'Cumin', quantity: '1', unit: 'tsp' },
      { name: 'Chili Flakes', quantity: '0.5', unit: 'tsp' },
      { name: 'Cilantro', quantity: '15', unit: 'g' },
      { name: 'Lime', quantity: '1', unit: 'pcs' },
      { name: 'Olive Oil', quantity: '2', unit: 'tbsp' },
    ],
  },
  {
    id: 5,
    title: 'Mushroom Spinach Frittata',
    description: 'A fluffy egg frittata loaded with earthy mushrooms and fresh spinach.',
    cuisine: 'Italian',
    difficulty: 'EASY',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeMinutes: 25,
    servings: 4,
    imageUrl: null,
    ingredients: [
      { name: 'Egg', quantity: '6', unit: 'pcs' },
      { name: 'Mushroom', quantity: '200', unit: 'g' },
      { name: 'Spinach', quantity: '100', unit: 'g' },
      { name: 'Cream', quantity: '50', unit: 'ml' },
      { name: 'Mozzarella', quantity: '80', unit: 'g' },
      { name: 'Garlic', quantity: '2', unit: 'cloves' },
      { name: 'Olive Oil', quantity: '2', unit: 'tbsp' },
    ],
  },
  {
    id: 6,
    title: 'Chicken Avocado Tacos',
    description: 'Fresh and zesty tacos with grilled chicken, creamy avocado, and lime.',
    cuisine: 'Mexican',
    difficulty: 'EASY',
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    totalTimeMinutes: 30,
    servings: 3,
    imageUrl: null,
    ingredients: [
      { name: 'Chicken Breast', quantity: '400', unit: 'g' },
      { name: 'Avocado', quantity: '2', unit: 'pcs' },
      { name: 'Tortilla', quantity: '6', unit: 'pcs' },
      { name: 'Cilantro', quantity: '10', unit: 'g' },
      { name: 'Lime', quantity: '2', unit: 'pcs' },
      { name: 'Chili Flakes', quantity: '0.5', unit: 'tsp' },
      { name: 'Onion', quantity: '0.5', unit: 'pcs' },
    ],
  },
  {
    id: 7,
    title: 'Creamy Garlic Pasta',
    description: 'Rich and indulgent pasta in a creamy parmesan garlic sauce.',
    cuisine: 'Italian',
    difficulty: 'EASY',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    servings: 2,
    imageUrl: null,
    ingredients: [
      { name: 'Pasta', quantity: '300', unit: 'g' },
      { name: 'Garlic', quantity: '5', unit: 'cloves' },
      { name: 'Butter', quantity: '30', unit: 'g' },
      { name: 'Cream', quantity: '200', unit: 'ml' },
      { name: 'Parmesan Cheese', quantity: '80', unit: 'g' },
      { name: 'Salt', quantity: '0.5', unit: 'tsp' },
      { name: 'Black Pepper', quantity: '0.5', unit: 'tsp' },
    ],
  },
];

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Attempts real API call first, falls back to mock data.
 */
async function tryFetchOrMock(url, options, mockFn) {
  try {
    const res = await fetch(url, options);
    if (res.ok) return await res.json();
    if (res.status === 204) return [];
  } catch (e) {
    // Backend not running — use mock
  }
  await delay(300 + Math.random() * 400);
  return mockFn();
}

export async function fetchIngredients() {
  return tryFetchOrMock('/api/ingredients', {}, () => MOCK_INGREDIENTS);
}

export async function fetchRecipes() {
  return tryFetchOrMock('/api/recipes', {}, () => MOCK_RECIPES);
}

export async function fetchRecipeById(id) {
  return tryFetchOrMock(`/api/recipes/${id}`, {}, () =>
    MOCK_RECIPES.find((r) => r.id === Number(id))
  );
}

export async function smartFilter(ingredientNames, minMatch = 3) {
  const mockFn = () => {
    const namesLower = ingredientNames.map((n) => n.toLowerCase());
    return MOCK_RECIPES
      .map((recipe) => {
        const matched = recipe.ingredients.filter((i) =>
          namesLower.includes(i.name.toLowerCase())
        );
        return {
          ...recipe,
          matchedIngredients: matched.length,
          totalIngredients: recipe.ingredients.length,
          matchPercentage: Math.round((matched.length / recipe.ingredients.length) * 1000) / 10,
          matchedIngredientNames: matched.map((i) => i.name),
        };
      })
      .filter((r) => r.matchedIngredients >= minMatch)
      .sort((a, b) => b.matchedIngredients - a.matchedIngredients);
  };

  return tryFetchOrMock(
    '/api/smart-filter',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientNames, minMatch }),
    },
    mockFn
  );
}

export async function fetchShoppingList(mealPlanId) {
  return tryFetchOrMock(`/api/meal-plans/${mealPlanId}/shopping-list`, {}, () => {
    // Mock shopping list from meal plan recipes
    const ingredientMap = {};
    MOCK_RECIPES.slice(0, 5).forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        const key = ing.name;
        if (!ingredientMap[key]) {
          ingredientMap[key] = {
            ingredientName: ing.name,
            category: MOCK_INGREDIENTS.find((i) => i.name === ing.name)?.category || 'Other',
            totalQuantity: 0,
            unit: ing.unit,
            fromRecipeCount: 0,
          };
        }
        ingredientMap[key].totalQuantity += parseFloat(ing.quantity || 0);
        ingredientMap[key].fromRecipeCount += 1;
      });
    });
    return Object.values(ingredientMap).sort((a, b) =>
      a.category.localeCompare(b.category) || a.ingredientName.localeCompare(b.ingredientName)
    );
  });
}

export async function addRecipe(recipeData) {
  // Try real backend first
  try {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    // Backend not running — use mock
  }

  // Mock: add to local array
  await delay(400 + Math.random() * 300);
  const newRecipe = {
    ...recipeData,
    id: _nextMockId++,
    imageUrl: null,
  };
  MOCK_RECIPES.push(newRecipe);
  return newRecipe;
}

export async function deleteRecipe(recipeId) {
  try {
    const res = await fetch(`/api/recipes/${recipeId}`, { method: 'DELETE' });
    if (res.ok || res.status === 204) return true;
  } catch (e) {
    // Backend not running — use mock
  }
  await delay(300);
  const idx = MOCK_RECIPES.findIndex((r) => r.id === recipeId);
  if (idx !== -1) MOCK_RECIPES.splice(idx, 1);
  return true;
}
