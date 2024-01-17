import { IncrementCounter } from "./IncrementCounter"
import { DisplayCounter1, DisplayCounter2 } from "./DisplayCounter"
import { UseSelectorDemo } from './UseSelector'
import { CounterProvider } from './CounterProvider'

export default function Page() {
  return <>
      <UseSelectorDemo/>
      {/* <CounterProvider>
        <IncrementCounter/>
        <DisplayCounter1/>
        <DisplayCounter2/>      
      </CounterProvider> */}
    </>
}
