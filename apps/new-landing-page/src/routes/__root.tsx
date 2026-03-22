import React, { Suspense } from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

// Lazy load the devtools only if NOT in production
const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
              import('@tanstack/react-router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              })),
          );

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <div className="p-2 flex gap-2 text-lg">
                <Link
                    to="/"
                    activeProps={{ className: 'font-bold' }}
                    activeOptions={{ exact: true }}
                >
                    Home
                </Link>
            </div>
            <hr />
            <Outlet />

            {/* Wrap in Suspense to handle the lazy load in dev mode */}
            <Suspense fallback={null}>
                <TanStackRouterDevtools position="bottom-right" />
            </Suspense>
        </>
    );
}
