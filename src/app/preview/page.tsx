"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Download, LayoutTemplate, ArrowLeft } from "lucide-react";
import { Template1 } from "@/components/templates/Template1";
import { Template2 } from "@/components/templates/Template2";
import { Template3 } from "@/components/templates/Template3";
import { Template4 } from "@/components/templates/Template4";
import { Template5 } from "@/components/templates/Template5";
import Link from "next/link";
// Dynamic import for html2pdf to prevent SSR issues
import dynamic from "next/dynamic";

const templates = [
    { id: 1, name: "Modern Professional", component: Template1 },
    { id: 2, name: "Creative Minimalist", component: Template2 },
    { id: 3, name: "Corporate Classic", component: Template3 },
    { id: 4, name: "Tech Focused", component: Template4 },
    { id: 5, name: "Standard (Single Column)", component: Template5 },
];

export default function PreviewPage() {
    const [activeTemplateId, setActiveTemplateId] = useState(1);
    const [resumeData, setResumeData] = useState<any>(null);
    const [activeView, setActiveView] = useState<'resume' | 'coverLetter'>('resume');
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // In a real app, we'd fetch the data based on ID or from a global state store like Zustand
        // For this demonstration, we'll try to grab it from local storage, which we'll save in the builder
        const storedData = sessionStorage.getItem("generatedResume");
        if (storedData) {
            setResumeData(JSON.parse(storedData));
        } else {
            // Fake data for preview if no data is present
            setResumeData({
                personalInfo: {
                    fullName: "Jane Doe",
                    email: "jane@example.com",
                    phone: "+1 (555) 019-2034",
                    location: "San Francisco, CA",
                },
                summary: "Innovative Full Stack Developer with 5 years experience building scalable web applications. Proven ability in optimizing performance and leading small teams.",
                experience: [
                    {
                        company: "Tech Solutions Inc.",
                        position: "Senior Frontend Engineer",
                        duration: "2021 - Present",
                        description: [
                            "Led the migration to Next.js, improving load times by 40%",
                            "Mentored 3 junior developers in React best practices"
                        ]
                    }
                ],
                education: [
                    {
                        institution: "University of California",
                        degree: "B.S. Computer Science",
                        duration: "2015 - 2019"
                    }
                ],
                skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
                coverLetter: "Dear Hiring Manager,\n\nI am writing to express my interest in the Senior Frontend Engineer position at Tech Solutions Inc. With over 5 years of experience building scalable web applications and leading frontend teams, I am confident in my ability to contribute to your engineering team.\n\nThroughout my career, I have consistently delivered high-performance applications. At my previous role, I led the migration to Next.js, resulting in a 40% improvement in load times and a significant boost in user engagement. I am passionate about modern frontend technologies and mentoring junior team members.\n\nThank you for considering my application. I look forward to discussing how my skills and experiences align with your team's goals.\n\nSincerely,\nJane Doe"
            });
        }
    }, []);

    const handleDownload = async () => {
        if (!resumeRef.current) return;
        setIsGeneratingPdf(true);

        try {
            // Dynamic import to avoid SSR issues with window object
            const html2pdf = (await import('html2pdf.js')).default;

            const opt = {
                margin: 0,
                filename: `${resumeData?.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
            };

            await html2pdf().set(opt).from(resumeRef.current).save();
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    if (!resumeData) return <div className="container mt-40 text-center">Loading preview...</div>;

    const ActiveTemplate = templates.find(t => t.id === activeTemplateId)?.component || Template1;

    return (
        <div className="preview-layout">
            {/* Sidebar Controls */}
            <aside className="preview-controls glass-panel">
                <Link href="/builder" className="back-link mb-4">
                    <ArrowLeft size={16} /> Back to Editor
                </Link>

                {resumeData?.coverLetter && (
                    <div className="view-toggle mb-6">
                        <h3 className="control-section-title">Document View</h3>
                        <div className="flex gap-2">
                            <button
                                className={`flex-1 py-2 text-sm rounded font-medium transition-colors ${activeView === 'resume' ? 'bg-accent text-white' : 'bg-white/10 text-secondary hover:bg-white/20'}`}
                                onClick={() => setActiveView('resume')}
                            >
                                Resume
                            </button>
                            <button
                                className={`flex-1 py-2 text-sm rounded font-medium transition-colors ${activeView === 'coverLetter' ? 'bg-accent text-white' : 'bg-white/10 text-secondary hover:bg-white/20'}`}
                                onClick={() => setActiveView('coverLetter')}
                            >
                                Cover Letter
                            </button>
                        </div>
                    </div>
                )}

                <h3 className="control-section-title"><LayoutTemplate size={18} className="text-accent" /> Choose Template</h3>

                <div className="template-selector">
                    {templates.map(template => (
                        <button
                            key={template.id}
                            className={`template-btn ${activeTemplateId === template.id ? 'active' : ''}`}
                            onClick={() => setActiveTemplateId(template.id)}
                        >
                            {template.name}
                        </button>
                    ))}
                </div>

                <button
                    className="btn-primary w-full mt-auto"
                    onClick={handleDownload}
                    disabled={isGeneratingPdf}
                >
                    {isGeneratingPdf ? "Preparing PDF..." : <><Download size={18} /> Download PDF</>}
                </button>
            </aside>

            {/* Resume Preview Box */}
            <main className="preview-canvas-container">
                <div className="preview-canvas" ref={resumeRef}>
                    {activeView === 'resume' ? (
                        <ActiveTemplate data={resumeData} />
                    ) : (
                        <div className="cover-letter-preview p-12 bg-white text-black min-h-[1056px] w-full max-w-[816px] shadow-sm mx-auto font-serif">
                            <div className="mb-12">
                                <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-gray-800 pb-4 mb-4">
                                    {resumeData.personalInfo.fullName}
                                </h1>
                                <div className="text-sm text-gray-600 flex flex-col gap-1">
                                    {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                                    {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                                    {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                                </div>
                            </div>
                            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-[15px]">
                                {resumeData.coverLetter}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
