import React from 'react';
import footerLogo from "@/assets/logo.png"
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="border-t flex-1 flex items-center" style={{ borderColor: '#1D1F27' }}>
            <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Image src={footerLogo} alt="FitLog logo" width={20} height={20} />
                    <span className="text-white font-bold text-sm">FITLOG</span>
                </div>
                <p className="text-neutral-500 text-sm text-center sm:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </div>
    );
};

export default Footer;