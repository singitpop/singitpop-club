
"use client";

import { useState } from 'react';
import styles from '../Admin.module.css'; // Reuse basic admin styles
import { Copy, FileOutput, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function NewsletterBuilder() {
    const [subject, setSubject] = useState("New Release from SingIt Pop!");
    const [headerText, setHeaderText] = useState("We have some exciting news for you.");
    const [featuredType, setFeaturedType] = useState("single");
    const [ctaLink, setCtaLink] = useState("https://singitpop.com/music");
    const [generatedHtml, setGeneratedHtml] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSend = async () => {
        if (!generatedHtml) return alert("Please generate the email content first.");
        if (!confirm("Are you sure you want to send this newsletter to ALL fans? This cannot be undone.")) return;

        setIsSending(true);
        try {
            const res = await fetch('/api/admin/newsletter/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, html: generatedHtml })
            });

            const data = await res.json();

            if (res.ok) {
                alert(`Success! Sent to ${data.sent} users.`);
            } else {
                alert(`Error: ${data.error || 'Failed to send'}`);
            }
        } catch (error) {
            console.error("Send failed", error);
            alert("Failed to send newsletter.");
        } finally {
            setIsSending(false);
        }
    };

    const generateEmail = () => {
        let title = "Featured Update";
        let body = "Listen to the latest tracks on our website.";
        let btnText = "Listen Now";

        if (featuredType === 'single') {
            title = "New Single Out Now!";
            body = "Listen to our latest track on the website.";
            btnText = "Listen Now";
        } else if (featuredType === 'merch') {
            title = "New Merch Drop! 👕";
            body = "Check out the latest gear in our shop.";
            btnText = "Shop Now";
        } else if (featuredType === 'album') {
            title = "New Album Release! 💿";
            body = "Stream the full album now.";
            btnText = "Stream Now";
        }

        const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; }
  .header { background: #000; color: white; padding: 20px; text-align: center; }
  .content { padding: 30px; }
  .btn { display: inline-block; background: #FF0080; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; }
  .footer { background: #eee; text-align: center; padding: 20px; font-size: 12px; color: #888; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
        <h1>SingIt Pop</h1>
    </div>
    <div class="content">
        <h2>${subject}</h2>
        <p>${headerText.replace(/\n/g, '<br>')}</p>
        
        <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-left: 4px solid #FF0080;">
            <h3>${title}</h3>
            <p>${body}</p>
            <a href="${ctaLink}" class="btn">${btnText}</a>
        </div>

        <p>Thanks for being a fan!<br><strong>The SingIt Pop Team</strong></p>
    </div>
    <div class="footer">
        &copy; ${new Date().getFullYear()} SingIt Pop. All rights reserved.
    </div>
  </div>
</body>
</html>
        `;
        setGeneratedHtml(html.trim());
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedHtml);
        alert("HTML copied to clipboard!");
    };

    return (
        <div className={styles.container} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', marginBottom: '1rem', textDecoration: 'none' }}>
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1>Newsletter Builder</h1>
            <p>Create simple HTML emails to send to your fans.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '100%', marginTop: '2rem' }}>
                {/* Editor */}
                <div style={{ background: '#111', padding: '2rem', borderRadius: '12px' }}>
                    <h3>Edit Content</h3>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Subject Line</label>
                        <input
                            type="text"
                            className={styles.searchInput}
                            style={{ width: '100%' }}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Intro Text</label>
                        <textarea
                            className={styles.searchInput}
                            style={{ width: '100%', minHeight: '100px', fontFamily: 'inherit' }}
                            value={headerText}
                            onChange={(e) => setHeaderText(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Featured Type</label>
                        <select
                            className={styles.searchInput}
                            style={{ width: '100%' }}
                            value={featuredType}
                            onChange={(e) => setFeaturedType(e.target.value)}
                        >
                            <option value="single">New Single</option>
                            <option value="album">Album Launch</option>
                            <option value="merch">Merch Drop</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>CTA Link</label>
                        <input
                            type="text"
                            className={styles.searchInput}
                            style={{ width: '100%' }}
                            value={ctaLink}
                            onChange={(e) => setCtaLink(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button className={styles.btn} onClick={generateEmail} style={{ width: '100%', marginTop: '1rem', flex: 1 }}>
                            <FileOutput size={18} /> Generate HTML
                        </button>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #333' }}>
                        <h3 className="text-xl font-bold mb-4">Send Campaign</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Ready to launch? This will send the email to all eligible users (Friends, Fans, Insiders, VIPs).
                            <br /><strong className="text-yellow-500">Note: Label (Admin) users are excluded.</strong>
                        </p>

                        <button
                            className={styles.btn}
                            onClick={handleSend}
                            disabled={!generatedHtml || isSending}
                            style={{
                                width: '100%',
                                background: isSending ? '#333' : '#db2777',
                                border: 'none',
                                opacity: !generatedHtml ? 0.5 : 1
                            }}
                        >
                            <Send size={18} />
                            {isSending ? 'Sending...' : 'Send to All Fans'}
                        </button>
                    </div>
                </div>

                {/* Preview / Code */}
                <div style={{ background: '#111', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                    <h3>HTML Output</h3>
                    <textarea
                        readOnly
                        value={generatedHtml}
                        style={{
                            flex: 1,
                            width: '100%',
                            background: '#000',
                            color: '#0f0',
                            fontFamily: 'monospace',
                            padding: '1rem',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            resize: 'none'
                        }}
                        placeholder="Click Generate to see HTML code..."
                    />
                    <button
                        className={styles.btn}
                        onClick={copyToClipboard}
                        disabled={!generatedHtml}
                        style={{ alignSelf: 'flex-start', opacity: !generatedHtml ? 0.5 : 1 }}
                    >
                        <Copy size={18} /> Copy Code
                    </button>

                    <div style={{ marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#888' }}>Preview (Simple)</span>
                        <div style={{ background: '#fff', padding: '0', marginTop: '0.5rem', borderRadius: '4px', height: '400px', overflow: 'hidden' }}>
                            {generatedHtml ? (
                                <iframe
                                    srcDoc={generatedHtml}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    title="Email Preview"
                                />
                            ) : (
                                <p style={{ color: '#ccc', textAlign: 'center', paddingTop: '3rem' }}>Preview will appear here</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
