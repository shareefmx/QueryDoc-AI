import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentProps<typeof motion.button> & {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const baseStyles = 'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 active:translate-y-0 border border-white/10',
        secondary: 'bg-surface text-white hover:bg-surface/80 border border-white/5 hover:border-white/20',
        outline: 'bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
            {variant === 'primary' && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
        </motion.button>
    );
};
