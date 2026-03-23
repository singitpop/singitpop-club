import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, FileText, AlertCircle, PlayCircle, DollarSign, ShieldAlert } from 'lucide-react';
import styles from './page.module.css';

// Read JSON DBs natively on the server
function getTableData(filename: string) {
    const dbPath = path.join(process.cwd(), 'src', 'data', filename);
    try {
        if (fs.existsSync(dbPath)) {
            return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
    } catch (e) {
        console.error('Error reading ' + filename, e);
    }
    return [];
}

export default async function AdminLicensingDashboard() {
    const licenses = getTableData('licenses.json').reverse(); // Newest first
    const quotes = getTableData('quotes.json').reverse();
    const whitelists = getTableData('whitelists.json').reverse();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Link href="/admin" className={styles.backBtn}>
                        <ArrowLeft size={20} /> Back to Dashboard
                    </Link>
                    <h1>Licensing Operations</h1>
                    <p>Manage sync licenses, commercial leads, and YouTube clearance claims.</p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <DollarSign size={24} className={styles.statIcon} style={{color: '#4ade80'}} />
                    <h3>Total Licenses Sold</h3>
                    <div className={styles.statValue}>{licenses.length}</div>
                </div>
                <div className={styles.statCard}>
                    <FileText size={24} className={styles.statIcon} style={{color: '#f472b6'}} />
                    <h3>Pending Quotes</h3>
                    <div className={styles.statValue}>{quotes.filter((q: any) => q.status === 'pending').length}</div>
                </div>
                <div className={styles.statCard}>
                    <PlayCircle size={24} className={styles.statIcon} style={{color: '#ef4444'}} />
                    <h3>YouTube Disputes</h3>
                    <div className={styles.statValue}>{whitelists.filter((w: any) => w.status === 'pending').length}</div>
                </div>
            </div>

            {/* LICENSING CHEAT SHEET */}
            <div className="mb-12 grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                        <PlayCircle size={20} /> YouTube & TuneCore Guide
                    </h2>
                    <ul className="space-y-4 text-sm text-white/70 leading-relaxed">
                        <li>
                            <strong className="text-white">Whitelisting:</strong> TuneCore does NOT allow per-video whitelisting. It only whitelists entire channels. 
                        </li>
                        <li>
                            <strong className="text-white">Handling Claims:</strong> Tell the licensee to hit <strong>"Dispute"</strong> on YouTube and upload the PDF certificate we sent them. You can then release the claim in your TuneCore "Disputes" section.
                        </li>
                        <li>
                            <strong className="text-white">The Clean Strategy:</strong> For high-value tracks you sell often, consider disabling "YouTube Monetization" for that track in TuneCore entirely to avoid buyer headaches.
                        </li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/10 border border-pink-500/20 rounded-3xl p-8 backdrop-blur-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pink-400">
                        <ShieldAlert size={20} /> Rights & Metadata Guide
                    </h2>
                    <ul className="space-y-4 text-sm text-white/70 leading-relaxed">
                        <li>
                            <strong className="text-white">Excel/Mood Update:</strong> To change mood mapping, edit the <code>moodMapping</code> object in <code>scripts/convertExcelToAlbums.js</code> and run <code>node scripts/convertExcelToAlbums.js</code> in your terminal.
                        </li>
                        <li>
                            <strong className="text-white">PDF Certificates:</strong> Ensure <code>RESEND_API_KEY</code> is set in <strong>Vercel &gt; Settings &gt; Environment Variables</strong>. This is required to email license PDFs to customers.
                        </li>
                        <li>
                            <strong className="text-white">ASCAP Registration:</strong> Log into ASCAP &rarr; "Register a Work" &rarr; Enter Title + Writers (Gary Birrell 100%) + ISRC. This ensures you collect performance royalties.
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.tablesContainer}>
                
                {/* 1. COMPLETED LICENSES */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><CheckCircle2 size={20} color="#4ade80" /> Completed License Sales</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Buyer Name</th>
                                    <th>Track</th>
                                    <th>Tier / Usage</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {licenses.length === 0 ? (
                                    <tr><td colSpan={5} className={styles.emptyState}>No completed licenses found.</td></tr>
                                ) : licenses.map((lic: any) => (
                                    <tr key={lic.id}>
                                        <td>{new Date(lic.date).toLocaleDateString()}</td>
                                        <td><strong>{lic.buyerName}</strong><br/><small>{lic.buyerEmail}</small></td>
                                        <td>{lic.trackTitle}</td>
                                        <td>
                                            <span className={styles.badge}>{lic.licenseType.toUpperCase()}</span>
                                            <span className={styles.subBadge}>{lic.usage.toUpperCase()}</span>
                                        </td>
                                        <td className={styles.amountWrap}>£{lic.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 2. CUSTOM QUOTE REQUESTS */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><FileText size={20} color="#f472b6" /> Custom Quote Inbound Leads</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Lead Info</th>
                                    <th>Company</th>
                                    <th>Track Config</th>
                                    <th>Project Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotes.length === 0 ? (
                                    <tr><td colSpan={5} className={styles.emptyState}>No pending quotes.</td></tr>
                                ) : quotes.map((quote: any) => (
                                    <tr key={quote.id}>
                                        <td>{new Date(quote.date).toLocaleDateString()}</td>
                                        <td><strong>{quote.name}</strong><br/><small>{quote.email}</small></td>
                                        <td>{quote.company}</td>
                                        <td>
                                            <strong>{quote.trackTitle}</strong><br/>
                                            <small>{quote.configuration.usage} | {quote.configuration.duration} | {quote.configuration.territory}</small>
                                        </td>
                                        <td style={{ maxWidth: '300px', whiteSpace: 'normal', fontSize: '0.85rem' }}>
                                            {quote.details}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. YOUTUBE CLEARANCE TASKS */}
                <section className={styles.tableSection}>
                    <div className={styles.sectionHeader}>
                        <h2><AlertCircle size={20} color="#ef4444" /> Content ID Clearance Desk</h2>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Date Logged</th>
                                    <th>Licensee Info</th>
                                    <th>Track</th>
                                    <th>YouTube URL</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {whitelists.length === 0 ? (
                                    <tr><td colSpan={5} className={styles.emptyState}>No YouTube clearance requests.</td></tr>
                                ) : whitelists.map((wl: any) => (
                                    <tr key={wl.id}>
                                        <td>{new Date(wl.date).toLocaleDateString()}</td>
                                        <td><strong>{wl.name}</strong><br/><small>{wl.email}</small></td>
                                        <td>{wl.trackTitle}</td>
                                        <td><a href={wl.youtubeUrl} target="_blank" rel="noreferrer" className={styles.urlLink}>{wl.youtubeUrl}</a></td>
                                        <td>
                                            <span className={styles.pendingBadge}>Need to Action</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}
