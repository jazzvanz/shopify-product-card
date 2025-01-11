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
  
      <div className="product-image relative">
        <Image
          alt={image.altText || 'Product Image'}
          aspectRatio="1/1"
          data={image}
          key={image.id}
          sizes="(min-width: 45em) 50vw, 100vw"
          className="hover:opacity-1 absolute top-0 right-0 bottom-0 left-0"
        />
        {secondaryImage && (
          <Image
            alt={secondaryImage.altText || 'Secondary Product Image'}
            aspectRatio="1/1"
            data={secondaryImage}
            key={secondaryImage.id}
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
