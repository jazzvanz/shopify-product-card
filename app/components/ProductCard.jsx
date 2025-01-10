import {Link} from '@remix-run/react';
import {
  // getSelectedProductOptions,
  useOptimisticVariant,
  // getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  // useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
// import {ProductForm} from '~/components/ProductForm';

export function ProductCard({product}) {
  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  // useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  // const productOptions = getProductOptions({
  //   ...product,
  //   selectedOrFirstAvailableVariant: selectedVariant,
  // });

  const {title, collections, images} = product;

  const selectedVariantsSecondaryImage = images.nodes.filter((image) => {
    if (!image?.altText) return false;
    return image.altText.includes(selectedVariant.title.toLowerCase());
  });

  const brand = collections.edges[0].node;

  return (
    <div className="flex flex-col">
      {selectedVariant?.compareAtPrice && <strong>Sale</strong>}
      <ProductImage
        image={selectedVariant?.image}
        secondaryImage={selectedVariantsSecondaryImage[0].node}
      />
      <div className="product-main">
        {/* <ProductForm
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        /> */}
        <Link to={`/collections/${brand.handle}`}>{brand.title}</Link>
        <h1>{title}</h1>
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
      </div>
    </div>
  );
}
