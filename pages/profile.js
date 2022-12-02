import Head from "next/head";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import formatMoney from "../lib/formatMoney";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  return (
    user && (
      <div className="bg-white">
        <Head>
          <title>Profile</title>
        </Head>

        <div className="mx-auto max-w-7xl py-14 px-4 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check your profile info and the status of recent orders
            </p>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-20">
              <div>
                <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-gray-900">Full Name</dt>
                      <dd className="sm:mt-1">{user.name}</dd>
                    </div>
                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Email</dt>
                      <dd className="sm:mt-1">{user.email}</dd>
                    </div>
                  </dl>
                </div>

                {orders.length > 0 ? (
                  <table className="mt-4 w-full text-gray-500 sm:mt-6">
                    <caption className="sr-only">Products</caption>
                    <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pr-8 font-normal sm:w-1/5 lg:w-1/3"
                        >
                          Order Number
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="hidden py-3 pr-8 font-normal sm:table-cell"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="w-1/5 py-3 text-right font-normal"
                        >
                          Receipt Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.id}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {formatMoney(order.amount)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {formatMoney(order.amount)}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            <p className="flex space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="green"
                                className="w-5 h-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{order.status}</span>
                            </p>
                          </td>
                          <td className="whitespace-nowrap py-6 text-right font-medium">
                            <span className="hidden lg:inline">
                              {user.email}
                            </span>
                            <span className="sr-only">, {order.id}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="mb-[18rem]">
                    <p className="text-center mt-10">No Recent Orders Found!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
