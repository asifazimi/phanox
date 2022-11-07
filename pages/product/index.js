import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../../lib/query";

// Components
import Product from "../../components/Product";

const ProductPage = () => {
  // Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });

  const { data, error, fetching } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Opps something is wrong. {error.message}</p>;
  const products = data.products.data;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          New Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
