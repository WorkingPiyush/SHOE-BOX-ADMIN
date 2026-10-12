
function PageChangeBtn({ handlePrevPage, handleNextPage, currentPage, data }) {
    console.log(data)
    return (
        <div className="flex items-center justify-center gap-5 p-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1}
                className={`px-4 py-2 rounded-xl font-medium transition cursor-pointer
                             ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 active:scale-95"}`}>
                ← Prev
            </button>
            <span className="px-5 py-2 text-lg font-bold bg-gray-100 rounded-xl shadow-sm">
                {currentPage}
            </span>

            <button
                onClick={handleNextPage}
                disabled={currentPage === data?.totalPages}
                className={`px-4 py-2 rounded-xl font-medium transition cursor-pointer
                            ${currentPage === data?.totalPages
                        ? "bg-gray-200 text-gray-400 disabled:cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 active:scale-95"}`}>
                Next →
            </button>
        </div>
    )
}

export default PageChangeBtn
