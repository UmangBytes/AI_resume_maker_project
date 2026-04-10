import { ResumeData } from './Template1';

export const Template5 = ({ data }: { data: ResumeData }) => {
    return (
        <div className="resume-template standard-single">
            <header className="resume-header">
                <h1>{data.personalInfo.fullName}</h1>
                <div className="contact-info">
                    {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
                    {data.personalInfo.linkedin && ` • ${data.personalInfo.linkedin}`}
                    {data.personalInfo.portfolio && ` • ${data.personalInfo.portfolio}`}
                </div>
            </header>

            <section className="resume-section">
                <h2>Professional Summary</h2>
                <div className="section-body">
                    <p>{data.summary}</p>
                </div>
            </section>

            <section className="resume-section">
                <h2>Experience</h2>
                <div className="section-body">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="experience-item">
                            <div className="item-header">
                                <h3>{exp.position}</h3>
                                <span className="duration">{exp.duration}</span>
                            </div>
                            <h4>{exp.company}</h4>
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
                <h2>Education</h2>
                <div className="section-body">
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
                <h2>Skills</h2>
                <div className="section-body">
                    <ul className="skills-inline-list">
                        {data.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {data.projects && data.projects.length > 0 && (
                <section className="resume-section">
                    <h2>Projects</h2>
                    <div className="section-body">
                        {data.projects.map((project, i) => (
                            <div key={i} className="project-item mb-4">
                                <div className="item-header">
                                    <h3>{project.name}</h3>
                                    <span className="tech-stack-standard">[{project.technologies.join(', ')}]</span>
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
