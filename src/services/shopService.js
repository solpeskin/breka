import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../databases/realTimeDatabase"

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}), //configurar URL de base
    tagTypes: ['profileImageGet'], //tags
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProducts: builder.query({
            query: () => `products.json`,
            transformResponse: (response)=>{
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        getProductsByCategory: builder.query({ //llamamos a la datas
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response)=>{
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response)=>{
                const responseTransformed = Object.values(response)
                if (responseTransformed.length) return responseTransformed[0]
                return null

            }
        }),
        //postOrder: builder.mutation({
            //query: ({...order}) => ({
              //  url: 'orders.json',
                //method: 'POST',
                //body: order
            //})
        //})
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        postProfileImage: builder.mutation({
            query: ({image, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet']
        }),
    }),
})

export const {
    useGetCategoriesQuery, 
    useGetProductByIdQuery, 
    useGetProductsByCategoryQuery, 
    useGetProductsQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation
} = shopApi