"use client";
/**
 * @deprecated This loader uses heavy Framer Motion animations that delay perceived performance.
 * Use route-level loading.jsx with skeleton screens instead for instant navigation feedback.
 * Only use this for small inline loading states, NOT fullscreen={true}.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Compass, 
  User, 
  Sunrise, 
  Flower,
  Users, 
  Crown, 
  GraduationCap
} from 'lucide-react';
import { cn } from "@/lib/utils";

const ThemeLoader = ({ theme, className, fullScreen = false }) => {
  const getLoaderContent = () => {
    switch (theme) {
      case 'romantic':
        return {
          icon: <Heart className="w-20 h-20 md:w-32 md:h-32 text-rose-500 fill-rose-500" />,
          animation: {
            scale: [1, 1.2, 1],
          },
          transition: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'exploration':
        return {
          icon: <Compass className="w-20 h-20 md:w-32 md:h-32 text-emerald-500" />,
          animation: {
            rotate: 360,
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }
        };
      case 'solo':
        return {
          icon: <User className="w-20 h-20 md:w-32 md:h-32 text-amber-500" />,
          animation: {
            opacity: [0.4, 1, 0.4],
            scale: [0.95, 1.05, 0.95]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'religious':
        return {
          icon: <Sunrise className="w-20 h-20 md:w-32 md:h-32 text-amber-600" />,
          animation: {
            y: [5, -5, 5],
            opacity: [0.6, 1, 0.6]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'relax':
        return {
          icon: <Flower className="w-20 h-20 md:w-32 md:h-32 text-teal-500 fill-teal-100/50" />,
          animation: {
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'family':
        return {
          icon: <Users className="w-20 h-20 md:w-32 md:h-32 text-blue-500" />,
          animation: {
            y: [0, -10, 0],
          },
          transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeOut"
          }
        };
      case 'elite':
        return {
          icon: <Crown className="w-20 h-20 md:w-32 md:h-32 text-purple-500 fill-purple-100/30" />,
          animation: {
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case 'educational':
        return {
          icon: <GraduationCap className="w-20 h-20 md:w-32 md:h-32 text-indigo-500" />,
          animation: {
            rotateY: 360
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      default:
        return {
          icon: <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />,
          animation: {},
          transition: {}
        };
    }
  };

  const { icon, animation, transition } = getLoaderContent();

  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen w-full"
    : "flex flex-col items-center justify-center p-12 min-h-[400px] w-full col-span-full";

  return (
    <div className={cn(containerClasses, className)}>
      <motion.div
        animate={animation}
        transition={transition}
      >
        {icon}
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 md:mt-12 text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.5em] animate-pulse text-center px-4"
      >
        Curating {theme?.replace('-', ' ')}...
      </motion.p>
    </div>
  );
};

export default ThemeLoader;
