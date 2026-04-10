"use client";

import { useState } from "react";
import { Sparkles, Briefcase, GraduationCap, User, Wrench, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
    const [activeTab, setActiveTab] = useState("personal");
    const [isGenerating, setIsGenerating] = useState(false);

    const [formData, setFormData] = useState({
        personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            portfolio: ""
        },
        experience: "", // Will allow free text for simplicity, AI will parse
        education: "",
        skills: "",
        projects: "",
        jobDescription: ""
    });

    const handleInputChange = (section: string, field: string, value: string) => {
        if (section === 'root') {
            setFormData(prev => ({ ...prev, [field]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section as keyof typeof formData]: {
                    ...(prev[section as keyof typeof formData] as object),
                    [field]: value
                }
            }));
        }
    };

    const router = useRouter();

    const handleGenerate = async () => {
        setIsGenerating(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formData }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to generate resume');
            }

            // Merge user personal details with AI generated details
            const completeResumeData = {
                personalInfo: formData.personalInfo,
                ...result.data,
            };

            // Store in session storage to retrieve in preview page
            sessionStorage.setItem('generatedResume', JSON.stringify(completeResumeData));

            // Navigate to preview page
            router.push('/preview');
        } catch (error: any) {
            console.error(error);
            alert(error.message || 'An error occurred during generation.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="container">
            <div className="builder-header text-center animate-fade-in">
                <h1 className="gradient-text">Resume Builder</h1>
                <p className="text-secondary mt-2">Provide your details and the target job description to get started.</p>
            </div>

            <div className="builder-layout animate-fade-in animate-delay-1">
                {/* Navigation Sidebar */}
                <aside className="builder-sidebar glass-panel">
                    <nav className="tab-menu">
                        <button
                            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('personal')}
                        >
                            <User size={18} /> Personal Info
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                            onClick={() => setActiveTab('experience')}
                        >
                            <Briefcase size={18} /> Experience
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                            onClick={() => setActiveTab('education')}
                        >
                            <GraduationCap size={18} /> Education
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                            onClick={() => setActiveTab('skills')}
                        >
                            <Wrench size={18} /> Skills
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <Briefcase size={18} /> Projects
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'job' ? 'active' : ''}`}
                            onClick={() => setActiveTab('job')}
                        >
                            <Sparkles size={18} /> Job Description
                        </button>
                    </nav>

                    <button
                        className="btn-primary generate-btn w-full mt-auto"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <><Loader2 className="animate-spin" size={20} /> Generating...</>
                        ) : (
                            <><Sparkles size={20} /> Generate AI Resume</>
                        )}
                    </button>
                </aside>

                {/* Content Area */}
                <div className="builder-content glass-panel">
                    {activeTab === 'personal' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><User size={24} className="text-accent" /> Personal Information</h2>
                            <div className="input-grid">
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input type="text" className="input-field" placeholder="John Doe"
                                        value={formData.personalInfo.fullName}
                                        onChange={e => handleInputChange('personalInfo', 'fullName', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Email</label>
                                    <input type="email" className="input-field" placeholder="john@example.com"
                                        value={formData.personalInfo.email}
                                        onChange={e => handleInputChange('personalInfo', 'email', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Phone</label>
                                    <input type="tel" className="input-field" placeholder="(555) 123-4567"
                                        value={formData.personalInfo.phone}
                                        onChange={e => handleInputChange('personalInfo', 'phone', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Location</label>
                                    <input type="text" className="input-field" placeholder="New York, NY"
                                        value={formData.personalInfo.location}
                                        onChange={e => handleInputChange('personalInfo', 'location', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Briefcase size={24} className="text-accent" /> Professional Experience</h2>
                            <p className="text-secondary mb-4 text-sm">Paste your work history. Our AI will extract and structure it.</p>
                            <textarea
                                className="input-field textarea-large"
                                placeholder="E.g., Senior Software Engineer at Tech Corp (2020-Present). Led a team of 5 to develop..."
                                value={formData.experience}
                                onChange={e => handleInputChange('root', 'experience', e.target.value)}
                            />
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><GraduationCap size={24} className="text-accent" /> Education</h2>
                            <textarea
                                className="input-field textarea-large"
                                placeholder="E.g., BS in Computer Science, University of Technology (2016-2020)"
                                value={formData.education}
                                onChange={e => handleInputChange('root', 'education', e.target.value)}
                            />
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Wrench size={24} className="text-accent" /> Core Skills</h2>
                            <textarea
                                className="input-field textarea-large"
                                placeholder="React, Next.js, TypeScript, Python, AWS..."
                                value={formData.skills}
                                onChange={e => handleInputChange('root', 'skills', e.target.value)}
                            />
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Briefcase size={24} className="text-accent" /> Key Projects</h2>
                            <p className="text-secondary mb-4 text-sm">List your significant projects, their impact, and the technologies used.</p>
                            <textarea
                                className="input-field textarea-large"
                                placeholder="E.g., E-commerce App: Built a full-stack store with Next.js and Stripe. Handled 1k+ users..."
                                value={formData.projects}
                                onChange={e => handleInputChange('root', 'projects', e.target.value)}
                            />
                        </div>
                    )}

                    {activeTab === 'job' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Sparkles size={24} className="text-accent" /> Target Job Description</h2>
                            <p className="text-secondary mb-4 text-sm">Paste the exact job description you are applying for. The AI will tailor your resume to match the required skills and keywords.</p>
                            <textarea
                                className="input-field textarea-xlarge"
                                placeholder="Paste Job Description here..."
                                value={formData.jobDescription}
                                onChange={e => handleInputChange('root', 'jobDescription', e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
