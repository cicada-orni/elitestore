import { setup, assign, fromPromise } from 'xstate'
import { z } from 'zod'
import {
  ShippingAddressSchema,
  BillingAddressSchema,
  PaymentMethodSchema,
} from '@/lib/schemas'

type ShippingAddress = z.infer<typeof ShippingAddressSchema>
type BillingAddress = z.infer<typeof BillingAddressSchema>
type PaymentMethod = z.infer<typeof PaymentMethodSchema>

type SubmitOrderInput = {
  shippingAddress: ShippingAddress | null
  billingAddress: BillingAddress | null
  paymentMethod: PaymentMethod | null
}

export const checkoutMachine = setup({
  types: {
    context: {} as {
      shippingAddress: ShippingAddress | null
      billingAddress: BillingAddress | null
      paymentMethod: PaymentMethod | null
      error: string | null
    },
    events: {} as
      | { type: 'NEXT'; data: object }
      | { type: 'PREV' }
      | { type: 'SUBMIT' }
      | { type: 'RETRY' }
      | { type: 'xstate.done.actor.submitOrder'; output: { orderId: string } }
      | { type: 'xstate.error.actor.submitOrder'; error: unknown },
    input: {} as SubmitOrderInput,
  },
  actions: {
    assignShippingAddress: assign({
      shippingAddress: ({ event }) => {
        if (event.type === 'NEXT') {
          return event.data as ShippingAddress
        }
        return null
      },
    }),
    assignBillingAddress: assign({
      billingAddress: ({ event }) => {
        if (event.type === 'NEXT') {
          return event.data as BillingAddress
        }
        return null
      },
    }),
    assignPaymentMethod: assign({
      paymentMethod: ({ event }) => {
        if (event.type === 'NEXT') {
          return event.data as PaymentMethod
        }
        return null
      },
    }),
    assignError: assign({
      error: ({ event }) => {
        if (event.type === 'xstate.error.actor.submitOrder') {
          if (event.error instanceof Error) {
            return event.error.message
          }
          return 'An unexpected error occurred.'
        }
        return null
      },
    }),
  },
  actors: {
    submitOrder: fromPromise(async ({ input }: { input: SubmitOrderInput }) => {
      console.log('Submitting order with: ', input)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (Math.random() < 0.5) {
        throw new Error('Payment processing failed. Please try again')
      }
      return { orderId: 'xyz-123' }
    }),
  },
}).createMachine({
  id: 'checkout',
  initial: 'shippingAddress',
  context: {
    shippingAddress: null,
    billingAddress: null,
    paymentMethod: null,
    error: null,
  },
  states: {
    shippingAddress: {
      on: {
        NEXT: {
          target: 'billingAddress',
          actions: { type: 'assignShippingAddress' },
        },
      },
    },
    billingAddress: {
      on: {
        NEXT: {
          target: 'paymentMethod',
          actions: { type: 'assignPaymentMethod' },
        },
        PREV: { target: 'shippingAddress' },
      },
    },
    paymentMethod: {
      on: {
        NEXT: {
          target: 'confirming',
          actions: { type: 'assignPaymentMethod' },
        },
        PREV: { target: 'billingAddress' },
      },
    },
    confirming: {
      on: {
        SUBMIT: { target: 'submitting' },
        PREV: { target: 'paymentMethod' },
      },
    },
    submitting: {
      invoke: {
        src: 'submitOrder',
        input: ({ context }) => ({
          shippingAddress: context.shippingAddress,
          billingAddress: context.billingAddress,
          paymentMethod: context.paymentMethod,
        }),
        onDone: {
          target: 'success',
        },
        onError: {
          target: 'error',
          actions: { type: 'assignError' },
        },
      },
    },
    success: { type: 'final' },
    error: {
      on: {
        RETRY: { target: 'submitting' },
      },
    },
  },
})
