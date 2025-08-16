import {Link, router, usePage} from "@inertiajs/react";
import Pagination from "../UI/Pagination.jsx";

export default function BookList({books}) {

    const { auth } = usePage().props;

    const handleDelete = (bookId) => {
        if (confirm('Are you sure you want to delete the book?')) {
            router.delete(`/books/${bookId}`);
        }
    };

    return (
        <>
            <div className="container mt-3">

                <div className="row border-bottom fw-bold py-2 bg-light">
                    <div className="col-md-2">Cover</div>
                    <div className="col-md-2">Title</div>
                    <div className="col-md-1">Author</div>
                    <div className="col-md-1">Year</div>
                    <div className="col-md-3">Genres</div>
                    <div className="col-md-1">Pages</div>
                    { auth.user && (
                        <div className="col-md-2 text-end">Actions</div>
                    )}
                </div>

                {books.data.map(book => (
                    <div key={`book-${book.id}`} className="row border-bottom py-2 align-items-center">

                        <div className="col-md-2">
                            {book.cover_image && (
                                <img
                                    src={book.cover_image}
                                    className="me-2"
                                    alt="Cover"
                                    style={{width: '100%', objectFit: 'cover'}}
                                />
                            )}
                        </div>

                        <div className="col-md-2">
                            {book.title}
                        </div>

                        <div className="col-md-1">{book.author.name}</div>

                        <div className="col-md-1">{book.year}</div>

                        <div
                            className="col-md-3">{book.genres?.length > 0 ? book.genres.map(genre => genre.name).join(', ') : 'Genres are not set'}</div>

                        <div className="col-md-1">{book.page_count}</div>

                        { auth.user && (
                            <div className="col-md-2 text-end">
                                <Link href={`/books/${book.id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
                                <button
                                    onClick={(e) => handleDelete(book.id)}
                                    className="btn btn-outline-danger btn-sm">Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Pagination links={books.links} meta={books.meta}/>

        </>
    );
}
