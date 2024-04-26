"use client";
import { useGetProductDetailQuery } from "@/app/redux/api/product/product";
import Link from "next/link";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const id = params.productId;
  const { data: product, isLoading, isError } = useGetProductDetailQuery(id);
  console.log("these are product", product);
  return (
    <>
      {isLoading ? (
        <>
          {" "}
          {[...new Array(1)].map((p, index) => (
            <div className="w-full flex flex-wrap justify-center">
              <article key={index} className="skeleton-card w-full">
                <div className="skeleton skeleton-card-img"></div>
                <div className="skeleton-card-text">
                  <h2 className="skeleton skeleton-card-title"></h2>
                  <h4 className="skeleton skeleton-card-brand"></h4>
                  <p className="skeleton skeleton-card-description"></p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="skeleton skeleton-card-price"></p>
                    <p className="skeleton skeleton-card-rating"></p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="px-[15%] flex flex-1 pt-16">
            <div className="w-full  flex flex-1 bg-slate-100  rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className=" rounded-t-lg flex-1 w-full h-[250px] object-cover"
                  src={`/uploads/${product?.coverImage}`}
                  alt="product image"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate capitalize">
                    {product?.title}
                  </h5>
                  <h6 className="text-sm font-light tracking-tight text-gray-900 dark:text-white">
                    {product?.author}
                  </h6>
                </a>

                <div className="flex gap-3 justify-between flex-col mt-5">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{product?.discountPrice}
                    </span>
                    <span className="text-sm font-light text-gray-900 dark:text-white">
                      MRP: <del>₹{product?.price}</del>
                    </span>
                  </div>

                  <Link
                    href={`/view/${product?._id}`}
                    className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-blue-700 dark:focus:ring-teal-800"
                  >
                    buy now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default page;
