"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";


interface KeyCardProps {
    value: string | null
}

export const KeyCard = ({
    value,
}: KeyCardProps) => {

    const [show, setshow] = useState(false);



    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">
                    Stream Key
                </p>
                <div className="spaex-y-2 w-full">
                    <div className="w-full dlex items-center gap-x-2">
                        <Input
                            value={value || ""}
                            type={show ? "text" : "password"}
                            disabled
                            placeholder="Stream Key"
                        />
                        <CopyButton value={value || ""} />
                    </div>
                    <Button
                        onClick={() => setshow(!show)}
                        size="sm"
                        variant="link"
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div >
    );
};