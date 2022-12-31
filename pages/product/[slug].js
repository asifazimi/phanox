import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useProductContext } from "../../lib/context";
import { Quantity } from "../../styles/ProductDetails";

// Icons
import { CheckIcon, StarIcon, ClockIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const ProductDetails = () => {
  const router = useRouter();
  const slug = router.query.slug;

  // reviews
  const reviews = { average: 4, totalCount: 1624 };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // GLobal States
  const { onAdd, qty, setQty, increaseQuantity, decreaseQuantity } =
    useProductContext();

  // Reset Qty
  useEffect(() => {
    setQty(1);
  }, []);

  // Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: slug },
  });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const product = data.products.data[0].attributes;

  // Fetching product items
  const { title, description, image, price, size, color, inStock, leadTime } =
    product;

  const formatPrice = parseFloat(price).toFixed(2);

  return (
    <div className="bg-white">
      <Head>
        <title>Product Details</title>
      </Head>

      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 ">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">${formatPrice}</p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                {/* start reviews  */}
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
                {/* end reviews */}
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{description}</p>
            </div>

            <div className="mt-6 flex items-center">
              {product.inStock ? (
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ClockIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  aria-hidden="true"
                />
              )}
              <p className="flex space-x-2 ml-2 text-sm text-gray-500">
                <span>
                  {product.inStock
                    ? "In stock and ready to ship"
                    : `Ships in ${product.leadTime}`}
                </span>
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10  lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-w-1  aspect-h-1 overflow-hidden rounded-lg bg-[#FAFAFA]">
            <img
              src={image.data.attributes.formats.small.url}
              alt={title}
              className="h-full w-full object-cover object-center "
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            {/* Quantity */}
            <Quantity className="space-x-1">
              <span className="mr-1 text-base text-gray-500">Quantity</span>
              <button onClick={decreaseQuantity}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="text-base text-gray-500">{qty}</p>
              <button onClick={increaseQuantity}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Quantity>
            <div className="mt-10">
              <button
                className="fflex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                onClick={() => onAdd(product, qty)}
              >
                Add to cart
              </button>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="#"
                className="group inline-flex text-base font-medium"
              >
                <ShieldCheckIcon
                  className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="text-gray-500 hover:text-gray-700">
                  Lifetime Guarantee
                </span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
