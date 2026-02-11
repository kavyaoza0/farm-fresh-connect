import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxImageSectionProps {
  imageSrc: string;
  alt: string;
  title: string;
  subtitle: string;
  direction?: 'left' | 'right';
  children?: ReactNode;
}

export const ParallaxImageSection = ({
  imageSrc,
  alt,
  title,
  subtitle,
  direction = 'left',
  children,
}: ParallaxImageSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === 'left' ? [-12, 0, 8] : [12, 0, -8]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const textX = useTransform(
    scrollYProgress,
    [0, 0.4],
    direction === 'left' ? [-40, 0] : [40, 0]
  );

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{ scale, rotateY, opacity, transformStyle: 'preserve-3d' }}
      >
        <motion.img
          src={imageSrc}
          alt={alt}
          className="w-full h-52 object-cover rounded-2xl"
          style={{ y }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5 text-white"
          style={{ x: textX, transformStyle: 'preserve-3d' }}
        >
          <motion.h3
            className="text-lg font-bold mb-1 drop-shadow-lg"
            initial={{ opacity: 0, z: -30 }}
            whileInView={{ opacity: 1, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm opacity-90 drop-shadow-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface VideoScrollSectionProps {
  videoSrc: string;
  title: string;
  subtitle: string;
}

export const VideoScrollSection = ({ videoSrc, title, subtitle }: VideoScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1.05, 1.05, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.2]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [32, 16, 32]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative overflow-hidden"
        style={{
          scale,
          rotateX,
          opacity,
          borderRadius,
          transformStyle: 'preserve-3d',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-56 object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6"
          initial={{ opacity: 0, z: -40 }}
          whileInView={{ opacity: 1, z: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.h3
            className="text-xl font-bold mb-2 drop-shadow-lg"
            whileInView={{ rotateX: [15, 0], opacity: [0, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm opacity-90 max-w-[24ch] drop-shadow-md"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const ScrollReveal3D = ({
  children,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) => {
  const variants = {
    up: { hidden: { opacity: 0, y: 50, rotateX: -15 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
    left: { hidden: { opacity: 0, x: -60, rotateY: 20 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
    right: { hidden: { opacity: 0, x: 60, rotateY: -20 }, visible: { opacity: 1, x: 0, rotateY: 0 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants[direction]}
      transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
      className={className}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {children}
    </motion.div>
  );
};
