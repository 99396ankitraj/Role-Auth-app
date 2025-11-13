export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><strong>@2026 Inbotiq Assignment</strong></div>
        <div style={{ display: 'flex', gap: 14 }}>
          <a href="https://github.com/99396ankitraj" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://vercel.com/ankit-rajs-projects-8bd6f294" target="_blank" rel="noreferrer">Vercel</a>
          <a href="https://dashboard.render.com/" target="_blank" rel="noreferrer">Render</a>
        </div>
      </div>
    </footer>
  )
}
