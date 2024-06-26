import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userData: builder.query({
      query: ({ id }) => ({
        url: `/?type=userInfo&id=${id}`,
        method: "GET",
      }),
    }),
    GetWithdraws: builder.query({
      query: () => ({
        url: `/?type=GetAllwithdrawals`,
        method: "GET",
      }),
    }),
    submit: builder.mutation({
      query: ({ id, tx }) => ({
        url: `/?type=Submit&id=${id}&tx=${tx}`,
        method: "GET",
      }),
    }),
    setStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/?type=setStatus&id=${id}&status=${status}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUserDataQuery,
  useGetWithdrawsQuery,
  useSubmitMutation,
  useSetStatusMutation,
} = userApi;
