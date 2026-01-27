import { Home, Compass, Heart, Radio, User, Settings, LogOut } from 'lucide-react';
import styles from './SidebarNav.module.css';

interface SidebarNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Hub Home' },
        { id: 'browse', icon: Compass, label: 'Browse' },
        { id: 'favorites', icon: Heart, label: 'Favorites' },
        { id: 'radio', icon: Radio, label: 'Station' },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <span className={styles.logoIcon}>🎵</span>
                <span className={styles.logoText}>FanZone</span>
            </div>

            <div className={styles.menu}>
                <h4 className={styles.menuTitle}>Menu</h4>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.menu}>
                <h4 className={styles.menuTitle}>Library</h4>
                <button className={styles.navItem}>
                    <User size={20} />
                    <span>My Mixes</span>
                </button>
            </div>

            <div className={styles.footer}>
                <button className={styles.navItem}>
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
            </div>
        </nav>
    );
}
