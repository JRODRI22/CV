import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../ui/Container';
import { CONTACT, NAV_LINKS } from '../../utils/constants';
import logo from '../../assets/LogoDesarollador.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-secondary border-t border-border">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="JR Digital Solutions" className="h-10 w-auto drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]" />
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Software personalizado para negocios que quieren crecer. Transformamos ideas en sistemas que generan resultados.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary-light transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsappLink} className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-sm text-text-secondary">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {CONTACT.location}
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <p className="text-sm text-text-muted">
              &copy; {currentYear} {CONTACT.business}. Todos los derechos reservados.
            </p>
            <p className="text-sm text-text-muted">
              Hecho con <span className="text-accent">&#9829;</span> en San Carlos, Costa Rica
            </p>
          </div>
          {/* Developer credits */}
          <div className="pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-text-muted mb-1">
              Desarrollado por <span className="text-text-secondary font-semibold">JR Digital Solutions</span>
            </p>
            <p className="text-xs text-text-muted">
              <a href="https://wa.me/50661969427" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">+506 6196-9427</a>
              {' · '}
              <a href="mailto:jrodri1493@gmail.com" className="hover:text-primary-light transition-colors">jrodri1493@gmail.com</a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
