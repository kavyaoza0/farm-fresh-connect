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

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl"
      style={{ scale, opacity }}
    >
      <motion.img
        src={imageSrc}
        alt={alt}
        className="w-full h-48 object-cover rounded-2xl"
        style={{ y }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent rounded-2xl" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 text-white"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h3 className="text-base font-bold mb-0.5 drop-shadow-sm">{title}</h3>
        <p className="text-sm opacity-85 drop-shadow-sm">{subtitle}</p>
        {children}
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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl"
      style={{ scale, opacity }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-52 object-cover rounded-2xl"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 rounded-2xl" />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-bold mb-1.5 drop-shadow-sm">{title}</h3>
        <p className="text-sm opacity-85 max-w-[26ch] drop-shadow-sm">{subtitle}</p>
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
    up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={variants[direction]}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
