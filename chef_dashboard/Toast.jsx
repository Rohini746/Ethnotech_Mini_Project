import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { Check, AlertCircle, X, Info } from 'lucide-react'

const ToastContext = createContext(null)

const TOAST_ICONS = {
  success: Check,
  error: AlertCircle,
  info: Info,
}

const TOAST_STYLES = {
  success: 'bg-sage-600 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-slate-700 text-white',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}

      {/* Toast container — bottom right */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          const Icon = TOAST_ICONS[toast.type] || Check
          return (
            <div
              key={toast.id}
              className={`
                pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl
                min-w-[280px] max-w-[380px] animate-slide-right
                ${TOAST_STYLES[toast.type] || TOAST_STYLES.success}
              `}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 shrink-0">
                <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
              </div>
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-white/20 transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" strokeWidth={2} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
