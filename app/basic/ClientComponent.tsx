'use client'

import { useEffect } from "react";

export function ClientComponent() {
    console.log("ClientComponent: running on client");
    useEffect(()=>{
        console.log("ClientComponent mounted");
        return () => {
            console.log("ClientComponent unmounted");
        }
    }, [])

    return <>
        <h2>ClientComponent</h2>
        {console.log("ClientComponent: rendered on client")}
    </>
}
  