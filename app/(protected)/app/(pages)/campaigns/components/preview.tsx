import {useEffect, useRef} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function Preview(
    {
        html
    }: {
        html: string
    }
) {

    const myRef = useRef(null)
    useEffect(() => {
        // @ts-ignore
        myRef.current.innerHTML = html
    }, [myRef, html])

    return <>
        <ScrollArea className="h-100">
            <div ref={myRef}></div>
        </ScrollArea>
    </>
}
