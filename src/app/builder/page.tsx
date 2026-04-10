"use client";

import { useState } from "react";
import { Sparkles, Briefcase, GraduationCap, User, Wrench, Loader2, FileText, AlignLeft, Plus, Trash2, Award, Languages } from "lucide-react";
import { useRouter } from "next/navigation";

const PREDEFINED_SKILLS = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
    "Java", "C++", "C#", "SQL", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git",
    "HTML/CSS", "Tailwind CSS", "Machine Learning", "Data Analysis", "Agile", "Linux",
    "GraphQL", "Redis", "Ruby on Rails", "Cybersecurity", "UI/UX Design"
];

const PREDEFINED_SUMMARIES = [
    "Experienced software engineer with a track record of delivering scalable applications and a passion for clean code.",
    "Results-driven professional with strong analytical skills and a history of leading successful cross-functional teams.",
    "Detail-oriented developer specializing in frontend technologies, dedicated to creating intuitive responsive user experiences.",
    "Innovative data scientist with expertise in machine learning and predictive modeling, focused on deriving actionable insights.",
    "Highly motivated fresh graduate with strong foundational knowledge in software development, eager to contribute and learn.",
    "Dynamic product manager experienced in full product lifecycles, adept at bridging the gap between engineering and business.",
    "Creative UX/UI designer committed to crafting engaging digital experiences and translating user research into elegant solutions."
];

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
        experience: [{ company: "", position: "", duration: "", description: "" }],
        education: [{ institution: "", degree: "", duration: "" }],
        skills: "",
        projects: [{ name: "", technologies: "", description: "" }],
        certifications: [{ name: "", issuer: "", year: "" }],
        languages: [{ language: "", proficiency: "" }],
        jobDescription: "",
        summary: "",
        coverLetter: ""
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

    const handleArrayChange = (section: string, index: number, field: string, value: string) => {
        setFormData(prev => {
            const newArray = [...(prev[section as keyof typeof formData] as any[])];
            newArray[index] = { ...newArray[index], [field]: value };
            return { ...prev, [section]: newArray };
        });
    };

    const addArrayItem = (section: keyof typeof formData, emptyItem: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...(prev[section] as any[]), emptyItem]
        }));
    };

    const removeArrayItem = (section: keyof typeof formData, index: number) => {
        setFormData(prev => {
            const newArray = [...(prev[section] as any[])];
            newArray.splice(index, 1);
            return { ...prev, [section]: newArray };
        });
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

            const completeResumeData = {
                personalInfo: formData.personalInfo,
                ...result.data,
            };

            sessionStorage.setItem('generatedResume', JSON.stringify(completeResumeData));
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
                <p className="text-secondary mt-2">Build a structured, professional resume tailored for your next job.</p>
            </div>

            <div className="builder-layout animate-fade-in animate-delay-1">
                <aside className="builder-sidebar glass-panel overflow-y-auto max-h-[80vh]">
                    <nav className="tab-menu space-y-1">
                        <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
                            <User size={18} /> Personal Info
                        </button>
                        <button className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => setActiveTab('summary')}>
                            <AlignLeft size={18} /> Summary
                        </button>
                        <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
                            <Briefcase size={18} /> Experience
                        </button>
                        <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
                            <GraduationCap size={18} /> Education
                        </button>
                        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
                            <Wrench size={18} /> Skills
                        </button>
                        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                            <Briefcase size={18} /> Projects
                        </button>
                        <button className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
                            <Award size={18} /> Certifications
                        </button>
                        <button className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`} onClick={() => setActiveTab('languages')}>
                            <Languages size={18} /> Languages
                        </button>
                        <button className={`tab-btn ${activeTab === 'job' ? 'active' : ''}`} onClick={() => setActiveTab('job')}>
                            <Sparkles size={18} /> Job Description
                        </button>
                        <button className={`tab-btn ${activeTab === 'coverLetter' ? 'active' : ''}`} onClick={() => setActiveTab('coverLetter')}>
                            <FileText size={18} /> Cover Letter
                        </button>
                    </nav>

                    <button className="btn-primary generate-btn w-full mt-6" onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? <><Loader2 className="animate-spin" size={20} /> Generating...</> : <><Sparkles size={20} /> Generate AI Resume</>}
                    </button>
                </aside>

                <div className="builder-content glass-panel overflow-y-auto max-h-[80vh]">
                    {activeTab === 'personal' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><User size={24} className="text-accent" /> Personal Information</h2>
                            <div className="input-grid">
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input type="text" className="input-field" placeholder="John Doe" value={formData.personalInfo.fullName} onChange={e => handleInputChange('personalInfo', 'fullName', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Email</label>
                                    <input type="email" className="input-field" placeholder="john@example.com" value={formData.personalInfo.email} onChange={e => handleInputChange('personalInfo', 'email', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Phone</label>
                                    <input type="tel" className="input-field" placeholder="(555) 123-4567" value={formData.personalInfo.phone} onChange={e => handleInputChange('personalInfo', 'phone', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Location</label>
                                    <input type="text" className="input-field" placeholder="New York, NY" value={formData.personalInfo.location} onChange={e => handleInputChange('personalInfo', 'location', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'summary' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><AlignLeft size={24} className="text-accent" /> Professional Summary</h2>
                            <p className="text-secondary mb-4 text-sm">Select a pre-written summary or write your own.</p>
                            <div className="mb-4 flex flex-col gap-2">
                                {PREDEFINED_SUMMARIES.map((sum, index) => (
                                    <div key={index} className={`p-3 rounded border cursor-pointer transition-colors ${formData.summary === sum ? 'border-accent bg-accent/10' : 'border-white/10 hover:border-white/30'}`} onClick={() => handleInputChange('root', 'summary', sum)}>
                                        <p className="text-sm">{sum}</p>
                                    </div>
                                ))}
                            </div>
                            <textarea className="input-field textarea-large mt-4" placeholder="Or write your custom summary here..." value={formData.summary} onChange={e => handleInputChange('root', 'summary', e.target.value)} />
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Briefcase size={24} className="text-accent" /> Professional Experience</h2>
                            {formData.experience.map((exp, index) => (
                                <div key={index} className="mb-6 p-5 border border-white/10 rounded-xl relative bg-white/5">
                                    <button className="absolute top-4 right-4 text-secondary hover:text-red-400" onClick={() => removeArrayItem('experience', index)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="input-grid !grid-cols-1 md:!grid-cols-2">
                                        <div className="input-group">
                                            <label>Company</label>
                                            <input type="text" className="input-field" placeholder="Ex: Tech Corp" value={exp.company} onChange={e => handleArrayChange('experience', index, 'company', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Position</label>
                                            <input type="text" className="input-field" placeholder="Ex: Senior Developer" value={exp.position} onChange={e => handleArrayChange('experience', index, 'position', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Duration</label>
                                            <input type="text" className="input-field" placeholder="Ex: Jan 2021 - Present" value={exp.duration} onChange={e => handleArrayChange('experience', index, 'duration', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="input-group mt-4">
                                        <label>Description</label>
                                        <textarea className="input-field h-24" placeholder="Describe your achievements..." value={exp.description} onChange={e => handleArrayChange('experience', index, 'description', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                            <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium py-2 px-4 border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors" onClick={() => addArrayItem('experience', { company: "", position: "", duration: "", description: "" })}>
                                <Plus size={16} /> Add Experience
                            </button>
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><GraduationCap size={24} className="text-accent" /> Education</h2>
                            {formData.education.map((edu, index) => (
                                <div key={index} className="mb-6 p-5 border border-white/10 rounded-xl relative bg-white/5">
                                    <button className="absolute top-4 right-4 text-secondary hover:text-red-400" onClick={() => removeArrayItem('education', index)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="input-grid !grid-cols-1 md:!grid-cols-2">
                                        <div className="input-group">
                                            <label>Institution</label>
                                            <input type="text" className="input-field" placeholder="Ex: University of Technology" value={edu.institution} onChange={e => handleArrayChange('education', index, 'institution', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Degree</label>
                                            <input type="text" className="input-field" placeholder="Ex: BS Computer Science" value={edu.degree} onChange={e => handleArrayChange('education', index, 'degree', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Duration</label>
                                            <input type="text" className="input-field" placeholder="Ex: 2016 - 2020" value={edu.duration} onChange={e => handleArrayChange('education', index, 'duration', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium py-2 px-4 border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors" onClick={() => addArrayItem('education', { institution: "", degree: "", duration: "" })}>
                                <Plus size={16} /> Add Education
                            </button>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Wrench size={24} className="text-accent" /> Core Skills</h2>
                            <p className="text-secondary mb-4 text-sm">Select skills from the list or type your own separated by commas.</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {PREDEFINED_SKILLS.map(skill => {
                                    const isSelected = formData.skills.toLowerCase().includes(skill.toLowerCase());
                                    return (
                                        <button key={skill} onClick={() => {
                                            const currentSkills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
                                            if (isSelected) {
                                                const filtered = currentSkills.filter(s => s.toLowerCase() !== skill.toLowerCase());
                                                handleInputChange('root', 'skills', filtered.join(', '));
                                            } else {
                                                handleInputChange('root', 'skills', [...currentSkills, skill].join(', '));
                                            }
                                        }} className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-200 ${isSelected ? 'bg-accent text-white border-accent shadow-[0_0_10px_rgba(var(--accent-color),0.3)]' : 'bg-transparent text-secondary border-white/20 hover:border-white/50 hover:text-white'}`}>
                                            {skill}
                                        </button>
                                    );
                                })}
                            </div>
                            <textarea className="input-field textarea-large" placeholder="React, Next.js, TypeScript..." value={formData.skills} onChange={e => handleInputChange('root', 'skills', e.target.value)} />
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Briefcase size={24} className="text-accent" /> Key Projects</h2>
                            {formData.projects.map((proj, index) => (
                                <div key={index} className="mb-6 p-5 border border-white/10 rounded-xl relative bg-white/5">
                                    <button className="absolute top-4 right-4 text-secondary hover:text-red-400" onClick={() => removeArrayItem('projects', index)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="input-grid !grid-cols-1 md:!grid-cols-2">
                                        <div className="input-group">
                                            <label>Project Name</label>
                                            <input type="text" className="input-field" placeholder="Ex: E-commerce Platform" value={proj.name} onChange={e => handleArrayChange('projects', index, 'name', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Technologies Used</label>
                                            <input type="text" className="input-field" placeholder="Ex: React, Node.js, MongoDB" value={proj.technologies} onChange={e => handleArrayChange('projects', index, 'technologies', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="input-group mt-4">
                                        <label>Description</label>
                                        <textarea className="input-field h-24" placeholder="Describe the project and your role..." value={proj.description} onChange={e => handleArrayChange('projects', index, 'description', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                            <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium py-2 px-4 border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors" onClick={() => addArrayItem('projects', { name: "", technologies: "", description: "" })}>
                                <Plus size={16} /> Add Project
                            </button>
                        </div>
                    )}

                    {activeTab === 'certifications' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Award size={24} className="text-accent" /> Certifications</h2>
                            {formData.certifications.map((cert, index) => (
                                <div key={index} className="mb-6 p-5 border border-white/10 rounded-xl relative bg-white/5">
                                    <button className="absolute top-4 right-4 text-secondary hover:text-red-400" onClick={() => removeArrayItem('certifications', index)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="input-grid !grid-cols-1 md:!grid-cols-3">
                                        <div className="input-group">
                                            <label>Name</label>
                                            <input type="text" className="input-field" placeholder="Ex: AWS Certified Solutions Architect" value={cert.name} onChange={e => handleArrayChange('certifications', index, 'name', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Issuer</label>
                                            <input type="text" className="input-field" placeholder="Ex: Amazon Web Services" value={cert.issuer} onChange={e => handleArrayChange('certifications', index, 'issuer', e.target.value)} />
                                        </div>
                                        <div className="input-group">
                                            <label>Year</label>
                                            <input type="text" className="input-field" placeholder="Ex: 2023" value={cert.year} onChange={e => handleArrayChange('certifications', index, 'year', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium py-2 px-4 border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors" onClick={() => addArrayItem('certifications', { name: "", issuer: "", year: "" })}>
                                <Plus size={16} /> Add Certification
                            </button>
                        </div>
                    )}

                    {activeTab === 'languages' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Languages size={24} className="text-accent" /> Languages</h2>
                            {formData.languages.map((lang, index) => (
                                <div key={index} className="mb-4 p-4 border border-white/10 rounded-lg relative bg-white/5 flex gap-4 pr-12 items-end">
                                    <button className="absolute top-1/2 -translate-y-1/2 right-4 text-secondary hover:text-red-400" onClick={() => removeArrayItem('languages', index)}>
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="input-group flex-1 !mb-0">
                                        <label>Language</label>
                                        <input type="text" className="input-field" placeholder="Ex: English" value={lang.language} onChange={e => handleArrayChange('languages', index, 'language', e.target.value)} />
                                    </div>
                                    <div className="input-group flex-1 !mb-0">
                                        <label>Proficiency</label>
                                        <input type="text" className="input-field" placeholder="Ex: Native, Fluent, Beginner" value={lang.proficiency} onChange={e => handleArrayChange('languages', index, 'proficiency', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                            <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium py-2 px-4 border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors mt-4" onClick={() => addArrayItem('languages', { language: "", proficiency: "" })}>
                                <Plus size={16} /> Add Language
                            </button>
                        </div>
                    )}

                    {activeTab === 'job' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><Sparkles size={24} className="text-accent" /> Target Job Description</h2>
                            <p className="text-secondary mb-4 text-sm">Paste the exact job description you are applying for. The AI will tailor your resume to match the required skills and keywords.</p>
                            <textarea className="input-field textarea-xlarge" placeholder="Paste Job Description here..." value={formData.jobDescription} onChange={e => handleInputChange('root', 'jobDescription', e.target.value)} />
                        </div>
                    )}

                    {activeTab === 'coverLetter' && (
                        <div className="form-section animate-fade-in">
                            <h2 className="section-title-sm"><FileText size={24} className="text-accent" /> Cover Letter Context</h2>
                            <p className="text-secondary mb-4 text-sm">Provide context or specific details you want in your cover letter. The AI will generate a professional version.</p>
                            <textarea className="input-field textarea-xlarge" placeholder="E.g., Emphasize my leadership in AWS migrations and passion for healthcare tech..." value={formData.coverLetter} onChange={e => handleInputChange('root', 'coverLetter', e.target.value)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
