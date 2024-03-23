// src/components/MessageList.tsx
'use client';

import { pusherClient } from "@/libs/client";
import { useEffect, useState } from "react";

interface MessageListProps {

}

export default function MessageList({ }: MessageListProps) {
    const [messages, setMessages]: any = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const channel = pusherClient
            .subscribe('private-chat')
            .bind("evt::test", (data: any) => {
                console.log("test", data)
                setMessages([...messages, data])
            });

        return () => {
            channel.unbind();
        };
    }, [messages]);

    const handleTestClick = async () => {
        let data = await fetch('/api/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        let json = await data.json()
        console.log(json)

    }

    return (
        <div className="flex flex-col">
            <button
                style={{ width: '100px', marginBottom: 50 }}
                onClick={() => handleTestClick()}>
                send
            </button>
            <input
                style={{ border: '1px solid white', marginLeft: 15 }}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div>
                {messages.map((message: any) => (
                    <div
                        style={{ border: '1px solid white', marginBottom: 15 }}
                        key={message.date}
                    >
                        {message.message}
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};