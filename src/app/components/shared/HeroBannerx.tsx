'use client';

import React from 'react';
import banner from '@/assets/banner.png';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

const HeroBannerx = () => {
    const handleScrollToLibrary = () => {
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 py-10">
            <div className="bg-neutral-900 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-10 p-8 sm:p-12 ">
                <div className="max-w-xl">
                    <span className="text-[#C3F901] font-semibold text-sm tracking-wide">
                        WORKOUT LIBRARY
                    </span>
                    <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-4xl leading-tight mt-4">
                        <span className="block lg:whitespace-nowrap text-[60px]">TRAIN WITH INTENT. LOG <br /> EVERY SET.</span>
                    </h1>
                    <p className="text-neutral-400 text-base sm:text-lg mt-6">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <button
                        onClick={handleScrollToLibrary}
                        className="bg-[#C3F901] text-neutral-900 font-bold px-6 py-3 rounded-lg mt-8 transition-all duration-200 hover:bg-[#a8d900] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                        BROWSE WORKOUTS
                        <ArrowDown className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px]">
                    <Image
                        src={banner}
                        alt="Workout equipment"
                        width={400}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroBannerx;