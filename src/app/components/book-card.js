"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ book }) => {
  return (
    <>
      <Image
        src={`/uploads/${book.coverImage}`}
        className=" rounded-t-lg w-full object-cover"
        alt="product image"
        height={80}
        width={80}
      />
      <div className="p-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate capitalize">
            {book.title.toLowerCase()}
          </h5>
          <h6 className="text-sm font-light tracking-tight text-gray-900 dark:text-white">
            {book.author}
          </h6>
        </a>

        <div className="flex gap-3 justify-between flex-col mt-5">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{book.discountPrice}
            </span>
            <span className="text-sm font-light text-gray-900 dark:text-white">
              MRP: <del>₹{book.price}</del>
            </span>
          </div>

          <Link
            href={`/view/${book._id}`}
            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-blue-700 dark:focus:ring-teal-800"
          >
            Know More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;
