export type ResumeData = {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin?: string;
        portfolio?: string;
    };
    summary: string;
    experience: {
        company: string;
        position: string;
        duration: string;
        description: string[];
    }[];
    education: {
        institution: string;
        degree: string;
        duration: string;
    }[];
    skills: string[];
    projects?: {
        name: string;
        description: string[];
        technologies: string[];
    }[];
};

export const Template1 = ({ data }: { data: ResumeData }) => {
    return (
        <div className="resume-template modern-professional">
            <header className="resume-header">
                <h1>{data.personalInfo.fullName}</h1>
                <div className="contact-info">
                    <span>{data.personalInfo.email}</span> •
                    <span>{data.personalInfo.phone}</span> •
                    <span>{data.personalInfo.location}</span>
                </div>
            </header>

            <div className="resume-body">
                <section className="resume-section">
                    <h2>Professional Summary</h2>
                    <p>{data.summary}</p>
                </section>

                <section className="resume-section">
                    <h2>Experience</h2>
                    <div className="experience-list">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="experience-item">
                                <div className="experience-header">
                                    <h3>{exp.position}</h3>
                                    <span className="duration">{exp.duration}</span>
                                </div>
                                <h4>{exp.company}</h4>
                                <ul>
                                    {exp.description.map((desc, j) => (
                                        <li key={j}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="resume-section split-section">
                    <div className="education-column">
                        <h2>Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="education-item">
                                <h3>{edu.degree}</h3>
                                <h4>{edu.institution}</h4>
                                <span className="duration">{edu.duration}</span>
                            </div>
                        ))}
                    </div>
                    <div className="skills-column">
                        <h2>Skills</h2>
                        <div className="skills-grid">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {data.projects && data.projects.length > 0 && (
                    <section className="resume-section">
                        <h2>Projects</h2>
                        <div className="projects-list">
                            {data.projects.map((project, i) => (
                                <div key={i} className="project-item">
                                    <div className="project-header">
                                        <h3>{project.name}</h3>
                                        <div className="tech-stack">
                                            {project.technologies.map((tech, j) => (
                                                <span key={j} className="tech-pill">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <ul>
                                        {project.description.map((desc, j) => (
                                            <li key={j}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
