
import React, { useState, useEffect } from 'react';
import { Artist, View } from '../types';
import { generateRhymes, generateNextLine, generateMetaphor } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { QuillPenIcon } from './icons/QuillPenIcon';
import { useLocalStorage } from '../hooks';

interface LyricLabProps {
    artist: Artist;
    setView: (view: View) => void;
}

type ToolMode = 'rhyme' | 'next-line' | 'metaphor';

export const LyricLab = ({ artist, setView }: LyricLabProps) => {
    const [lyrics, setLyrics] = useLocalStorage<string>(`lyric-lab-draft-${artist.id}`, '');
    const [selectedText, setSelectedText] = useState('');
    const [toolMode, setToolMode] = useState<ToolMode>('rhyme');
    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [context, setContext] = useState('');

    const handleTextSelect = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            setSelectedText(selection.toString());
        }
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setResults([]);
        try {
            let res: string[] = [];
            if (toolMode === 'rhyme') {
                if (!selectedText) {
                    alert("Please highlight a word in your lyrics to find rhymes.");
                    setIsLoading(false);
                    return;
                }
                res = await generateRhymes(selectedText, context || artist.genre || 'General');
            } else if (toolMode === 'next-line') {
                const lines = lyrics.split('\n').filter(l => l.trim()).slice(-4).join('\n'); // Last 4 lines
                res = await generateNextLine(lines, context || 'Poetic');
            } else if (toolMode === 'metaphor') {
                 if (!selectedText && !context) {
                    alert("Please highlight a concept or enter a context to generate metaphors.");
                    setIsLoading(false);
                    return;
                }
                res = await generateMetaphor(selectedText || context);
            }
            setResults(res);
        } catch (error) {
            console.error(error);
            setResults(['Error generating suggestions.']);
        } finally {
            setIsLoading(false);
        }
    };

    const insertText = (text: string) => {
        setLyrics(prev => prev + '\n' + text);
    };

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView('creative-studio')} className="text-medium-text hover:text-light-text">&larr;</button>
                    <h1 className="text-2xl font-bold text-light-text flex items-center gap-2">
                        <QuillPenIcon className="w-6 h-6 text-brand-purple" />
                        Lyric Lab
                    </h1>
                </div>
                <div className="text-xs text-medium-text bg-dark-card px-3 py-1 rounded-full border border-dark-border">
                    Auto-saving to local draft
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-0">
                {/* Editor Column */}
                <div className="lg:col-span-2 flex flex-col bg-dark-card border border-dark-border rounded-lg overflow-hidden">
                    <div className="p-2 bg-dark-bg border-b border-dark-border flex justify-between items-center">
                        <span className="text-xs text-medium-text font-semibold px-2">EDITOR</span>
                    </div>
                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        onMouseUp={handleTextSelect}
                        onKeyUp={handleTextSelect}
                        className="flex-grow w-full bg-dark-card p-6 text-lg text-light-text outline-none resize-none font-mono leading-relaxed"
                        placeholder="Start writing your masterpiece..."
                    />
                </div>

                {/* AI Tools Column */}
                <div className="bg-dark-card border border-dark-border rounded-lg flex flex-col overflow-hidden">
                    <div className="p-2 bg-dark-bg border-b border-dark-border">
                        <span className="text-xs text-medium-text font-semibold px-2">AI TOOLBELT</span>
                    </div>
                    
                    <div className="p-4 flex-grow overflow-y-auto">
                        <div className="flex space-x-1 bg-dark-bg p-1 rounded-lg mb-4">
                            {(['rhyme', 'next-line', 'metaphor'] as ToolMode[]).map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => { setToolMode(mode); setResults([]); }}
                                    className={`flex-1 py-2 text-xs font-bold rounded-md capitalize transition-colors ${toolMode === mode ? 'bg-brand-purple text-white' : 'text-medium-text hover:text-light-text'}`}
                                >
                                    {mode.replace('-', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {toolMode === 'rhyme' && (
                                <div className="text-center p-4 border-2 border-dashed border-dark-border rounded-lg bg-dark-bg/30">
                                    <p className="text-sm text-medium-text mb-1">Highlight a word in the editor</p>
                                    {selectedText ? (
                                        <p className="text-lg font-bold text-brand-purple">"{selectedText}"</p>
                                    ) : (
                                        <p className="text-lg font-bold text-medium-text/50">"..."</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-medium-text mb-1">Context / Vibe (Optional)</label>
                                <input 
                                    type="text" 
                                    value={context} 
                                    onChange={e => setContext(e.target.value)} 
                                    placeholder="e.g., Sad breakup song, 90bpm"
                                    className="w-full bg-dark-bg border border-dark-border rounded-md p-2 text-sm text-light-text"
                                />
                            </div>

                            <button 
                                onClick={handleGenerate} 
                                disabled={isLoading || (toolMode === 'rhyme' && !selectedText)}
                                className="w-full bg-brand-purple text-white font-bold py-2 rounded-lg flex items-center justify-center disabled:opacity-50"
                            >
                                <SparklesIcon className="w-4 h-4 mr-2" />
                                {isLoading ? 'Thinking...' : 'Generate'}
                            </button>

                            {results.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-xs font-bold text-medium-text uppercase">Suggestions</p>
                                    {results.map((res, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => insertText(res)}
                                            className="w-full text-left p-3 bg-dark-bg hover:bg-dark-border rounded-lg text-sm text-light-text border border-transparent hover:border-brand-purple transition-all group"
                                        >
                                            {res}
                                            <span className="hidden group-hover:inline float-right text-xs text-brand-purple opacity-70">Insert</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
