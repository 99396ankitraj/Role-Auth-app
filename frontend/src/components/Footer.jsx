export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><strong>@2026 Inbotiq Assignment</strong></div>
        <div style={{ display: 'flex', gap: 14 }}>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://vercel.com/" target="_blank" rel="noreferrer">Vercel</a>
          <a href="https://render.com/" target="_blank" rel="noreferrer">Render</a>
        </div>
      </div>
    </footer>
  )
}
