'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const DynamicMap = dynamic(() => import('../../components/Map'), {
  ssr: false
});

export function ClientMap() {
    useEffect(() => {
        console.log("ClientMap mount")
        return () => {
            console.log("ClientMap dismount");
        }
    }, [])

    return <main>
        <DynamicMap />
    </main>
}
