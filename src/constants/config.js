//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "loading...",
    message: "Data is being loaded,Please wait",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occured while fetching response from server. Please try again",
  },
  requestFailure: {
    title: "Error",
    message: "An error occuered while parsing request data",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect with the server. Please check internet connectivity.",
  },
};

//API SERVICE CALL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE",params:true/false,query:true/false }
export const SERVICE_CALL = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "/post", method: "GET", query: true },
  updatePost: { url: "/update", method: "PUT", query: true },
  deletePost: { url: "/deletePost", method: "DELETE", query: true },
  newComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },
};
