// server/utils/pagination.js

export function paginate(items, page = 1, limit = 12) {
  page = Number(page) || 1;
  limit = Number(limit) || 12;

  const total = items.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    items: items.slice(start, end),

    meta: {
      page,
      limit,
      total,
      totalPages,

      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    },
  };
}
