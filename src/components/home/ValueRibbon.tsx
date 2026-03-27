"use client";

import styles from './ValueRibbon.module.css';
import { Music, Smartphone, Briefcase, Trophy, Gift, Heart } from 'lucide-react';
import Link from 'next/link';
// @ts-ignore
import { motion } from 'framer-motion';

const FEATURES = [
    {
        icon: <Music size={20} />,
        title: "Music Library",
        desc: "Stream the full vault",
        href: "/music",
        color: "#fa00ff"
    },
    {
        icon: <Smartphone size={20} />,
        title: "Ringtones",
        desc: "Custom hooks for mobile",
        href: "/shop/ringtones",
        color: "#00f0ff"
    },
    {
        icon: <Briefcase size={20} />,
        title: "Licensing",
        desc: "Sync rights for brands",
        href: "/licensing",
        color: "#fffa00"
    },
    {
        icon: <Trophy size={20} />,
        title: "FanZone",
        desc: "Challenges & Rewards",
        href: "/fanzone",
        color: "#00ff8c"
    },
    {
        icon: <Gift size={20} />,
        title: "The Gift",
        desc: "Join for free track",
        href: "/membership",
        color: "#ff4d4d",
        highlight: true
    }
];

export default function ValueRibbon() {
    return (
        <div className={styles.ribbonContainer}>
            <div className={styles.ribbonContent}>
                {FEATURES.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        className={`${styles.featureItem} ${item.highlight ? styles.highlight : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + (idx * 0.1), duration: 0.5 }}
                    >
                        <Link href={item.href} className={styles.link}>
                            <div className={styles.iconWrapper} style={{ color: item.color }}>
                                {item.icon}
                            </div>
                            <div className={styles.textWrapper}>
                                <span className={styles.featureTitle}>{item.title}</span>
                                <span className={styles.featureDesc}>{item.desc}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
            
            <motion.div 
                className={styles.scrollHint}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 3, duration: 2, repeat: Infinity }}
            >
                <span>SCROLL TO EXPLORE</span>
                <div className={styles.scrollLine} />
            </motion.div>
        </div>
    );
}
