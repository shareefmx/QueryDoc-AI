import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
    className,
    children,
    hoverEffect = false,
    ...props
}) => {
    return (
        <div
            className={twMerge(
                'glass rounded-2xl p-6 transition-all duration-300',
                hoverEffect && 'hover:bg-surface/40 hover:border-white/20 hover:shadow-lg hover:-translate-y-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
