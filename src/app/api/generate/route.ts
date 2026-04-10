import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const ResumeSchema = z.object({
    summary: z.string().describe('Professional summary tailored to the job description. Retain user selected summary if provided.'),
    experience: z.array(z.object({
        company: z.string(),
        position: z.string(),
        duration: z.string(),
        description: z.array(z.string()).describe('List of bullet points optimized for the job description')
    })),
    education: z.array(z.object({
        institution: z.string(),
        degree: z.string(),
        duration: z.string()
    })),
    skills: z.array(z.string()).describe('List of relevant skills matching the job description'),
    projects: z.array(z.object({
        name: z.string(),
        description: z.array(z.string()).describe('List of bullet points describing the project and your role'),
        technologies: z.array(z.string()).describe('List of technologies used in the project')
    })).optional(),
    certifications: z.array(z.object({
        name: z.string(),
        issuer: z.string(),
        year: z.string()
    })).optional(),
    languages: z.array(z.string()).optional(),
    coverLetter: z.string().describe('A professional cover letter addressed to the hiring manager, matching the job description and user profile, if requested or context provided.').optional()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { formData } = body;

        const prompt = `
      You are an expert resume writer. Act as a professional resume builder API.
      Given the user's structured experience, education, skills, summary, cover letter context and a target job description,
      generate a highly professional resume and optionally a cover letter tailored to the job description.

      Target Job Description:
      ${formData.jobDescription || "Not provided (optimize for general roles based on experience)"}
      
      User Selected Summary:
      ${formData.summary || "Not provided (generate a new one)"}

      User Raw Experience:
      ${typeof formData.experience === 'string' ? formData.experience : JSON.stringify(formData.experience, null, 2)}

      User Raw Education:
      ${typeof formData.education === 'string' ? formData.education : JSON.stringify(formData.education, null, 2)}

      User Raw Skills:
      ${formData.skills}
      
      User Raw Projects:
      ${typeof formData.projects === 'string' ? formData.projects : JSON.stringify(formData.projects, null, 2)}
      
      User Certifications:
      ${typeof formData.certifications === 'string' ? formData.certifications : JSON.stringify(formData.certifications, null, 2)}
      
      User Languages:
      ${formData.languages || "Not provided"}

      User Cover Letter Request/Context:
      ${formData.coverLetter || "Not provided (generate a general cover letter if applicable, or leave empty)"}
      
      Extract all relevant details and rewrite them into a compelling professional summary, 
      action-oriented experience bullets, structured education, a refined list of skills, 
      projects, certifications, languages, and an optional cover letter. 
      Ensure the output exactly matches the JSON schema requested.
    `;

        // Explicitly initialize the provider with the key to avoid env var scope issues in some Next.js setups
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

        if (!apiKey) {
            throw new Error("Missing Google Gemini API Key. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env file.");
        }

        const googleAI = google.bind({
            apiKey: apiKey,
        });

        // Attempt to use the AI SDK to generate the resume content.
        const { object } = await generateObject({
            model: googleAI('gemini-2.5-flash'), // We can use flash for faster structured output
            schema: ResumeSchema,
            prompt: prompt,
        });

        return NextResponse.json({ success: true, data: object });

    } catch (error: any) {
        console.error('Error generating resume:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to generate resume. Please verify your API key.' },
            { status: 500 }
        );
    }
}
