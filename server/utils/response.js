// server/utils/response.js

// export function successResponse(data, message = "Success") {
//   return {
//     success: true,
//     message,
//     data,
//   };
// }

// export function errorResponse(message = "Something went wrong") {
//   return {
//     success: false,
//     message,
//   };
// }

// server/utils/response.js

export function successResponse(data, message = "Success", meta = null) {
  return {
    success: true,
    message,
    data,
    meta,
  };
}

export function errorResponse(
  message = "Something went wrong",
  statusCode = 500,
) {
  return {
    success: false,
    message,
    statusCode,
  };
}
