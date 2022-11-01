export const PRODUCT_QUERY = `
query {
    products {
      data {
        attributes {
          title
          description
          price
          slug
          color
          image {
            data {
                attributes {
                    formats
                    }
                }
            }
            }
        }
    }
  }
`;
