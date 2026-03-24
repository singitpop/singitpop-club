'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Wand2, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  ArrowLeft,
  Settings,
  Sparkles
} from 'lucide-react';

export default function CreatorPacksAdmin() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const generateAllPacks = async () => {
    setIsGenerating(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/creator-packs/generate', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
      } else {
        throw new Error(data.message || 'Failed to start generation');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setIsGenerating(false);
    }
  };

  const volumes = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <Link href="/admin" className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin Dashboard
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
              Digital Creator Hub
            </h1>
            <p className="text-gray-400 mt-2">Manage and automate your professional sound pack library.</p>
          </div>
          <button
            onClick={generateAllPacks}
            disabled={isGenerating}
            className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
              isGenerating 
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            ) : (
              <Wand2 className="w-5 h-5 mr-2" />
            )}
            {isGenerating ? 'Processing...' : 'Regenerate All 10 Volumes (v1-v10)'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pack List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <Volume2 className="w-5 h-5 mr-2 text-pink-500" />
            Current Sound Pack Library
          </h2>

          {message && (
            <div className={`p-4 rounded-xl flex items-start ${
              message.type === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-400' : 'bg-red-500/10 border border-red-500/50 text-red-400'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5" /> : <AlertCircle className="w-5 h-5 mr-3 mt-0.5" />}
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {volumes.map((vol) => (
              <div key={vol} className="bg-[#16161a] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4 text-cyan-400 font-bold border border-cyan-500/20">
                    V{vol}
                  </div>
                  <div>
                    <h3 className="font-bold">Creator Pack Vol {vol}</h3>
                    <p className="text-xs text-gray-500">20 High-Res Snippets | .wav 192Khz</p>
                  </div>
                </div>
                <a 
                  href={`https://singitpop-music.s3.eu-north-1.amazonaws.com/shop/SingItPop_CreatorPack_v${vol}.zip`}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                  title="Download Current Version"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#16161a] border border-white/5 p-6 rounded-3xl">
            <h2 className="text-xl font-bold flex items-center mb-6">
              <Settings className="w-5 h-5 mr-2 text-cyan-400" />
              Automation Settings
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">Auto-Generate Packs</p>
                  <p className="text-xs text-gray-500">Create new volumes as you release music.</p>
                </div>
                <div className="w-12 h-6 bg-cyan-500/20 border border-cyan-500/50 rounded-full relative cursor-pointer opacity-50">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full absolute top-1 left-1 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Threshold for next volume</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    defaultValue={5} 
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-20 text-center outline-none focus:border-cyan-500/50" 
                  />
                  <span className="text-sm text-gray-400">new albums</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-start bg-pink-500/10 p-4 rounded-xl border border-pink-500/20">
                  <Sparkles className="w-5 h-5 mr-3 text-pink-400 mt-0.5" />
                  <p className="text-xs text-pink-300 leading-relaxed">
                    Auto-generation uses the same premium algorithm to crop snippets at peak energy points and upsample them to .wav 192Khz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/20 to-pink-900/20 border border-white/5 p-6 rounded-3xl p-8 text-center">
            <h3 className="font-bold text-gray-300 mb-2">Artist Tip 👨‍🍳</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Volumes 1-10 are ready to go. Fans love collecting limited edition sound packs. Make sure to mention the 192Khz quality in your social posts!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
