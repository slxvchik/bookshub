import React from 'react';
import Navbar from './Navbar.jsx';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <main className="container mx-auto py-8">
                <div className="container mt-4">
                    {children}
                </div>
            </main>

        </div>
    );
}
