// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import '@fontsource/montserrat/500.css'; // Import Montserrat weight 500
import '@fontsource/montserrat/600.css'; // Import Montserrat weight 600

const Navbar = () => {
    return (
        <nav className="bg-bodyGradientStart p-4 h-32 fixed w-full z-10 flex items-center">
            <div className="container mx-auto flex flex-col md:flex-row justify-start items-center w-full relative">
                {/* Video Text - Positioned on the left, overlapping with Video Games */}
                <div
                    className="text-white text-4xl font-semibold opacity-20 mb-2 md:mb-0 absolute"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        // left: '10%', // Adjust to keep it towards the left side
                        // top: '30%', // Position it vertically
                        zIndex: 1,
                    }}
                >
                    Video
                </div>

                {/* Button Container - Positioned on the left, Side by Side on Desktop, Stacked on Mobile */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 relative ml-8">
                    <Link href="/home">
                        <button
                            className="text-white text-2xl relative"
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 500,
                                zIndex: 2, // Ensures it's above the "Video" text
                                position: 'relative',
                            }}
                        >
                            Video Games
                        </button>
                    </Link>
                    <Link href="/contact">
                        <button
                            className="text-white text-2xl"
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 500,
                            }}
                        >
                            Contact
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
