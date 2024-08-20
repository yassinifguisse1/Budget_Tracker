import { GetFormmatterForCurrency } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET (request : Request){
    const user = await currentUser()
    if(!user){
        redirect('/sign-in')
    }
    const {searchParams}=new URL(request.url)
    const from = searchParams.get('from');
    const to = searchParams.get("to");
    const qureyParams = OverviewQuerySchema.safeParse({from , to})

    if(!qureyParams.success){
        return Response.json(qureyParams.error.message,{
            status: 400
        })
    }

    const transactions = await getTransactionsHistory(
        user.id,
        qureyParams.data.from,
        qureyParams.data.to
    
    )
    return Response.json(transactions)
} 

export type GetTransactionHistoryResponseType = Awaited<ReturnType<typeof getTransactionsHistory>>
async function getTransactionsHistory(userId:string , from : Date , to: Date){
    const userSettings = await prisma.userSettings.findUnique({
        where: {
            userId,
        },
    
    });
    if(!userSettings){
        throw new Error("user settings not found")
    }
    const formatter = GetFormmatterForCurrency(userSettings.currency)
    const transactions = await prisma.transaction.findMany({
        where: {
            userId ,
            date:{
                gte:from,
                lte:to
            },
        },
        orderBy:{
            date:'desc'
        }
    })
    return transactions.map((transaction) =>({
        ...transaction,
        // lets format the amount with the user currenct
        formattedAmount: formatter.format(transaction.amount),
    }))
    

}