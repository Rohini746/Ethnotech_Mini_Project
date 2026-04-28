import { X, Clock, Users, ChefHat, Trash2 } from 'lucide-react'

const DIFFICULTY_CONFIG = {
  EASY:   { label: 'Easy',   color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  MEDIUM: { label: 'Medium', color: 'bg-amber-100 text-amber-700',    dot: 'bg-amber-500' },
  HARD:   { label: 'Hard',   color: 'bg-red-100 text-red-700',        dot: 'bg-red-500' },
}

export default function RecipeModal({ recipe, onClose, onDelete }) {
  if (!recipe) return null

  const diff = DIFFICULTY_CONFIG[recipe.difficulty] || DIFFICULTY_CONFIG.MEDIUM

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full
                     bg-white/80 backdrop-blur-sm text-slate-500 hover:bg-white hover:text-slate-700
                     shadow-sm transition-all"
          aria-label="Close"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Header image / gradient */}
        <div className="h-48 bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }} />
          <span className="text-7xl drop-shadow-xl">{
            recipe.cuisine === 'Italian' ? '🍝' :
            recipe.cuisine === 'American' ? '🍗' :
            recipe.cuisine === 'Asian' ? '🍜' :
            recipe.cuisine === 'Thai' ? '🍛' :
            recipe.cuisine === 'Mexican' ? '🌮' :
            recipe.cuisine === 'Indian' ? '🍛' : '🍽️'
          }</span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Title + meta */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium bg-sage-100 text-sage-700 px-2.5 py-0.5 rounded-full">
                {recipe.cuisine}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${diff.color}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
                {diff.label}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {recipe.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-4 py-3 border-y border-sage-100">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-50">
                <Clock className="h-4 w-4 text-sage-500" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Total time</p>
                <p className="text-sm font-semibold text-slate-700">{recipe.totalTimeMinutes} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-50">
                <Users className="h-4 w-4 text-sage-500" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Servings</p>
                <p className="text-sm font-semibold text-slate-700">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-50">
                <ChefHat className="h-4 w-4 text-sage-500" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Prep</p>
                <p className="text-sm font-semibold text-slate-700">{recipe.prepTimeMinutes} min</p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center justify-between py-1.5 border-b border-sage-50 last:border-b-0">
                    <span className="text-sm text-slate-600">{ing.name}</span>
                    <span className="text-sm font-medium text-sage-700" style={{ fontFamily: 'var(--font-mono)' }}>
                      {ing.quantity} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Match info (if from smart filter) */}
          {recipe.matchedIngredientNames && recipe.matchedIngredientNames.length > 0 && (
            <div className="bg-sage-50 rounded-xl p-4 border border-sage-100">
              <p className="text-xs font-semibold text-sage-600 uppercase tracking-wide mb-2">
                Fridge Match — {recipe.matchPercentage}%
              </p>
              <div className="flex flex-wrap gap-1.5">
                {recipe.matchedIngredientNames.map((name) => (
                  <span key={name} className="text-xs font-medium bg-sage-200 text-sage-800 px-2 py-0.5 rounded-full">
                    ✓ {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Delete button */}
          {onDelete && (
            <button
              onClick={() => onDelete(recipe.id)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium
                         text-red-500 hover:bg-red-50 border border-red-200 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              Delete Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
