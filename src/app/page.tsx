import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="container">
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="badge glass-panel">
            <Sparkles size={16} className="text-accent" />
            <span>AI-Powered Resume Generation</span>
          </div>

          <h1 className="hero-title">
            Land Your Dream Job with a <br />
            <span className="gradient-text">Tailored Resume</span>
          </h1>

          <p className="hero-subtitle">
            Stand out from the crowd. Our AI analyzes your experience and the job description to craft the perfect resume in seconds. Choose from premium templates and export to PDF instantly.
          </p>

          <div className="hero-actions">
            <Link href="/builder" className="btn-primary animate-delay-1">
              Create My Resume <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title text-center">How It Works</h2>

        <div className="features-grid">
          <div className="feature-card glass-panel animate-fade-in animate-delay-1">
            <div className="feature-icon-wrapper">
              <FileText size={28} className="text-accent" />
            </div>
            <h3>1. Add Your Details</h3>
            <p>Input your basic information, education, work experience, and skills into our intuitive form.</p>
          </div>

          <div className="feature-card glass-panel animate-fade-in animate-delay-2">
            <div className="feature-icon-wrapper">
              <Target size={28} className="text-accent" />
            </div>
            <h3>2. Paste Job Description</h3>
            <p>Provide the exact job description you are targeting. Our AI will align your experience with the requirements.</p>
          </div>

          <div className="feature-card glass-panel animate-fade-in animate-delay-3">
            <div className="feature-icon-wrapper">
              <Sparkles size={28} className="text-accent" />
            </div>
            <h3>3. Generate & Export</h3>
            <p>Select a stunning premium template, preview the AI-optimized content, and download your polished PDF resume.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
