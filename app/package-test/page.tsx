import { ClientComponent } from "./client";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <main>
            <h1>Page component.</h1>
            <ClientComponent />
        </main>
    )
}
