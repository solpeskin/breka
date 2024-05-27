import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realTimeDatabase";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['profileImageGet', 'productsCart', 'savedProducts'], // Etiquetas consistentes
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProducts: builder.query({
            query: () => `products.json`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response);
                return responseTransformed;
            }
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response);
                return responseTransformed;
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response);
                if (responseTransformed.length) return responseTransformed[0];
                return null;
            }
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet']
        }),
        getProductsCart: builder.query({
            query: (localId) => `productsCart/${localId}.json`,
            providesTags: ['productsCart']
        }),
        postProductsCart: builder.mutation({
            query: ({ cartList, localId }) => ({
                url: `productsCart/${localId}.json`,
                method: 'PUT',
                body: {
                    cartList
                },
            }),
            invalidatesTags: ['productsCart'],
        }),
        getSavedProducts: builder.query({
            query: (localId) => `savedProducts/${localId}.json`,
            providesTags: ['savedProducts']
        }),
        postSavedProducts: builder.mutation({
            query: ({ savedProducts, localId }) => ({
                url: `savedProducts/${localId}.json`,
                method: 'PUT',
                body: {
                    savedProducts
                },
            }),
            invalidatesTags: ['savedProducts'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    useGetProductsQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetProductsCartQuery,
    usePostProductsCartMutation,
    useGetSavedProductsQuery,
    usePostSavedProductsMutation
} = shopApi;
