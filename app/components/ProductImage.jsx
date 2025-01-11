import {Image} from '@shopify/hydrogen';

/**
 * @param {{
 *   image: ProductVariantFragment['image'];
 * }}
 */
export function ProductImage({image, secondaryImage}) {
  if (!image) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-image relative rounded-md border-1 border-gray-300">
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
  );
}

/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
