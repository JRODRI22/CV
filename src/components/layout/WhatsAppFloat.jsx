import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../../utils/constants';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

      {/* Icon + Text */}
      <div className="relative flex items-center gap-2 px-5 py-3.5">
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          ¡Hablemos!
        </span>
      </div>
    </motion.a>
  );
}
