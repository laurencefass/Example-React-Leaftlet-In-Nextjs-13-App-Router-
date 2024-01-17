import { ClientConsumer } from "./consumer"
import { InnerConsumer } from "./consumer"

export function ServerComponent() {
  return <>
    <p>ServerComponent</p>
    <InnerConsumer />
    </>
}
