'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, QuoteOpen } from '@gravity-ui/icons';
import { Star } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Counter } from './counter';
import { RevealAnimation } from './reveal-animation';

const testimonials = [
  {
    id: 1,
    name: 'Fatima Ahmed',
    role: 'IELTS Student',
    rating: 5,
    text: 'Robiul Islam\'s teaching methods are exceptional. I improved my IELTS score by 2 bands in just 3 months. His explanations are clear and engaging!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    id: 2,
    name: 'Hassan Khan',
    role: 'History Enthusiast',
    rating: 5,
    text: 'The Islamic History course is absolutely fascinating. I\'ve learned more in these lessons than I did in years of self-study. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    id: 3,
    name: 'Aisha Malik',
    role: 'English Student',
    rating: 5,
    text: 'Fantastic instructor with incredible knowledge. The grammar lessons are comprehensive and easy to understand. This is the best online teaching I\'ve experienced.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
  {
    id: 4,
    name: 'Mohamed Ibrahim',
    role: 'Professional Learner',
    rating: 5,
    text: 'I enrolled for career advancement and got much more than I expected. The content, delivery, and support are all top-notch. Worth every penny!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
  {
    id: 5,
    name: 'Zainab Rashid',
    role: 'Student',
    rating: 5,
    text: 'The combination of English and Islamic History lessons is unique. Robiul sir makes complex topics simple and interesting. Truly inspiring!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

export function StudentFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4
      }
    })
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealAnimation direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Student Feedback Wall</h2>
            <p className="text-foreground/70 text-lg">Real stories from our dedicated learners worldwide</p>
          </RevealAnimation>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 text-gold opacity-10 select-none">
            <QuoteOpen className="w-32 h-32" />
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200 border border-border/50 p-8 md:p-16 relative z-10 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 w-24 h-24 relative rounded-full overflow-hidden shadow-xl ring-4 ring-gold/20"
                >
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1.5 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                      <Star className="w-6 h-6 fill-gold text-gold" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-2xl text-primary font-medium mb-10 leading-relaxed italic">
                  &quot;{currentTestimonial.text}&quot;
                </p>

                {/* Name and Role */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-bold text-2xl text-primary mb-1">{currentTestimonial.name}</p>
                  <p className="text-gold font-semibold uppercase tracking-widest text-xs">{currentTestimonial.role}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border/50">
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gold w-10' : 'bg-border w-2.5 hover:bg-gold/40'
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                  className="bg-primary text-white p-4 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNext}
                  className="bg-primary text-white p-4 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { label: 'Average Rating', val: 4.9, suffix: '★' },
            { label: 'Happy Students', val: 500, suffix: '+' },
            { label: 'Success Rate', val: 98, suffix: '%' }
          ].map((stat, i) => (
            <RevealAnimation key={i} direction="up" delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-border/50 p-8 text-center shadow-sm hover:shadow-xl transition-all"
              >
                <p className="text-4xl font-extrabold text-gold mb-3">
                  <Counter end={stat.val} suffix={stat.suffix} />
                </p>
                <p className="text-primary font-bold uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
