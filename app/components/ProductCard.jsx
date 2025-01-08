import {Link, useLoaderData} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
// import {ProductPrice} from '~/components/ProductPrice';
// import {ProductImage} from '~/components/ProductImage';

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader({context}) {
  await context.storefront.query(All_PRODUCTS_QUERY);
  return json({
    message: 'product message',
  });
}

/**
 * @param {ProductCardProps}
 */
export function ProductCard({product}) {
  /** @type {LoaderReturnData} */
  const {message} = useLoaderData();

  return (
    <Link className="recommended-product" to={`/products/${product.handle}`}>
      <Image
        data={product.images.nodes[0]}
        aspectRatio="1/1"
        sizes="(min-width: 45em) 20vw, 50vw"
      />
      <h4>{product.title}</h4>
      <h4>{message}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
        {/* <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        /> */}
      </small>
    </Link>
  );
}

// const PRODUCT_CARD_QUERY = `#graphql
//   fragment ProductCard on Product {
//     id
//     title
//     vendor
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     images(first: 1) {
//       nodes {
//         id
//         url
//         altText
//         width
//         height
//       }
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...ProductCard
//       }
//     }
//   }
// `;
