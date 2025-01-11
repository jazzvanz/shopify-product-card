import {useNavigate} from '@remix-run/react';
/**
 * @param {{
 *   productOptions: MappedProductOptions[];
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 * }}
 */
export function ProductForm({productOptions, selectedVariant}) {
  const navigate = useNavigate();
  return (
    <div className="product-form">
      {productOptions.map((option) => {
        return (
          <div className="product-options" key={option.name}>
            <div className="product-options-grid">
              {option.optionValues.map((value) => {
                const {name, variantUriQuery, selected, available, exists} = value;
                return (
                  <button
                    type="button"
                    className={`rounded-full h-6 w-6 product-options-item${
                      exists && !selected ? ' link' : ''
                    }`}
                    aria-label={name}
                    key={option.name + name}
                    style={{
                      border: selected
                        ? '1px solid black'
                        : '1px solid transparent',
                      opacity: available ? 1 : 0.3,
                      backgroundColor: name,
                    }}
                    disabled={!exists}
                    onClick={() => {
                      if (!selected) {
                        navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  />
                );
              })}
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Maybe} Maybe */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').ProductOptionValueSwatch} ProductOptionValueSwatch */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
