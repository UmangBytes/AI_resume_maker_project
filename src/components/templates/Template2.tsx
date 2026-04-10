import { ResumeData } from './Template1';

export const Template2 = ({ data }: { data: ResumeData }) => {
    return (
        <div className="resume-template creative-minimalist">
            <div className="sidebar">
                <div className="personal-details">
                    <h1>{data.personalInfo.fullName}</h1>
                    <div className="contact-block">
                        <p>{data.personalInfo.email}</p>
                        <p>{data.personalInfo.phone}</p>
                        <p>{data.personalInfo.location}</p>
                    </div>
                </div>

                <div className="skills-section">
                    <h2>Expertise</h2>
                    <ul className="minimal-skills">
                        {data.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="main-content">
                <section className="resume-section">
                    <h2>About Me</h2>
                    <p className="summary-text">{data.summary}</p>
                </section>

                <section className="resume-section">
                    <h2>Experience</h2>
                    <div className="timeline">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <span className="duration">{exp.duration}</span>
                                    <h3>{exp.position}</h3>
                                    <h4>{exp.company}</h4>
                                    <ul>
                                        {exp.description.map((desc, j) => (
                                            <li key={j}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="resume-section">
                    <h2>Education</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} className="education-block">
                            <h3>{edu.degree}</h3>
                            <p>{edu.institution} | {edu.duration}</p>
                        </div>
                    ))}
                </section>

                {data.projects && data.projects.length > 0 && (
                    <section className="resume-section">
                        <h2>Projects</h2>
                        <div className="projects-grid-minimal">
                            {data.projects.map((project, i) => (
                                <div key={i} className="project-card">
                                    <h3>{project.name}</h3>
                                    <p className="tech-list-sm">{project.technologies.join(', ')}</p>
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
