import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinkStyles = 'text-muted transition-colors hover:text-white font-mono text-sm';

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      className={[
        'md:hidden fixed inset-0 top-0 z-75 bg-black/60 backdrop-blur-sm ',
        'transition-opacity duration-300',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
        className={[
          'absolute top-0 right-0 h-full w-72 bg-bg border-l border-border-custom',
          'flex flex-col gap-6 p-8 pt-24',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <NavLink to="" className={navLinkStyles} onClick={onClose}>Features</NavLink>
        <NavLink to="" className={navLinkStyles} onClick={onClose}>Analytics</NavLink>
        <NavLink to="" className={navLinkStyles} onClick={onClose}>Docs</NavLink>
        <Button variant="primary" onClick={onClose}>
          Get Started <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
}