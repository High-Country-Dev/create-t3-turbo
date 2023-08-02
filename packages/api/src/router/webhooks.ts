import type { WebhookEvent } from '@clerk/backend'
import { z } from 'zod'

import type { User } from '@acme/db'
import { prismaUserFromClerkUser } from '@acme/shared'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const webhookRouter = createTRPCRouter({
  clerk: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/clerk-webhook' } })
    .input(z.object({}).passthrough())
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.svixValidated) {
        console.log('Attempted webhook without svix validation!')
        return { success: false }
      }
      const event = input as WebhookEvent
      let user: User | undefined = undefined
      switch (event.type) {
        case 'user.created':
          user = await ctx.prisma.user.create({
            data: prismaUserFromClerkUser(event.data),
          })
          return { success: true, user }
        case 'user.updated':
          user = await ctx.prisma.user.upsert({
            where: { id: event.data.id },
            create: prismaUserFromClerkUser(event.data),
            update: prismaUserFromClerkUser(event.data),
          })
          return { success: true, user }
        case 'user.deleted':
          try {
            user = await ctx.prisma.user.delete({
              where: { id: event.data.id },
            })
          } catch (e) {
            console.log("User likely doesn't exist")
          }
          return { success: true, user }
        case 'email.created':
        case 'organization.created':
        case 'organization.deleted':
        case 'organization.updated':
        case 'organizationInvitation.accepted':
        case 'organizationInvitation.created':
        case 'organizationInvitation.revoked':
        case 'organizationMembership.created':
        case 'organizationMembership.deleted':
        case 'organizationMembership.updated':
        case 'session.created':
        case 'session.ended':
        case 'session.removed':
        case 'session.revoked':
        case 'sms.created':
          return { success: true }
      }
    }),
})
