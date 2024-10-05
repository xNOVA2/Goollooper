export const Chips = ({
    id,
    text,
    selected,
    isMultipleSelected,
    isSubCategory,
    hideCross,
    onSubCategoryClick,
    onKeywordClick,
    currentSelected,
  }: {
    id: number;
    text: string;
    selected?: number | number[];
    isMultipleSelected?: boolean;
    isSubCategory: boolean;
    hideCross?: boolean;
    onSubCategoryClick?: (name: string) => void;
    onKeywordClick?: (index: number, name: string) => void;
    currentSelected?: (index: number) => void;
  }) => {
    const isSelected = Array.isArray(selected) ? selected.includes(id) : (isSubCategory && selected === id);
    return (
      <div 
        className={`${isSelected ? "bg-PrimaryColor text-white" : "bg-white"} relative inline-block px-4 py-3 m-2 shadow-custom border border-border rounded-md cursor-pointer`}
        onClick={() => (isSubCategory || isMultipleSelected) &&  currentSelected && currentSelected(id)}
      >
        <span>{text}</span>
        <svg
          onClick={() => {
            if (isSubCategory && onSubCategoryClick) {
              onSubCategoryClick(text);
            } else if (onKeywordClick) {
              onKeywordClick(id, text);
            }
          }}
          xmlns="http://www.w3.org/2000/svg"
          className={hideCross ? "hidden" : "absolute top-0 right-0 cursor-pointer"}
          style={{ right: -10, top: -10 }}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <circle cx="11" cy="11" r="11" fill="#FF5C5C" className={hideCross ? "hidden" : ""} />
          <path
            d="M13.9972 13.9133L8.22852 8.14453"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.9406 8.19824L8.14453 13.9943"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
  };