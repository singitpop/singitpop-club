export default function DebugPage() {
    return (
        <div style={{ padding: 50, background: 'black', color: '#00ff00', minHeight: '100vh', fontFamily: 'monospace' }}>
            <h1>DEPLOYMENT CONFIRMED ✅</h1>
            <p>If you can read this, your Vercel site IS updating correctly.</p>
            <p>The issue on the Home Page is likely just your Browser Cache.</p>
            <hr />
            <p>Generated at: {new Date().toISOString()}</p>
        </div>
    )
}
