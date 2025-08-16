import {Link} from "@inertiajs/react";

export default function Pagination({ links, meta }) {

    const currentPage = meta?.current_page || 1;
    const lastPage = meta?.last_page || 1;

    const getVisiblePages = () => {
        let start = Math.max(1, currentPage - 3);
        let end = Math.min(lastPage, start + 3);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">

                {links.prev ? (
                    <Link
                        href={links.prev}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        preserveState
                    >
                        Назад
                    </Link>
                ) : (
                    <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                    Назад
                </span>
                )}

                {getVisiblePages().map(page =>
                    <Link key={page} href={`${meta.links[page].url}`}
                          className={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-blue-500 disabled' : 'bg-gray-200 hover:bg-gray-300'}`}
                          preserveState
                    >
                        {page}
                    </Link>
                )}


                {links.next ? (
                    <Link
                        href={links.next}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        preserveState
                    >
                        Вперед
                    </Link>
                ) : (
                    <span className="px-4 py-2 text-gray-400 cursor-not-allowed">
                    Вперед
                </span>
                )}
            </ul>
        </nav>
    );
}
