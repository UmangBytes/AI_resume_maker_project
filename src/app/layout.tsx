import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Maker | Craft Your Perfect Resume",
  description: "AI-powered resume builder to tailor your experience to any job description.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-layout">
          <header className="site-header glass-panel">
            <div className="container header-content">
              <h1 className="logo gradient-text">AI Resume</h1>
              <nav>
                <a href="/" className="nav-link">Home</a>
              </nav>
            </div>
          </header>
          
          <main className="main-content">
            {children}
          </main>
          
          <footer className="site-footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} AI Resume Maker. Built with Next.js & AI.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
