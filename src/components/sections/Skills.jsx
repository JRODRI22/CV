import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { SKILLS_ROW1, SKILLS_ROW2 } from '../../utils/constants';

function MarqueeRow({ items, direction = 1, speed = 32 }) {
  const doubled = [...items, ...items, ...items];
  const xStart = direction > 0 ? '0%' : '-33.33%';
  const xEnd = direction > 0 ? '-33.33%' : '0%';

  return (
    <div className="overflow-hidden flex">
      <motion.div
        className="flex gap-3 flex-shrink-0"
        animate={{ x: [xStart, xEnd] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-5 py-2.5 rounded-full font-mono text-sm whitespace-nowrap transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      className="py-16 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Top divider */}
      <div
        className="absolute left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
      />

      {/* Section label */}
      <Container className="mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px]" style={{ background: '#6366F1' }} />
          <span
            className="font-mono uppercase tracking-widest"
            style={{ fontSize: '0.7rem', color: '#6366F1' }}
          >
            Stack tecnológico
          </span>
        </div>
      </Container>

      <div className="space-y-3">
        <MarqueeRow items={SKILLS_ROW1} direction={1} speed={38} />
        <MarqueeRow items={SKILLS_ROW2} direction={-1} speed={30} />
      </div>

      {/* Bottom divider */}
      <div
        className="mt-16 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
      />
    </section>
  );
}
