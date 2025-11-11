import { db } from "@/app/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";



export async function GET(){
    const snapshot = await getDocs(collection(db, "user"));
    const user = snapshot.docs.map(doc=> ({id: doc.id,...doc.data()}));
    return NextResponse.json(user)
}
export  async function POST(req:Request){
    try{
        const body = await req.json();
        const newTaskRef = await addDoc(collection(db, "user"),{

            title:body.title,
            description:body.description || "",
            completed: false,
            priority:body.priority|| "medium",
            createdAt: new Date(),
            updateAt: new Date(),
        });
        return NextResponse.json({
            id:newTaskRef.id,
            description:body.description || "",
            completed: false,
            priority:body.priority|| "medium",
            createdAt: new Date(),
            updateAt: new Date(),

        });
    }catch (error) {
        console.error("POST/ api/tasks error:", error);
        return NextResponse.json({error:"Failed to add task"},{status:500});
      
    }
}
  



