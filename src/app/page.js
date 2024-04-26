"use client";
import BookCard from "./components/book-card";
import Loader from "./components/loader";
import { useGetCategoryQuery } from "./redux/api/category/category";
import { useGetProductQuery } from "./redux/api/product/product";

const Home = () => {
  const {
    isLoading: categoryLoading,
    isError: categoryError,
    error: categoryErrorData,
    data: categoryData,
  } = useGetCategoryQuery();
  const {
    isLoading: productLoading,
    isError: productError,
    error: productErrorData,
    data: productData,
  } = useGetProductQuery();

  return (
    <>
      <div className="flex flex-1 bg-gradient-to-r to-purple-700 from-pink-500 h-[400px] justify-center items-center">
        <div className="w-1/2 flex flex-col gap-2">
          <h1 className="text-white text-2xl font-semibold">
            Find something..
          </h1>
          <input
            type="search"
            className="border px-4 py-3 rounded-md"
            placeholder="Search by title, author, category etc"
          />
          <button
            type="submit"
            className="bg-white text-black rounded px-3 py-2 flex gap-1 items-center hover:bg-white self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search Product
          </button>
        </div>
      </div>

      <div className="px-[10%] mt-4">
        <div className="flex flex-1 gap-3">
          {categoryLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              {categoryData?.map((categ, i) => (
                <div key={i}>
                  <h2 className="px-5 py-1 rounded-full text-md border border-slate-500 hover:bg-orange-400 hover:text-white">
                    {categ.title}
                  </h2>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex-1 flex mt-5">
          <h1 className="text-slate-600 font-bold  text-3xl">
            Latest Books ({productData?.length})
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center mt-5">
          {productLoading ? (
            <>
              {[...new Array(10)].map((p, index) => (
                <>
                  <div
                    className="w-full flex flex-wrap"
                    style={{ width: "1400px" }}
                  >
                    <article
                      key={index}
                      className="skeleton-card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4"
                    >
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
                </>
              ))}
            </>
          ) : (
            productData?.map((book, index) => (
              <BookCard key={index} book={book} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
