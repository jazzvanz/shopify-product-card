import {Link} from '@remix-run/react';
import {
  getSelectedProductOptions,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  Image,
  useSelectedOptionInUrlParam,
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
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, collections, images} = product;
  console.log(product, selectedVariant, 'hello');

  const selectedVariantsSecondaryImage = images.nodes.filter((image) => {
    if (!image?.altText) return false;
    return image.altText.includes(selectedVariant.title.toLowerCase());
  });

  const brand = collections.edges[0].node;
  // image={selectedVariant?.image}
  // secondaryImage={selectedVariantsSecondaryImage[0].node}
  return (
    <div className="flex flex-col">
      {selectedVariant?.compareAtPrice && <strong>Sale</strong>}

      <div className="product-image relative">
        <Image
          alt={selectedVariant?.image.altText || 'Product Image'}
          aspectRatio="1/1"
          data={selectedVariant?.image}
          key={selectedVariant?.image.id}
          sizes="(min-width: 45em) 50vw, 100vw"
          className="hover:opacity-1 absolute top-0 right-0 bottom-0 left-0"
        />
        {selectedVariantsSecondaryImage[0].node && (
          <Image
            alt={
              selectedVariantsSecondaryImage[0].node.altText ||
              'Secondary Product Image'
            }
            aspectRatio="1/1"
            data={selectedVariantsSecondaryImage[0].node}
            key={selectedVariantsSecondaryImage[0].node.id}
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        )}
      </div>
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
