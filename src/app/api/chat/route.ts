import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const SUPPORT_SYSTEM_PROMPT = `You are the SingIt Pop support assistant. You help fans with:

**About SingIt Pop:**
- Latest single: "Southern Lights"
- Music available on Spotify, Apple Music, Amazon Music, YouTube
- Genre: Pop, Country, Rock, Progressive
- Artist story: Music created as therapy and expression while facing hearing loss

**Membership Tiers:**
- Fan (Free): 30s previews, newsletter
- Premium (£3.99/mo): Full songs, ad-free
- Creator (£9.99/mo): Releasio Music Artist AI, lyrics creator, image prompts, marketing tools

**Site Navigation:**
- Music: Stream and discover songs
- Fan Albums: Community playlists
- Projects: Behind-the-scenes content
- Shop: Merch and digital products
- Contact: Get in touch via form or info@singitpop.com

**Common Questions:**
- Shipping: UK standard delivery
- Refunds: 30-day policy
- Support: Email info@singitpop.com

Be friendly, concise, and helpful. If asked about Releasio AI features (songwriting, marketing, etc.), explain they're available for Creator tier members and suggest upgrading.

Keep responses under 100 words unless providing detailed help.`;

const RELEASIO_SYSTEM_PROMPT = `You are the Releasio Music Artist AI assistant for SingIt Pop Creator tier members. You provide:

**Songwriting & Creative:**
- Lyric generation and brainstorming
- Song structure suggestions
- Theme and concept development
- Rhyme schemes and wordplay

**Marketing & Promotion:**
- Social media copy (Instagram, TikTok, X)
- Campaign ideas and strategies
- Email newsletter content
- Press release drafts

**Visual Content:**
- Album artwork prompts for AI tools
- Music video concepts
- Social media graphics ideas
- Brand identity suggestions

**Tools & Resources:**
- Best practices for independent artists
- Release planning timelines
- Fan engagement strategies

Be creative, professional, and actionable. Provide specific examples and ideas. Keep responses focused and under 150 words unless the user asks for detailed help.

Remember: You're helping an artist who makes pop, country, rock, and progressive music with emotional storytelling.`;

export async function POST(request: Request) {
    try {
        const { message, userTier, history } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Determine which AI model and prompt to use based on tier
        const isCreator = userTier === 'Creator';
        const systemPrompt = isCreator ? RELEASIO_SYSTEM_PROMPT : SUPPORT_SYSTEM_PROMPT;
        const modelName = isCreator ? 'gemini-2.0-flash-exp' : 'gemini-2.0-flash-exp';

        const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemPrompt
        });

        // Build conversation history
        const chatHistory = history?.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        })) || [];

        const chat = model.startChat({
            history: chatHistory
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json(
            { message: response },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('[Chatbot] Error:', error);
        return NextResponse.json(
            { error: 'Failed to process message. Please try again.' },
            { status: 500 }
        );
    }
}
