import { ClientConsumer } from "./consumer"
import { ServerComponent } from "./server"

export default function Page() {
  return <>
     <ClientConsumer />
     <ServerComponent />
    </>
}
