import React from 'react';
import {Link, usePage} from '@inertiajs/react';

export default function Navbar() {

    const { auth } = usePage().props;

    return (
        <nav className="bg-dark shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between">

                <Link href="/" className="text-xl font-bold text-white">BooksHub</Link>

                <div className="flex space-x-4">
                    <Link href="/" className="nav-link text-white">
                        Книги
                    </Link>
                    { auth.user ? (
                            <>
                                <Link href="/authors" className="nav-link text-white">
                                    Авторы
                                </Link>
                                <Link href="/genres" className="nav-link text-white">
                                    Жанры
                                </Link>
                                <Link href="/logout"
                                      method="post"
                                      as="button"
                                      className="nav-link text-red bg-transparent border-none cursor-pointer">
                                    Выйти
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/register" className="nav-link text-white">
                                    Регистрация
                                </Link>
                                <Link href="/login" className="nav-link text-white">
                                    Войти
                                </Link>
                            </>
                        )}
                </div>
            </div>
        </nav>
    );
}
