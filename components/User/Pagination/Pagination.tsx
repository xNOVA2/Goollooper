import Image from "next/image";
import React from "react";

export default function Pagination({
  currentPage,
  totalPages = 2,
  totalItems,
  limit,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  limit?: number;
  onPageChange: (page: number) => void;
}) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (page?: number) => {
    if (page) {
      onPageChange(page);
    } else if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageButtons = () => {
    const buttons = [];
    const visiblePages = 5; // Number of visible page buttons
    const totalPagesToShow = Math.min(totalPages, visiblePages);
    const ellipsisThreshold = 3; // Threshold for showing ellipsis

    if (totalPages <= visiblePages) {
      // If total pages are less than or equal to visible pages, show all page buttons
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      // If total pages are greater than visible pages, show a subset of pages with ellipsis
      if (currentPage <= ellipsisThreshold + 1) {
        // Show first pages without ellipsis
        for (let i = 1; i <= totalPagesToShow - 1; i++) {
          buttons.push(renderPageButton(i));
        }
        buttons.push(renderEllipsis());
        buttons.push(renderPageButton(totalPages));
      } else if (currentPage >= totalPages - ellipsisThreshold) {
        // Show last pages without ellipsis
        buttons.push(renderPageButton(1));
        buttons.push(renderEllipsis());
        for (
          let i = totalPages - (totalPagesToShow - 2);
          i <= totalPages;
          i++
        ) {
          buttons.push(renderPageButton(i));
        }
      } else {
        // Show pages with ellipsis on both ends
        buttons.push(renderPageButton(1));
        buttons.push(renderEllipsis());
        const startPage = currentPage - Math.floor(totalPagesToShow / 2);
        const endPage = currentPage + Math.floor(totalPagesToShow / 2);
        for (let i = startPage; i <= endPage; i++) {
          buttons.push(renderPageButton(i));
        }
        buttons.push(renderEllipsis());
        buttons.push(renderPageButton(totalPages));
      }
    }

    return buttons;
  };

  const renderPageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      className={`${
        pageNumber === currentPage
          ? "bg-PrimaryColor text-white"
          : "bg-backGroundColor text-black"
      } px-4 py-2 rounded`}
      onClick={() => handleNextPage(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderEllipsis = () => <span className="mx-2">...</span>;

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-subTitleColor">{`Showing 1 to ${limit} of ${totalItems} entries`}</p>
        {/* <p className="text-sm text-subTitleColor">{`Showing ${
          (currentPage - 1) * 5 + 1
        } of ${totalItems} entries`}</p> */}
      </div>
      <div className="flex items-center gap-1">
        <button
          className="text-black px-4 py-2 rounded flex items-center"
          onClick={handlePreviousPage}
        >
          <Image
            src={"/assets/Image/ArrowLeft.svg"}
            alt="Arrow Icon"
            width={5}
            height={5}
          />
          <span className="ml-2">Previous</span>
        </button>
        {getPageButtons()}
        <button
          className="text-black px-4 py-2 rounded flex items-center"
          onClick={() => handleNextPage()}
        >
          <span className="mr-2">Next</span>
          <Image
            src={"/assets/Image/ArrowRight.svg"}
            className=""
            alt="Arrow Icon"
            width={5}
            height={5}
          />
        </button>
      </div>
    </div>
  );
}
