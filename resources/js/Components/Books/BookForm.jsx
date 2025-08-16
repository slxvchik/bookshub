import {MultiSelect} from "primereact/multiselect";
import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {InputNumber} from "primereact/inputnumber";
import {FileUpload} from "primereact/fileupload";
import {Link, router, usePage} from "@inertiajs/react";

export default function BookForm({ authors, genres, book = null}) {

    const { errors } = usePage().props;

    const isEditMode = !!book;

    const handleSubmit = () => {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('authorId', formData.authorId);
        data.append('year', formData.year);
        formData.genreIds.forEach(id => data.append('genreIds[]', id));
        data.append('pageCount', formData.pageCount);
        if (formData.coverImage) {
            data.append('coverImage', formData.coverImage);
        }

        if (isEditMode) {
            router.post(`/books/${book.id}?_method=PUT`, data);
        } else {
            router.post('/books', data);
        }
    };


    const [formData, setFormData] = useState({
        title: book?.title || '',
        authorId: book?.author_id || null,
        year: book?.year || null,
        genreIds: book?.genres?.map(g => g.id) || [],
        pageCount: book?.page_count || null,
        coverImage: null
    });

    const genreOptions = genres.map(genre => ({
        label: genre.name,
        value: genre.id
    }));

    const authorOptions = authors.map(author => ({
        label: author.name,
        value: author.id
    }));

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">

                    <div className="card-header bg-primary">
                        <h5 className="card-title mb-0">{isEditMode ? 'Edit book' : 'Add new book'}</h5>
                    </div>

                    <div className="card-body">

                        {errors && Object.keys(errors).length > 0 && (
                            <div className="alert alert-danger mb-4">
                                <ul className="mb-0">
                                    {Object.entries(errors).map(([field, message]) => (
                                        <li key={field}>{message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form id="bookForm">

                            <div className="mb-3 flex flex-column gap-2">
                                <label htmlFor="bookTitle">Title</label>
                                <InputText value={formData.title}
                                           onChange={(e) => {
                                               setFormData({...formData, title: e.target.value});
                                           }}
                                           id="bookTitle"
                                           placeholder="Input book title"/>
                                {errors?.title && <small className="p-error">{errors.title}</small>}
                            </div>

                            <div className="mb-3 flex flex-column gap-2">
                                <label htmlFor="bookAuthor" className="form-label">Author</label>
                                <Dropdown
                                    filter
                                    value={formData.authorId}
                                    onChange={(e) => setFormData({...formData, authorId: e.value})}
                                    options={authorOptions}
                                    className="w-full" placeholder="Choose author"
                                    id="bookAuthor"
                                />
                                {errors?.authorId && <small className="p-error">{errors.authorId}</small>}
                            </div>

                            <div className="mb-3 flex flex-column gap-2">
                                <label htmlFor="bookYear">Publication year</label>
                                <InputNumber value={formData.year}
                                             onChange={(e) => {
                                                 setFormData({...formData, year: e.value})
                                             }}
                                             id="bookYear"/>
                                {errors?.year && <small className="p-error">{errors.year}</small>}
                            </div>

                            <div className="mb-3 flex flex-column gap-2">
                                <label htmlFor="bookGenre" className="form-label">Genres</label>
                                <MultiSelect
                                    value={formData.genreIds}

                                    onChange={(e) => setFormData({...formData, genreIds: e.value})}
                                    options={genreOptions}
                                    optionLabel="label"
                                    placeholder="Choose genres"
                                    display="chip"
                                    filter
                                    className="w-full"
                                    id="bookGenre"
                                />
                                {errors?.genreIds && <small className="p-error">{errors.genreIds}</small>}
                            </div>

                            <div className="mb-3 flex flex-column gap-2">
                                <label htmlFor="bookPages">Page count</label>
                                <InputNumber value={formData.pageCount}
                                             onChange={(e) => {
                                                 setFormData({...formData, pageCount: e.value})
                                             }}
                                             id="bookPages"/>
                                {errors?.pageCount && <small className="p-error">{errors.pageCount}</small>}
                            </div>


                            <div className="mb-3 flex flex-column gap-2">
                                <FileUpload
                                    name="coverImage"
                                    onSelect={(e) => {
                                        return setFormData({...formData, coverImage: e.files[0]});
                                    }}
                                    chooseLabel="Choose book cover"
                                    uploadLabel="Upload"
                                    cancelLabel="Cancel"
                                    accept="image/*"
                                    maxFileSize={2 * 1024 * 1024}
                                    invalidFileSizeMessage="The maximum book cover image size is 2 MB."
                                    emptyTemplate={<p className="m-0">Drag and drop the book image</p>}
                                />
                                {errors?.coverImage && <small className="p-error">{errors.coverImage}</small>}
                            </div>
                        </form>
                    </div>

                    <div className="card-footer bg-light">
                        <div className="d-flex justify-content-end">
                            <Link href="/" type="button" className="btn btn-secondary me-2">Отмена</Link>
                            <button onClick={handleSubmit} type="button" className="btn btn-primary">{isEditMode ? 'Сохранить' : 'Создать'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
