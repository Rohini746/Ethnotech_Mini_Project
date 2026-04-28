import { Clock, Users, Flame } from 'lucide-react'

const DIFFICULTY_CONFIG = {
  EASY:   { label: 'Easy',   color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  MEDIUM: { label: 'Medium', color: 'bg-amber-100 text-amber-700',    dot: 'bg-amber-500' },
  HARD:   { label: 'Hard',   color: 'bg-red-100 text-red-700',        dot: 'bg-red-500' },
}

const CUISINE_GRADIENTS = {
  Italian:  'from-orange-400 to-red-400',
  American: 'from-blue-400 to-indigo-400',
  Asian:    'from-rose-400 to-pink-400',
  Thai:     'from-emerald-400 to-teal-400',
  Mexican:  'from-yellow-400 to-orange-400',
  Indian:   'from-amber-500 to-red-500',
  default:  'from-sage-400 to-sage-600',
}

export default function RecipeCard({ recipe, matchedIngredientNames, matchPercentage, onClick }) {
  const diff = DIFFICULTY_CONFIG[recipe.difficulty] || DIFFICULTY_CONFIG.MEDIUM
  const gradient = CUISINE_GRADIENTS[recipe.cuisine] || CUISINE_GRADIENTS.default
  const hasMatch = matchedIngredientNames && matchedIngredientNames.length > 0

  return (
    <div
      id={`recipe-card-${recipe.id}`}
      onClick={onClick}
      className="group relative flex flex-col bg-white rounded-2xl border border-sage-200/60 shadow-md
                 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Image / Gradient Header */}
      <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <span className="text-5xl drop-shadow-lg select-none">
          {recipe.cuisine === 'Italian' && '🍝'}
          {recipe.cuisine === 'American' && '🍗'}
          {recipe.cuisine === 'Asian' && '🍜'}
          {recipe.cuisine === 'Thai' && '🍛'}
          {recipe.cuisine === 'Mexican' && '🌮'}
          {recipe.cuisine === 'Indian' && '🍛'}
          {!['Italian', 'American', 'Asian', 'Thai', 'Mexican', 'Indian'].includes(recipe.cuisine) && '🍽️'}
        </span>

        {/* Cuisine badge */}
        <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-full shadow-sm">
          {recipe.cuisine}
        </span>

        {/* Match percentage badge */}
        {hasMatch && matchPercentage != null && (
          <span className="absolute top-3 right-3 text-xs font-bold bg-sage-600 text-white px-2.5 py-1 rounded-full shadow-sm animate-scale-in">
            {matchPercentage}% match
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 gap-2.5">
        {/* Title */}
        <h3 className="text-base font-semibold text-slate-800 leading-snug group-hover:text-sage-700 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}>
          {recipe.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Matched ingredients tags */}
        {hasMatch && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {matchedIngredientNames.map((name) => (
              <span
                key={name}
                className="inline-flex items-center text-xs font-medium bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full animate-fade-in"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-sage-100">
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {recipe.totalTimeMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
            {recipe.servings}
          </span>
          <span className={`ml-auto inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${diff.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
            {diff.label}
          </span>
        </div>
      </div>

      {/* Accent strip */}
      <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #5C8A5C, #7BA37B)' }} />
    </div>
  )
}
