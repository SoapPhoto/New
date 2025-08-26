import { useEffect, useRef } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import Button from '../Button'

export function ErrorElement() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : JSON.stringify(error)
  const stack = error instanceof Error ? error.stack : null

  useEffect(() => {
    console.error('Error handled by React Router default ErrorBoundary:', error)
  }, [error])

  const reloadRef = useRef(false)
  if (
    message.startsWith('Failed to fetch dynamically imported module')
    && window.sessionStorage.getItem('reload') !== '1'
  ) {
    if (reloadRef.current)
      return null
    window.sessionStorage.setItem('reload', '1')
    window.location.reload()
    reloadRef.current = true
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header spacer */}
      <div className="h-16" />

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-lg">
          {/* Error icon and status */}
          <div className="mb-8 text-center">
            <div className="bg-background-secondary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-red h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h1 className="text-text mb-2 text-3xl font-medium">
              Something went wrong
            </h1>
            <p className="text-text-secondary text-lg">
              We encountered an unexpected error
            </p>
          </div>

          {/* Error message */}
          <div className="bg-material-medium border-fill-tertiary mb-6 rounded-lg border p-4">
            <p className="text-text-secondary font-mono text-sm break-words">
              {message}
            </p>
          </div>

          {/* Stack trace in development */}
          {import.meta.env.DEV && stack && (
            <div className="mb-6">
              <div className="bg-material-medium border-fill-tertiary overflow-auto rounded-lg border p-4">
                <pre className="text-red font-mono text-xs break-words whitespace-pre-wrap">
                  {stack}
                </pre>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => (window.location.href = '/')}
            >
              Reload Application
            </Button>
            <Button
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
