import { useAuth } from '@/context/AuthContext';

// ... (keep creating Header component)

export default function Header() {
  const { isLabel } = useAuth(); // Get label status
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ... (keep useEffect)

  return (
    // ...header structure...
    <div className={styles.actions}>
      <SignedOut>
        <Link href="/sign-in" className="glow-button" style={{ border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>
          Join the Club
        </Link>
      </SignedOut>
      <SignedIn>
        {isLabel && (
          <Link href="/admin" className={styles.navLink} style={{ marginRight: '1rem', fontWeight: 'bold', color: '#ff00d4' }}>
            Admin
          </Link>
        )}
        <Link href="/club" className="glow-button" style={{ border: 'none', fontSize: '0.9rem', cursor: 'pointer' }}>
          My Dashboard
        </Link>
        <div style={{ marginLeft: '1rem' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>

      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
    </div>
      </div >

    {/* Mobile Nav Overlay */ }
  {
    isOpen && (
      <motion.div
      // ...
      >
        {isLabel && (
          <Link
            href="/admin"
            className={styles.mobileLink}
            onClick={() => setIsOpen(false)}
            style={{ color: '#ff00d4' }}
          >
            Admin Console
          </Link>
        )}
        {navItems.map((item) => (
            // ...
          ))}
      </motion.div>
    )
  }
    </header >
  );
}
