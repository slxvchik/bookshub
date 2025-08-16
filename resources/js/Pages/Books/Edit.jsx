import {Head} from "@inertiajs/react";
import AppLayout from "../../Components/Layouts/AppLayout.jsx";
import React from "react";
import BookForm from "../../Components/Books/BookForm.jsx";

export default function Edit({ book, genres, authors }) {

    return (

        <AppLayout>

            <Head title="Books development"/>

            <div className="container mt-4">

                <BookForm genres={genres} authors={authors} book={book}/>

            </div>

        </AppLayout>
    );
}
