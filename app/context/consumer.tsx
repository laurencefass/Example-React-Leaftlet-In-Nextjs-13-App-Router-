'use client';

import { useContext } from "react";
import { MyContext } from "./provider";

export function InnerConsumer() {
  let ctx = useContext(MyContext)
  return (
    <>
      <div>InnerConsumer ctx = {JSON.stringify(ctx, null, 2)}</div>
    </>
  )
}

export function ClientConsumer() {
    let ctx = useContext(MyContext)
    return (
      <>
        <div>ClientConsumer ctx = {JSON.stringify(ctx, null, 2)}</div>
        <InnerConsumer />
      </>
    )
  }
  