import { getPusherInstance } from '@/libs/server';
import { NextResponse } from 'next/server'
const pusherServer = getPusherInstance();

export async function POST(req: Request, res: Response) {
    try {

        const data = await req.json();
        const { message } = data;

        await pusherServer.trigger(
            'private-chat',
            "evt::test",
            {
                message: message,
                user: "ree",
                date: new Date(),
            }
        )

        return NextResponse.json({ message: "Sockets tested" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to test sockets", error: error }, { status: 500 })

    }
}