// src/app/api/pusher/auth/route.ts

import { getPusherInstance } from "@/libs/server";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
    console.log("authenticating pusher perms...")
    const data = await req.text();
    const [socketId, channelName] = data
        .split("&")
        .map((str) => str.split("=")[1]);


    const authResponse = pusherServer.authorizeChannel(socketId, channelName);

    return new Response(JSON.stringify(authResponse));
}

