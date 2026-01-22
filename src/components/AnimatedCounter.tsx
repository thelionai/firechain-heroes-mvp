"use client";
import { useEffect, useState } from "react";

export default function AnimatedCounter({ end, duration = 2000, prefix = "" }: { end: number, duration?: number, prefix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <span>{prefix}{count.toLocaleString()}</span>;
}
