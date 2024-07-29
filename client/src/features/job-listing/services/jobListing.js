import { baseApi } from "@/services/baseApi";
import { z } from "zod";
import { jobListingSchema } from "../constants/schemas";

export function createJobListing(data) {
  return baseApi
    .post("/job-listings", data)
    .then((res) => jobListingSchema.parseAsync(res.data));
}

export function getAllMyListings() {
  return baseApi
    .get("/job-listings/my-listings")
    .then((res) => z.array(jobListingSchema).parseAsync(res.data));
}

export function deleteListing(id) {
  return baseApi.delete(`/job-listings/${id}`);
}

export function getJobListing(id) {
  return baseApi
    .get(`/job-listings/${id}`)
    .then((res) => jobListingSchema.parseAsync(res.data));
}

export function editJobListing(id, data) {
  return baseApi
    .put(`/job-listings/${id}`, data)
    .then((res) => jobListingSchema.parseAsync(res.data));
}

export function createPublishPaymentIntent(id, duration) {
  return baseApi
    .post(`/job-listings/${id}/create-publish-payment-intent`, { duration })
    .then((res) => res.data);
}

export function getAllPublishedListings() {
  return baseApi
    .get("/job-listings/published")
    .then((res) => z.array(jobListingSchema).parseAsync(res.data));
}
