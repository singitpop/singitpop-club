import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { company, email, projectTitle, vibe } = data;

        if (!company || !email || !projectTitle || !vibe) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const brief = {
            id: `brief-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...data
        };

        const filePath = path.join(process.cwd(), 'src/data/briefs.json');
        
        // Ensure file exists
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        }

        const fileData = fs.readFileSync(filePath, 'utf8');
        const briefs = JSON.parse(fileData);
        briefs.push(brief);
        
        fs.writeFileSync(filePath, JSON.stringify(briefs, null, 2));

        return NextResponse.json({ success: true, id: brief.id });
    } catch (error) {
        console.error('Brief submission error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
