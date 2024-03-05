import { ClientComponent } from "./client";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <main className="content">
            <h1>Import tests</h1>
            <p>Everything on this page is imported from <a href="https://github.com/laurencefass/package-mono"> package-mono</a></p>
            <p>Packages are dynamically mounted into the app container to allow for live development and immediate updates</p>
            <ClientComponent />
        </main>
    )
}
