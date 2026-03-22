import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/fuck')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/fuck"!</div>;
}
