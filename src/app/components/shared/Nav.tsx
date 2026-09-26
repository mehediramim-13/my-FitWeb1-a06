"use client";
import React from 'react';
import logo from '@/assets/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/app/workouts/PlanContent';

const Nav = () => {
    const { plan, saved } = usePlan();
    const pathname = usePathname();

    const linkClass = (href: string) =>
        `font-medium rounded-full px-3 py-1.5 transition-colors ${
            pathname === href
                ? 'bg-[#C3F901] text-neutral-900'
                : 'text-neutral-400 hover:bg-[#1a2312] hover:text-[#c2f800]'
        }`;

    return (
    <div className="border-b sticky top-0 z-50 bg-[#0C0D10]" style={{ borderColor: '#1D1F27' }}>
      <div className="navbar container mx-auto px-4 sm:px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral-900 rounded-box z-[1] mt-3 w-48 p-2 shadow-lg"
              style={{ border: '1px solid #1D1F27' }}
            >
              <li>
                <Link href="/" className={linkClass('/')}>
                  Workouts
                </Link>
              </li>
              <li>
                <Link href="/my-plan" className={linkClass('/my-plan')}>
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          <a className="flex items-center gap-2 ml-1 lg:ml-0">
            <Image src={logo} alt="Logo" width={32} height={32} />
            <span className="text-white font-bold text-base sm:text-lg">FITLOG</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link href="/" className={linkClass('/')}>
                Workouts
              </Link>
            </li>
            <li>
              <Link href="/my-plan" className={linkClass('/my-plan')}>
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2 sm:gap-4 text-sm">
          <Link href="/my-plan?tab=plan">
            <button className="btn btn-ghost btn-sm sm:btn-md px-2 sm:px-3 flex items-center gap-1.5 sm:gap-2">
              <span className="text-white text-xs sm:text-sm">Plan</span>
              <span className="bg-[#C3F901] text-neutral-900 font-semibold w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">
                {plan.length}
              </span>
            </button>
          </Link>
          <Link href="/my-plan?tab=saved">
            <button className="btn btn-ghost btn-sm sm:btn-md px-2 sm:px-3 flex items-center gap-1 sm:gap-1.5">
              <span className="text-neutral-400 font-medium text-xs sm:text-sm">Saved</span>
              <span className="border border-neutral-500 text-neutral-300 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">
                {saved.length}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
};

export default Nav;