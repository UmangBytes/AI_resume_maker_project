import { ResumeData } from './Template1';

export const Template4 = ({ data }: { data: ResumeData }) => {
    return (
        <div className="resume-template tech-focused">
            <header className="resume-header code-style">
                <div className="command-prompt">~ $ whoami</div>
                <h1>{data.personalInfo.fullName}</h1>
                <div className="contact-tags">
                    <span className="tag">Email: {data.personalInfo.email}</span>
                    <span className="tag">Phone: {data.personalInfo.phone}</span>
                    <span className="tag">Loc: {data.personalInfo.location}</span>
                </div>
            </header>

            <div className="terminal-body">
                <section className="resume-section">
                    <h2><span className="prompt-arrow">&gt;</span> ./show-summary.sh</h2>
                    <p className="terminal-text">{data.summary}</p>
                </section>

                <section className="resume-section">
                    <h2><span className="prompt-arrow">&gt;</span> cat skills.json</h2>
                    <div className="skills-grid-tech">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="tech-badge">{skill}</span>
                        ))}
                    </div>
                </section>

                <section className="resume-section">
                    <h2><span className="prompt-arrow">&gt;</span> ls -la ./experience/</h2>
                    <div className="experience-list">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="tech-experience-item">
                                <div className="tech-exp-header">
                                    <h3>{exp.position}</h3>
                                    <span className="tech-company">@ {exp.company}</span>
                                    <span className="duration">[{exp.duration}]</span>
                                </div>
                                <ul className="terminal-list">
                                    {exp.description.map((desc, j) => (
                                        <li key={j}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="resume-section">
                    <h2><span className="prompt-arrow">&gt;</span> ./get-education.sh</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="tech-education-item">
                            <h3>{edu.degree}</h3>
                            <span className="tech-company">{edu.institution}</span>
                            <span className="duration">[{edu.duration}]</span>
                        </div>
                    ))}
                </section>

                {data.projects && data.projects.length > 0 && (
                    <section className="resume-section">
                        <h2><span className="prompt-arrow">&gt;</span> ls ./projects/</h2>
                        <div className="projects-list-tech">
                            {data.projects.map((project, i) => (
                                <div key={i} className="tech-project-item">
                                    <h3>{project.name}</h3>
                                    <div className="tech-stack-terminal">
                                        {project.technologies.map((tech, j) => (
                                            <span key={j} className="tech-badge-sm">--{tech}</span>
                                        ))}
                                    </div>
                                    <ul className="terminal-list">
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
