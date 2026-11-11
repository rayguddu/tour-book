// src/utils/pagination.js
// Shared page/limit math for any list endpoint
const getPagination = (query) => {
    // page: whole number >= 1, default 1
    let page = parseInt(query.page, 10);
    if (!Number.isInteger(page) || page < 1) page = 1;

    // limit: whole number 1..50, default 9
    let limit = parseInt(query.limit, 10);
    if (!Number.isInteger(limit) || limit < 1) limit = 9;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;
    return { page, limit, skip };
};

// Build the "pages" value from total + limit
const getTotalPages = (total, limit) => Math.ceil(total / limit) || 1;

module.exports = { getPagination, getTotalPages };