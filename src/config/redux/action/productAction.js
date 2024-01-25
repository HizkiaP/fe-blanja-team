import api from "../../api";

export const getAllProduct = ({keyword, sort}) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_ALL_PRODUCT_REQUEST",
    });
    const response = await api.get(`/product?keyword=${keyword}&sort=${sort}`);
    const product = response.data;
    dispatch({
      type: "GET_ALL_PRODUCT_SUCCESS",
      payload: {
        productList: product,
      },
    });
  } catch (error) {
    dispatch({
      type: "GET_ALL_PRODUCT_FAILURE",
      payload: error.response,
    });
  }
};


export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_PRODUCT_REQUEST_ID",
    });
    const response = await api.get(`/product/${id}`);
    const product = response.data;
    dispatch({
      type: "GET_PRODUCT_SUCCESS_ID",
      payload: product,
    });
  } catch (error) {
    dispatch({
      type: "GET_PRODUCT_FAILURE_ID",
      payload: error.response,
    });
  }
};

// export const updateProduct = (id, data) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "UPDATE_PRODUCT_REQUEST",
//     });
//     const response = await api.put(`${id}`, data);
//     const product = response.data.data;
//     dispatch({
//       type: "UPDATE_PRODUCT_SUCCESS",
//       payload: product,
//     });
//   } catch (error) {
//     dispatch({
//       type: "UPDATE_PRODUCT_FAILURE",
//       payload: error.response,
//     });
//   }
// };

// export const createProduct = (data) => async (dispatch) => {
//   try {
//     dispatch({ type: "CREATE_PRODUCT_REQUEST" });
//     const response = await api.post(``, data);
//     const product = response.data.data;
//     dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: product });
//     return product;
//   } catch (error) {
//     dispatch({ type: "CREATE_PRODUCT_FAILURE", payload: error.response });
//   }
// };

// export const getMyProduct = () => async (dispatch) => {
//   try {
//     dispatch({ type: "GET_MY_PRODUCT_REQUEST" });
//     const response = await api.get(``);
//     const product = response.data.data;
//     dispatch({
//       type: "GET_MY_PRODUCT_SUCCESS",
//       payload: product,
//     });
//   } catch (error) {
//     dispatch({
//       type: "GET_MY_PRODUCT_FAILURE",
//       payload: error.response,
//     });
//   }
// };

