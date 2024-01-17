import { Subscriber } from "./subscriber";

export function ServerComponent() {
  return <>
        <p>ServerComponent</p>
        <div>
            InnerComponent: <Subscriber/>
        </div>
    </>
}
