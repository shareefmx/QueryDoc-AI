import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PaperPlaneRight, FileText, Sparkle } from 'phosphor-react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import * as mammoth from "mammoth";

const GEN_AI_KEY = (import.meta.env.VITE_GOOGLE_API_KEY || "").trim();

if (!GEN_AI_KEY) {
    console.error("Missing VITE_GOOGLE_API_KEY environment variable.");
}

const genAI = new GoogleGenerativeAI(GEN_AI_KEY);

const MODELS = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash-lite-001"];

const getModel = (index: number) => {
    return genAI.getGenerativeModel({
        model: MODELS[index],
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ]
    });
};

async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64,
                    mimeType: file.type === 'application/pdf' ? 'application/pdf' : file.type,
                },
            });
        };
        reader.readAsDataURL(file);
    });
}

interface Message {
    id: string;
    type: 'user' | 'ai';
    content: React.ReactNode;
}

export const Hero = () => {
    const [isChatExpanded, setIsChatExpanded] = React.useState(false);
    const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'uploading' | 'completed'>('idle');
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [isDragging, setIsDragging] = React.useState(false);
    const [chatSession, setChatSession] = React.useState<any>(null);
    const [activeModelIndex, setActiveModelIndex] = React.useState(0);
    const [chatHistoryBase, setChatHistoryBase] = React.useState<any[]>([]);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const chatCardRef = React.useRef<HTMLDivElement>(null);
    const textInputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (uploadStatus === 'completed') {
            setTimeout(() => {
                textInputRef.current?.focus();
            }, 100);
        }
    }, [uploadStatus]);

    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleFileUploadProcess = async (file: File) => {
        setUploadStatus('uploading');
        chatCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Simulated progress for UI feedback while processing
        let progress = 0;
        const interval = setInterval(() => {
            progress = Math.min(progress + 5, 90);
            setUploadProgress(progress);
        }, 50);

        try {
            let initialPromptPart: any;

            if (file.name.endsWith('.docx')) {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                initialPromptPart = { text: `Here is the document content:\n${result.value}\n\nAnalyze this document.` };
            } else if (file.type === 'application/pdf') {
                initialPromptPart = await fileToGenerativePart(file);
            } else {
                // Default to text
                const text = await file.text();
                initialPromptPart = { text: `Here is the document content:\n${text}\n\nAnalyze this document.` };
            }

            const initialHistory = [
                {
                    role: "user",
                    parts: [
                        ...(file.type === 'application/pdf' ? [initialPromptPart, { text: "Analyze this document." }] : [initialPromptPart])
                    ],
                },
                {
                    role: "model",
                    parts: [{ text: `I have analyzed the ${file.name}. What would you like to know?` }],
                }
            ];

            setChatHistoryBase(initialHistory);

            // Start chat with first model
            setActiveModelIndex(0);
            const model = getModel(0);
            const chat = model.startChat({ history: initialHistory });
            setChatSession(chat);

            clearInterval(interval);
            setUploadProgress(100);
            setUploadStatus('completed');

            setMessages([
                {
                    id: '1',
                    type: 'ai',
                    content: (
                        <>
                            Hello! I've analyzed the <span className="text-white font-medium inline-flex items-center gap-1"><FileText size={14} /> {file.name}</span> you uploaded. What would you like to know?
                        </>
                    )
                }
            ]);

        } catch (error) {
            console.error("Error analyzing file:", error);
            clearInterval(interval);
            setUploadStatus('idle'); // Reset on error
            alert("Failed to analyze file. Please try again.");
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            handleFileUploadProcess(event.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUploadProcess(e.dataTransfer.files[0]);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !chatSession) return;

        const userMessageText = inputValue;
        const newUserMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: userMessageText
        };

        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setInputValue('');

        let currentSession = chatSession;
        let modelIndex = activeModelIndex;
        let success = false;
        let lastError: any = null;

        // Retry loop across models
        while (!success && modelIndex < MODELS.length) {
            try {
                // If we are switching models (index changed), we need to create a new session
                if (modelIndex !== activeModelIndex) {
                    console.log(`Switching to fallback model: ${MODELS[modelIndex]}`);
                    const newModel = getModel(modelIndex);

                    // Reconstruct history for the new session
                    // Base history (File upload) + current conversation context

                    // Combine base history + conversation history (excluding the very last unique user message we are about to send? 
                    // No, `startChat` history should include previous turns. The current message is sent via `sendMessage`)

                    // Actually `sendMessage` continues the session.
                    // So history passed to startChat should be EVERYTHING up to the current new message.

                    // Wait: `updatedMessages` includes the message we just added (the new user message).
                    // We should NOT include the *current* new message in the `history` passed to `startChat`, 
                    // because we are about to call `sendMessage` with it.

                    const previousConversation = updatedMessages.slice(1, -1).map(msg => ({
                        role: msg.type === 'user' ? 'user' : 'model',
                        parts: [{ text: typeof msg.content === 'string' ? msg.content : 'Document analysis confirmation.' }]
                    }));

                    currentSession = newModel.startChat({
                        history: [...chatHistoryBase, ...previousConversation]
                    });

                    setActiveModelIndex(modelIndex);
                    setChatSession(currentSession);
                }

                const result = await currentSession.sendMessage(userMessageText);
                const response = await result.response;
                const text = response.text();

                // Format text: Replace * with newline + tab as requested
                const formattedText = text.replace(/\*+/g, '\t');

                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'ai',
                    content: formattedText + (modelIndex > 0 ? ` (Answered by ${MODELS[modelIndex]})` : '')
                };
                setMessages(prev => [...prev, aiResponse]);
                success = true;

            } catch (error) {
                console.error(`Error with model ${MODELS[modelIndex]}:`, error);
                lastError = error;
                modelIndex++; // Try next model
            }
        }

        if (!success) {
            let errorMessage = "All AI models failed to respond. Please try again later.";
            if (lastError instanceof Error) {
                errorMessage = `Error: ${lastError.message}`;
            }
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: errorMessage
            };
            setMessages(prev => [...prev, errorResponse]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Background Glow */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow opacity-20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                    <Sparkle size={16} className="text-primary" weight="fill" />
                    <span className="text-sm font-medium text-text-secondary">Next Generation Document Intelligence</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
                >
                    Chat with your <span className="text-gradient">Documents</span> using AI
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl"
                >
                    Upload PDFs, text files, and more. QueryDoc-AI analyzes your documents and provides instant, accurate answers to your questions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mb-20"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".pdf,.docx,.txt"
                    />
                    <Button size="lg" onClick={() => fileInputRef.current?.click()}>Get Started</Button>
                    <Button size="lg" variant="outline" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>Learn how it works</Button>
                </motion.div>

                {/* Interactive Chat Demo */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full max-w-4xl"
                >
                    <div ref={chatCardRef}>
                        <Card className="relative overflow-hidden border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl transition-all duration-500">
                            <div className="flex items-center justify-between p-4 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="text-xs font-medium text-text-tertiary">QueryDoc AI Assistant</div>
                                <div className="w-16" />
                            </div>

                            <div className={`p-6 flex flex-col relative transition-all duration-500 ease-in-out ${uploadStatus === 'idle' ? 'h-[400px]' : 'h-[600px]'}`}>
                                <AnimatePresence mode="wait">
                                    {uploadStatus !== 'completed' ? (
                                        <motion.div
                                            key="upload"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-colors cursor-pointer group relative overflow-hidden ${isDragging ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                            onClick={uploadStatus === 'idle' ? () => fileInputRef.current?.click() : undefined}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            {uploadStatus === 'uploading' && (
                                                <div
                                                    className="absolute bottom-0 left-0 h-1 bg-primary/50 transition-all duration-100 ease-linear"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            )}
                                            <div className="flex flex-col items-center gap-4 p-8">
                                                <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center transition-all duration-500 ${uploadStatus === 'uploading' ? 'scale-110 bg-primary/20' : 'group-hover:scale-110 group-hover:bg-primary/20'}`}>
                                                    <FileText size={32} className={`text-text-secondary transition-colors duration-300 ${uploadStatus === 'uploading' ? 'text-primary' : 'group-hover:text-primary'}`} weight={uploadStatus === 'uploading' ? 'fill' : 'regular'} />
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <h3 className="text-lg font-medium text-white">
                                                        {uploadStatus === 'uploading' ? 'Uploading Document...' : 'Upload a Document'}
                                                    </h3>
                                                    <p className="text-sm text-text-secondary max-w-xs">
                                                        {uploadStatus === 'uploading' ? (
                                                            <span className="font-mono text-primary">{uploadProgress}%</span>
                                                        ) : (
                                                            'Drag & drop or click to upload your PDF, DOCX, or TXT files'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="chat"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col h-full"
                                        >
                                            <div
                                                ref={chatContainerRef}
                                                className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-2"
                                            >
                                                {messages.map((message) => (
                                                    <motion.div
                                                        key={message.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${message.type === 'ai' ? 'bg-primary/20' : 'bg-white/10'}`}>
                                                            {message.type === 'ai' ? (
                                                                <Sparkle size={16} className="text-primary" weight="fill" />
                                                            ) : (
                                                                <div className="w-4 h-4 rounded-full bg-white/50" />
                                                            )}
                                                        </div>
                                                        <div className={`border rounded-2xl p-4 text-sm max-w-md text-left whitespace-pre-wrap ${message.type === 'ai'
                                                            ? 'bg-surface border-white/5 rounded-tl-none text-text-secondary'
                                                            : 'bg-primary/10 border-primary/20 rounded-tr-none text-white'
                                                            }`}>
                                                            {message.content}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Input Area */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="mt-6 relative"
                                            >
                                                <input
                                                    type="text"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Ask a question about your documents..."
                                                    className={`w-full bg-white/5 border rounded-xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-text-tertiary focus:outline-none transition-all duration-300 ${isChatExpanded ? 'border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'border-white/10'}`}
                                                    onFocus={() => setIsChatExpanded(true)}
                                                    onBlur={() => setIsChatExpanded(false)}
                                                />
                                                <button
                                                    onClick={handleSendMessage}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-white transition-colors"
                                                >
                                                    <PaperPlaneRight size={20} weight="fill" />
                                                </button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
