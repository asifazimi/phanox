import Link from "next/link";

const Product = ({ product }) => {
  const { title, slug, image, price } = product.attributes;

  return (
    <div key={product.id} className="group relative">
      <Link href={`/product/${slug}`}>
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={image.data.attributes.formats.small.url}
            alt={title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 capitalize">
              <a href={`/product/${slug}`}>
                <span aria-hidden="true" className="absolute inset-0 " />
                {title}
              </a>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
