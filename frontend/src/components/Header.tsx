'use client'

import React from 'react';
import '../styles/header.css';

export default function Header() {
    return (
        <div className="text-center mt-8">
            <div className="mx-auto font-spaceCrusaders text-2xl md:text-3xl xl:text-5xl text-white text-shadow" id='header-title'>
                <span>TECH NEWS</span>
            </div>
        </div>
    );
}
