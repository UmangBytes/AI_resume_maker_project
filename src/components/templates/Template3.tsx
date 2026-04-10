import { ResumeData } from './Template1';

export const Template3 = ({ data }: { data: ResumeData }) => {
    return (
        <div className="resume-template corporate-classic">
            <header className="resume-header">
                <h1>{data.personalInfo.fullName.toUpperCase()}</h1>
                <div className="contact-info">
                    {data.personalInfo.location} | {data.personalInfo.phone} | {data.personalInfo.email}
                    {data.personalInfo.linkedin && ` | ${data.personalInfo.linkedin}`}
                </div>
            </header>

            <section className="resume-section">
                <h2>SUMMARY</h2>
                <div className="section-content">
                    <p>{data.summary}</p>
                </div>
            </section>

            <section className="resume-section">
                <h2>EXPERIENCE</h2>
                <div className="section-content">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="experience-item">
                            <div className="item-header">
                                <h3>{exp.position} - {exp.company}</h3>
                                <span className="duration">{exp.duration}</span>
                            </div>
                            <ul className="bullet-list">
                                {exp.description.map((desc, j) => (
                                    <li key={j}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="resume-section">
                <h2>EDUCATION</h2>
                <div className="section-content">
                    {data.education.map((edu, i) => (
                        <div key={i} className="education-item flex-between">
                            <div>
                                <h3>{edu.degree}</h3>
                                <h4>{edu.institution}</h4>
                            </div>
                            <span className="duration">{edu.duration}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="resume-section">
                <h2>SKILLS</h2>
                <div className="section-content">
                    <p className="skills-inline">{data.skills.join(' • ')}</p>
                </div>
            </section>

            {data.projects && data.projects.length > 0 && (
                <section className="resume-section">
                    <h2>PROJECTS</h2>
                    <div className="section-content">
                        {data.projects.map((project, i) => (
                            <div key={i} className="project-item mb-4">
                                <div className="item-header">
                                    <h3>{project.name.toUpperCase()}</h3>
                                    <span className="tech-stack-classic">{project.technologies.join(' | ')}</span>
                                </div>
                                <ul className="bullet-list">
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
    );
};
