import { Counter } from "./counter";
import { Subscriber } from "./subscriber";
import { ServerComponent } from './server'
export default function Page() {
  return (
    <>
      <Counter />
      <Subscriber />
      <ServerComponent />
    </>
  )
}
