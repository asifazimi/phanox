const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

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
  console.log(orders);
  return (
    user && (
      <div>
        {user.name}
        <h2></h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <h1>Order number: {order.id}</h1>
              <h2>{order.amount}</h2>
              <h2>Reciept Email: {order.receipt.email}</h2>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
