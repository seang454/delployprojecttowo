import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL;
console.log('baseUrl :>> ', baseUrl);
export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({baseUrl:`${baseUrl}`}),
    endpoints: (build) => ({

    })
})

