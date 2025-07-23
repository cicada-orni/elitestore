'use client'
import { useState } from 'react'
import { Heading } from '../atoms/Heading'
import { Button } from '../atoms/button'
import { StarRating } from '../atoms/StarRating'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GraphQLClient, gql } from 'graphql-request'
import { GET_PRODUCT_BY_ID } from '@/graphql/queries'
import { ProductData, Review } from '@/lib/definations'
const SUBMIT_REVIEW_MUTATION = gql`
  mutation SubmitReview($input: ReviewInput!) {
    submitReview(input: $input) {
      id
      rating
      comment
      author {
        id
        email
      }
    }
  }
`

type SubmitReviewVariable = {
  input: {
    product_id: string
    rating: number
    comment: string
  }
}

export function ReviewForm({ product_id }: { product_id: string }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: SubmitReviewVariable) => {
      const client = new GraphQLClient(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`,
      )
      return client.request(SUBMIT_REVIEW_MUTATION, variables)
    },
    onMutate: async (newReviewForm: SubmitReviewVariable) => {
      await queryClient.cancelQueries({
        queryKey: [GET_PRODUCT_BY_ID, { id: product_id }],
      })

      const previousProductData = queryClient.getQueryData<ProductData>([
        GET_PRODUCT_BY_ID,
        { id: product_id },
      ])

      queryClient.setQueryData<ProductData>(
        [GET_PRODUCT_BY_ID, { id: product_id }],
        (oldData) => {
          if (!oldData || !oldData.product) return oldData
          const optimisticReview: Review = {
            id: `optimistic${Date.now()}`,
            rating: newReviewForm.input.rating,
            comment: newReviewForm.input.comment,
            author: { id: 'temp-user', email: 'Posting...' },
          }
          return {
            ...oldData,
            product: {
              ...oldData.product,
              reviews: [optimisticReview, ...(oldData.product.reviews || [])],
            },
          }
        },
      )
      return { previousProductData }
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<ProductData>(
        [GET_PRODUCT_BY_ID, { id: product_id }],
        context?.previousProductData,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_PRODUCT_BY_ID, { id: product_id }],
      })
    },
  })

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate({
      input: {
        product_id: product_id,
        rating: rating,
        comment: comment,
      },
    })
    setRating(0)
    setComment('')
  }

  return (
    <div className="mt-8 border-t pt-6">
      <Heading as="h3" size="h3" className="text-xl">
        Write a review
      </Heading>
      <StarRating
        rating={rating}
        onRatingChange={handleRatingChange}
        className="mt-4"
      />
      <form className="mt-4" onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="h-24 w-full rounded-md border bg-transparent p-2 text-sm"
          disabled={isPending}
        />
        <Button className="mt-4" disabled={isPending}>
          {isPending ? 'Submitting' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
}
