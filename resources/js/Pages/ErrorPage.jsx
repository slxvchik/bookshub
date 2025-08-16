import {Head, Link} from '@inertiajs/react';
import AppLayout from "../Components/Layouts/AppLayout.jsx";
import React from "react";

export default function ErrorPage({ status, title, message }) {
    const errorMessages = {
        403: {
            title: "Access denied",
            message: "You dont have permissions for this page."
        },
        404: {
            title: "Page not found",
            message: "Page not found."
        },
        500: {
            title: "Server error",
            message: "Something went wrong on the server."
        },
        503: {
            title: "The service is unavailable",
            message: "The service is unavailable, please try later."
        }
    };

    const error = errorMessages[status] || {
        status: 500,
        title: title || "Error",
        message: message || "An unexpected error has occurred."
    };

    return (
        <AppLayout>
            <Head title={`${status} - ${error.title}`} />
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-red-500 dark:text-red-400 mb-4">
                            {status}
                        </h1>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {error.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {error.message}
                        </p>
                        <Link href="/" type="button" className="btn btn-primary mb-1">Go to main page</Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
