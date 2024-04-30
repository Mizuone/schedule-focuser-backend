import { builder } from "../builder";
import { prisma } from "../db";

builder.prismaObject("task", {
    fields: t => ({
        id: t.exposeID("id"),
        title: t.exposeString("title"),
        duration: t.exposeString("duration"),
        startTime: t.exposeInt("startTime"),
        endTime: t.exposeInt("endTime"),
        date: t.expose("date", {
            type: "Date",
        }),
    }),
})

builder.queryField("task", (t) => 
    t.prismaField({
        type: ["task"],
        resolve: async (query, root, args, ctx, info) => {
            return prisma.task.findMany({ ...query });
        },
    })
);