const PAGE_SIZES = [5, 10, 25, 50];

function pageWindow(page, pageCount) {
  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, index) => {
    if (index && p - sorted[index - 1] > 1) result.push("gap-" + p);
    result.push(p);
  });
  return result;
}

export default function Pagination({ page, pageSize, total, disabled, onPageChange, onPageSizeChange }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = Math.min(total, page * pageSize);

  return (
    <nav className="adm-pagination" aria-label="Pagination">
      <div className="adm-pagination-info">
        <span>Showing {from}–{to} of {total}</span>
        {onPageSizeChange && (
          <label>
            Rows
            <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
              {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>
        )}
      </div>
      <div className="adm-pagination-pages">
        <button type="button" disabled={disabled || page <= 1} onClick={() => onPageChange(page - 1)}>‹ Prev</button>
        {pageWindow(page, pageCount).map((item) => (
          typeof item === "string"
            ? <span key={item} className="adm-pagination-gap">…</span>
            : (
              <button
                type="button"
                key={item}
                className={item === page ? "is-current" : ""}
                aria-current={item === page ? "page" : undefined}
                disabled={disabled}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            )
        ))}
        <button type="button" disabled={disabled || page >= pageCount} onClick={() => onPageChange(page + 1)}>Next ›</button>
      </div>
    </nav>
  );
}
