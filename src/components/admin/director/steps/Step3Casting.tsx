
import React, { useState } from 'react';
import { User, Sparkles, Wand2, Camera } from 'lucide-react';

interface Step3CastingProps {
    onNext: (character: CharacterProfile) => void;
    onBack: () => void;
}

export interface CharacterProfile {
    name: string;
    description: string;
    dna: string; // The master prompt string
}

export const Step3Casting: React.FC<Step3CastingProps> = ({ onNext, onBack }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('20s');
    const [gender, setGender] = useState('female');
    const [hair, setHair] = useState('long flowing neon pink hair');
    const [outfit, setOutfit] = useState('silver holographic cyberpunk jacket');
    const [features, setFeatures] = useState('glowing makeup, expressive eyes');

    // Derived DNA
    const characterDNA = `a ${age} ${gender} pop star named ${name || 'Artist'}, with ${hair}, wearing ${outfit}. ${features}`;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
                    ← Back
                </button>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Step 3: Casting</h2>
                    <span style={{ color: '#FF0080', fontSize: '0.9rem' }}>Define Your Star</span>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', gap: '2rem' }}>
                {/* Form Side */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>CHARACTER NAME</label>
                        <input
                            value={name} onChange={e => setName(e.target.value)}
                            placeholder="e.g. Luna"
                            style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '6px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>AGE GROUP</label>
                            <select
                                value={age} onChange={e => setAge(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '6px' }}
                            >
                                <option value="teen">Teen</option>
                                <option value="20s">Young Adult (20s)</option>
                                <option value="30s">Adult (30s)</option>
                                <option value="40s">Adult (40s+)</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>GENDER</label>
                            <select
                                value={gender} onChange={e => setGender(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '6px' }}
                            >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="non-binary">Non-Binary</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>HAIR STYLE</label>
                        <input
                            value={hair} onChange={e => setHair(e.target.value)}
                            placeholder="e.g. Blonde bob cut"
                            style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '6px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>OUTFIT / STYLE</label>
                        <input
                            value={outfit} onChange={e => setOutfit(e.target.value)}
                            placeholder="e.g. Vintage denim jacket and sunglasses"
                            style={{ width: '100%', padding: '0.8rem', background: '#222', border: '1px solid #333', color: 'white', borderRadius: '6px' }}
                        />
                    </div>
                </div>

                {/* Preview Side */}
                <div style={{ flex: 1, background: '#111', borderRadius: '12px', padding: '2rem', border: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: '120px', height: '120px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '2px solid #FF0080' }}>
                        <User size={64} color="#666" />
                    </div>

                    <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>{name || 'The Artist'}</h3>

                    <div style={{ background: '#000', padding: '1rem', borderRadius: '8px', width: '100%', textAlign: 'left', border: '1px dashed #444' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FF0080', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            <Sparkles size={14} /> Character DNA
                        </div>
                        <p style={{ color: '#ccc', fontStyle: 'italic', lineHeight: '1.5', margin: 0, fontSize: '0.9rem' }}>
                            "{characterDNA}"
                        </p>
                    </div>

                    <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.8rem' }}>
                        This DNA will be injected into every scene to ensure Google FX generates the same person.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button
                    onClick={() => onNext({ name, description: outfit, dna: characterDNA })}
                    style={{
                        padding: '1rem 4rem',
                        background: '#FF0080',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 0 20px rgba(255,0,128,0.4)',
                        transition: 'transform 0.2s'
                    }}
                >
                    <Wand2 size={20} /> Generate Storyboard
                </button>
            </div>
        </div>
    );
};
