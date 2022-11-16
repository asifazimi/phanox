import { useRouter } from "next/router";

import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useProductContext } from "../../lib/context";
import { RadioGroup } from "@headlessui/react";

// Icons
import {
  CheckIcon,
  StarIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
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
  const { onAdd, quantity } = useProductContext();

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

  // Add new items
  const addItems = (e) => {
    e.preventDefault();
    onAdd(product, quantity);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">${price}</p>

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
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <form onSubmit={addItems}>
              <div className="sm:flex sm:justify-between">
                {/* Size selector */}
                {/* <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                    Size
                  </RadioGroup.Label>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        as="div"
                        key={size.name}
                        value={size}
                        className={({ active }) =>
                          classNames(
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label
                              as="p"
                              className="text-base font-medium text-gray-900"
                            >
                              {size.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="p"
                              className="mt-1 text-sm text-gray-500"
                            >
                              {size.description}
                            </RadioGroup.Description>
                            <div
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup> */}
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
                >
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="fflex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 "
                >
                  Add to cart
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
