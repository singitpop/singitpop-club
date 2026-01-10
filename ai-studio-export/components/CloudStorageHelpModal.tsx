import React from 'react';

interface CloudStorageHelpModalProps {
  onClose: () => void;
}

export const CloudStorageHelpModal = ({ onClose }: CloudStorageHelpModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4" onClick={onClose}>
      <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-light-text">Hosting Your Large Audio Files</h3>
          <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
        </div>
        
        <div className="prose prose-invert prose-sm max-w-none text-medium-text space-y-4">
            <p>To keep Releasio fast and affordable, large audio files (like your master `.wav` files) must be hosted on a dedicated cloud storage service. You then simply paste the public URL to the file into the form.</p>
            <p>For most independent artists, the best and most cost-effective solution is <strong className="text-light-text">Cloudflare R2</strong>.</p>
            
            <div className="bg-dark-bg border border-dark-border rounded-lg p-4">
                <h4 className="text-brand-purple font-bold">The Best Choice for Artists: Cloudflare R2</h4>
                <p>We strongly recommend Cloudflare R2 because it's the cheapest and easiest option for musicians:</p>
                <ul>
                    <li><strong className="text-light-text">Zero Egress Fees:</strong> You are <strong className="text-light-text">never</strong> charged when people download or stream your music. This is a huge advantage over other services like Amazon S3 or Google Cloud Storage, which can become expensive.</li>
                    <li><strong className="text-light-text">Generous Free Tier:</strong> You get 10 GB of storage completely free, which is enough for dozens of releases. You likely will never have to pay anything.</li>
                </ul>
            </div>
            
            <h4 className="text-lg font-semibold text-light-text">Step-by-Step Guide (using Cloudflare R2)</h4>
            
            <ol className="list-decimal list-inside space-y-3">
                <li>
                    <strong>Sign up for a free Cloudflare account.</strong>
                    <br />
                    Go to <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener noreferrer">dash.cloudflare.com/sign-up</a> and create your account.
                </li>
                <li>
                    <strong>Navigate to R2 Storage.</strong>
                    <br />
                    In your Cloudflare dashboard, find and click on "R2" in the left sidebar. You may need to enter payment information to activate it, but you won't be charged as long as you stay within the free tier.
                </li>
                <li>
                    <strong>Create a "Bucket".</strong>
                    <br />
                    Think of a bucket like a folder. Click "Create bucket", give it a unique name (e.g., <code>yourartist-masters</code>), and click "Create".
                </li>
                 <li>
                    <strong>Upload Your Audio Files.</strong>
                    <br />
                    Click on your new bucket, then click the "Upload" button. Select the master `.wav` and reference `.mp3` files for your release from your computer.
                </li>
                <li>
                    <strong>Enable Public Access.</strong>
                    <br />
                    Go to your bucket's "Settings" tab. In the "Public Access" section, click "Connect Domain" and follow the steps to connect a free public domain (e.g., <code>pub-your-random-id.r2.dev</code>). Then, click "Allow Access". This step is crucial for making your files available via a URL.
                </li>
                <li>
                    <strong>Copy and Paste the File URL.</strong>
                    <br />
                    Go back to your bucket's "Objects" (the file list). Click on an uploaded file (e.g., <code>my-song.wav</code>). In the file details panel on the right, you'll see a "Public URL". Copy this full URL and paste it into the corresponding field in the Releasio new release form. Repeat for all your audio files.
                </li>
            </ol>
        </div>

        <div className="mt-6 text-center">
            <button onClick={onClose} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg">Got it!</button>
        </div>
      </div>
    </div>
  );
};