import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LinkRedirect = () => {
    const router = useRouter()


    useEffect(() => {
        router.push('/link-shorter')
    }, [router])
    return (
        <div></div>
    )
}

export default LinkRedirect