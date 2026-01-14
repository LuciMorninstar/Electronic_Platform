const Specs = ({ product }) => {
  if (!product?.specs) return null;

  return (
    <div className='w-full flex flex-col gap-5'>
      <h3>Tech Specs</h3>

      {Object.entries(product.specs).map(([category, details], i) => (
        <div className='specs_row_wrapper' key={i}>
          <h5 className='w-4/12 flex flex-row justify-center items-center'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h5>

          <ul className='w-8/12 py-3 flex flex-col gap-0'>
            {details && typeof details === "object" && !Array.isArray(details)
              ? Object.entries(details).map(([key, value], i) =>
                  value !== undefined && value !== null ? (
                    <li key={i} className='list_value_style'>
                      <span className='capitalize'>{key}</span>: <span>{value.toString()}</span>
                    </li>
                  ) : null
                )
              : Array.isArray(details)
              ? details.length > 0
                ? details.map((value, i) => (
                    <li key={i} className='list_value_style'>
                      <span>{value}</span>
                    </li>
                  ))
                : null
              : details
              ? <li className='list_value_style'><span>{details}</span></li>
              : null}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Specs