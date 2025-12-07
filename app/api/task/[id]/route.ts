import { db } from "@/app/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function PUT (req:Request,context: {params: Promise<{id: string}>}){
    try{
        const {id} = await context.params;
        if(!id){
            return NextResponse.json({error:"Task ID is required"},{status:400});
        }
        const body = await req.json();
        const taskRef = doc(db,"user",id);
        await updateDoc(taskRef,{
            ...body,
            updatedAt : new Date(),
        });

        return NextResponse.json({id,...body});

    }catch(err){
        console.error("PUT/api/tasks/:id error:", err);
        return NextResponse.json({error:"Failed to update task"},{ status:500});
    }
}
export async function DELETE(REQ:Request, context:{params: Promise<{id: string}>}){
    try{
    const {id} = await context.params;
    if (!id){
        return NextResponse.json({error:"Task ID is required"},{ status:400});
    }
    const taskRef = doc(db,"user",id);
    await deleteDoc(taskRef);
    return NextResponse.json({messages:"Task deleted"});

} catch(error){
    console.error("DELETE/api/task/:id error:", error);
    return NextResponse.json ({error:"Failed to delete task"},{ status:500});

}
}