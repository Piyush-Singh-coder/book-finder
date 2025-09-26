import React, { useState } from "react";
import { User, Calendar, BookOpen } from "lucide-react";

const BookCard = ({
  title,
  author,
  src,
  published,
  edition_count,
  publisher,
  language,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div className="card bg-base-100 shadow-md hover:shadow-lg transition w-full max-w-sm mx-auto">
        <figure className="h-60 w-full overflow-hidden">
          <img src={src} alt={title} className="h-full w-full object-cover" />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-lg">{title}</h2>

          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4" /> {author}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {published}
            </p>
            <p className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Edition: {edition_count}
            </p>
          </div>

          <div className="card-actions justify-end mt-3">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setOpen(true)}
            >
              Show More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h2 className="font-bold text-lg">{title}</h2>
            <img
              src={src}
              alt={title}
              className="w-40 mx-auto my-4 rounded shadow"
            />

            <div className="space-y-2 text-sm">
              <p>
                <b>Author:</b> {author}
              </p>
              <p>
                <b>Publisher:</b>{" "}
                {publisher ? publisher.slice(0, 3).join(", ") : "N/A"}
              </p>
              <p>
                <b>First Published:</b> {published}
              </p>
              <p>
                <b>Editions:</b> {edition_count}
              </p>
              <p>
                <b>Languages:</b>{" "}
                {language ? language.join(", ") : "Unknown"}
              </p>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
