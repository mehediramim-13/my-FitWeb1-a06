import React from 'react';
import logo from '@/assets/logo.png'
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
    return (
    <div className="border-b" style={{ borderColor: '#1D1F27' }}>
      <div className="navbar container mx-auto px-4 sm:px-6">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-neutral-900 rounded-box z-1 mt-3 w-48 p-2 shadow" style={{ border: '1px solid #1D1F27' }}>
              <li>
                <a className="font-medium rounded-full hover:bg-[#1a2312] hover:text-[#c2f800] text-neutral-400">
                  Workouts
                </a>
              </li>
              <li>
                <a className="font-medium rounded-full hover:bg-[#1a2312] hover:text-[#c2f800] text-neutral-400">
                  My Plan
                </a>
              </li>
            </ul>
          </div>
          <a className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={32} height={32} />
            <span className="text-white font-bold text-lg">FITLOG</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <a className="font-medium rounded-full hover:bg-[#1a2312] hover:text-[#c2f800] text-neutral-400">
                Workouts
              </a>
            </li>
            <li>
              <a className="font-medium rounded-full hover:bg-[#1a2312] hover:text-[#c2f800] text-neutral-400">
                My Plan
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-2 sm:gap-5 text-sm">
          <Link href="">
            <button className="btn btn-ghost flex items-center gap-2">
              <span className="text-white">Plan</span>
              <span className="bg-[#C3F901] text-neutral-900 font-semibold w-5 h-5 rounded-full flex items-center justify-center text-xs">0</span>
            </button>
          </Link>
          <Link href="">
            <button className="btn btn-ghost flex items-center gap-1.5">
              <span className="text-neutral-400 font-medium">Saved</span>
              <span className="border border-neutral-500 text-neutral-300 w-5 h-5 rounded-full flex items-center justify-center text-xs">0</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
};

export default Nav;