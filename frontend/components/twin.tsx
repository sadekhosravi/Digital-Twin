'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowUpRight, Link2, Sparkles} from 'lucide-react';


const skillGroups = [{ title: 'AI / LLM / Generative AI', items: ['LLMs', 'Agentic AI', 'LangGraph', 'LangChain', 'Context Engineering', 'Prompt Engineering', 'Fine-Tuning', 'Hugging Face', 'Agentic RAG', 'MCP', 'Knowledge Graphs', 'Vector Embeddings', 'Multimodal AI Systems', 'Voice Agents'] }, { title: 'AI Infrastructure / Evaluation', items: ['Evaluation', 'Harness', 'A/B Testing', 'LangSmith', 'MLOps', 'Cloud Deployment'] }, { title: 'Machine Learning / Deep Learning', items: ['PyTorch', 'Computer Vision'] }, { title: 'Backend / Data', items: ['Python', 'FastAPI', 'SQL', 'FAISS', 'Neo4j'] }, { title: 'Cloud / DevOps / Infrastructure', items: ['AWS', 'Docker', 'CI/CD', 'GitHub Actions', 'Terraform', 'Kubernetes'] }, { title: 'Voice / Real-Time AI', items: ['LiveKit'] }]
const logoSkills = [{ name: 'Python', icon: 'python' }, { name: 'LangGraph', icon: 'langgraph' }, { name: 'LangChain', icon: 'langchain' }, { name: 'Hugging Face', icon: 'huggingface' }, { name: 'FAISS', icon: 'meta' }, { name: 'Neo4j', icon: 'neo4j' }, { name: 'PyTorch', icon: 'pytorch' }, { name: 'FastAPI', icon: 'fastapi' }, { name: 'SQL', icon: 'postgresql' }, { name: 'AWS', icon: 'amazonwebservices', cdn: 'https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/amazonwebservices.svg' }, { name: 'Docker', icon: 'docker' }, { name: 'GitHub Actions', icon: 'githubactions' }, { name: 'Terraform', icon: 'terraform' }, { name: 'Kubernetes', icon: 'kubernetes' }, { name: 'LiveKit', icon: 'livekit' }] as Array<{name:string;icon:string;cdn?:string}>

const projects = [
  { name: 'Steward', type: 'AI / Agent Systems', description: 'A customer service agent that can be trusted with the records. It serves customers under a company policy it must actually follow, and no action reaches the database that a second agent has not authorised. Evaluated against tau2-bench.', tags: ['Python', 'LLMs', 'Multy Agentic System', 'Harness'], href: 'https://github.com/sadekhosravi/Steward' },
  { name: 'Role Duty', type: 'RAG Systems', description: 'An agentic RAG system that combines Chunkless RAG, Graph RAG, and a LangGraph multi-agent workflow to answer complex responsibility and escalation questions from organizational documents with grounded, verified citations.', tags: ['AI', 'Agentic RAG', 'Knowledge Graphs', 'MCP'], href: 'https://github.com/sadekhosravi/Role-Duty' },
  { name: 'MediNote', type: 'Product Engineering', description: 'A production-focused AI SaaS application with authentication, subscription-based access, and streaming LLM responses, built with Next.js and FastAPI and deployed using Docker and AWS Lambda.', tags: ['Next.js', 'TypeScript', 'Postgres', 'AWS', 'Docker'], href: 'https://github.com/sadekhosravi/MediNote' },
  { name: 'Digital Twin', type: 'Personal AI / Portfolio', description: 'An AI-powered personal portfolio featuring a Digital Twin that represents me, with persistent memory and a serverless AWS backend. Built with AWS S3, Lambda, API Gateway, and CloudFront.', tags: ['Next.js', 'AI', 'AWS', 'Portfolio'], href: 'https://github.com/sadekhosravi/Digital-Twin' },
]


interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const conversationRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        const el = conversationRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('https://q5o2zuj7z4.execute-api.eu-north-1.amazonaws.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
    <main className="site-shell">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a className="wordmark" href="#top"><span className="mark">S</span><span className="wordmark-name">Khosravi</span></a>
        <div className="nav-links"><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact</a></div>
        <a className="status" href="https://www.linkedin.com/in/sade-khosravi" target="_blank" rel="noreferrer"><span /> Open to conversations</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Digital twin / 2026</p>
          <h1>Curious about<br /><em>intelligence.</em></h1>
          <p className="hero-lede">I&apos;m Sadegh — an AI-oriented Cognitive Science student at Osnabrück University, building at the edge of human understanding and intelligent systems.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={16} /></a><a className="text-link" href="https://www.linkedin.com/in/sade-khosravi" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="twin-panel" aria-label="Digital twin chat preview">
          <div className="panel-top"><span className="live"><i /> Live twin</span><span className="panel-label">Ask me anything</span><Sparkles size={15} /></div>
          <div className="conversation" ref={conversationRef}>
            {messages.length === 0 ? (
              <div className="message message-twin"><span className="avatar">S</span><div><span className="message-label">Sadegh&apos;s twin</span><p>Hey, I&apos;m a living index of Sadegh&apos;s work, thinking, and curiosity. What would you like to explore?</p></div></div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="message" style={{ marginTop: 16 }}>
                  <span className="avatar">{m.role === 'user' ? 'Y' : 'S'}</span>
                  <div><span className="message-label">{m.role === 'user' ? 'You' : "Sadegh's twin"}</span><p className="whitespace-pre-wrap">{m.content}</p></div>
                </div>
              ))
            )}
            {isLoading && <div className="message" style={{ marginTop: 16 }}><span className="avatar">S</span><div><p>Thinking…</p></div></div>}
            <div ref={messagesEndRef} />
            {messages.length === 0 && (
              <div className="suggestions"><button type="button" onClick={() => setInput('What are you working on?')}>What are you working on?</button><button type="button" onClick={() => setInput('Tell me about your professional background')}>Tell me about your professional background</button></div>
            )}
          </div>
          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}><input aria-label="Ask Sadegh's digital twin" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} disabled={isLoading} placeholder={isLoading ? 'Thinking…' : 'Start a conversation...'} /><button type="submit" aria-label="Send message" disabled={!input.trim() || isLoading}><Send size={16} /></button></form>
        </div>
        <div className="scroll-cue"><span className="line" /> Scroll to discover</div>
      </section>

      <section className="intro section-grid" id="about"><div className="section-kicker">01 / Profile</div><div className="intro-content"><h2>Where cognition meets <span>computation.</span></h2><p>I study how minds make sense of the world, then use that perspective to build better machines. My work moves between research, product, and the messy, rewarding space in between.</p><div className="fact-row"><div><strong>Osnabrück University</strong><span>Cognitive Science · AI-oriented · Oct 2026</span></div><div><strong>Golestan University</strong><span>B.Sc. Computer Engineering</span></div><div><strong>Currently</strong><span>Looking for job, building, honing skills</span></div></div></div></section>

       <section className="skills section-grid" id="skills"><div className="section-kicker">02 / Skills</div><div className="skills-content"><div className="skill-groups">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3><div className="skill-cloud">{group.items.map((skill) => <span key={skill}><i aria-hidden="true">{skill.slice(0, 2).toUpperCase()}</i>{skill}</span>)}</div></div>)}</div></div><div className="marquee full-bleed" aria-label="Technology logos"><div className="marquee-track">{[...logoSkills, ...logoSkills].map((skill, index) => <span className="logo-badge" key={`${skill.name}-${index}`} title={skill.name}><img src={(skill as any).cdn || `https://cdn.simpleicons.org/${skill.icon}`} alt="" style={skill.name === 'AWS' ? { filter: 'brightness(0) invert(1)', objectPosition: 'center' } : undefined} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }} /><small>{skill.name}</small></span>)}</div></div></section>

      <section className="experience section-grid"><div className="section-kicker">03 / Experience</div><div className="timeline"><article><span className="year">May 2025 — May 2026</span><div><h3>AI Engineer <span>@ Dornica</span></h3><p>Building intelligent systems and exploring how AI can become genuinely useful in the real world.</p></div></article><article><span className="year">Nov 2023 — Mar 2025</span><div><h3>AI Engineer <span>@ Freelancer</span></h3><p>Partnering with teams and independent clients to turn ambitious ideas into practical AI-powered products.</p></div></article><article><span className="year">Jan 2021 — Sep 2023</span><div><h3>AI Engineer <span>@ Parse</span></h3><p>Working across applied machine learning, language, and the systems that make ideas tangible.</p></div></article><article><span className="year">Start Oct 2026</span><div><h3>Student <span>@ University of Osnabrück</span></h3><p>Cognitive Science with an AI-oriented focus — studying perception, reasoning, and intelligent behavior.</p></div></article></div></section>

      <section className="languages section-grid"><div className="section-kicker">04 / Languages</div><div className="language-list"><div><strong>English</strong><span>C1 · Professional fluency</span></div><div><strong>Persian</strong><span>Native</span></div></div></section>

      <section className="work section-grid" id="work"><div className="section-kicker">05 / Selected work</div><div className="projects">{projects.map((project, index) => <a className="project" href={project.href} target="_blank" rel="noreferrer" key={project.name}><div className="project-index">0{index + 1}</div><div className="project-main"><div className="project-title"><h3>{project.name}</h3><ArrowUpRight size={17} /></div><span className="project-type">{project.type}</span><p>{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></a>)}</div></section>

      <footer className="footer" id="contact"><div><p className="eyebrow">Let&apos;s think together</p><h2>Let's build something interesting</h2><p className="footer-copy">Open to conversations, collaborations, and opportunities in AI engineering.</p></div><div className="footer-links"><a href="mailto:sadegh.khosravi@gmail.com">Email me <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/sade-khosravi" target="_blank" rel="noreferrer"><Link2 size={15} /> LinkedIn</a><a href="https://github.com/sadekhosravi" target="_blank" rel="noreferrer"><Link2 size={15} /> GitHub</a></div><div className="footer-bottom"><span>© 2026 Sadegh Khosravi</span><span>Made with passion.</span></div></footer>
    </main>

    );
}
