// src/app/page.tsx
import MessageList from '@/components/MessageList'

export default function Home() {
    return (
        <main style={{ height: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MessageList />
        </main>
    )
}