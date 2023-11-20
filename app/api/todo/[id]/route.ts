import { NextApiResponse } from "next";

import db from "../../../../utils/db";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, res: NextApiResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    const res = await db
      .collection("todo")
      .doc(id as string)
      .delete();

    console.log("This is the res", res);
    return Response.json("Deleted");
  } catch (e) {
    console.log("Error", e);
  }
}

export async function PUT(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.body;
    let passedValue = await new Response(body).text();
    let valueToJson = JSON.parse(passedValue);
    const id = req.nextUrl.pathname.split("/").pop();
    await db
      .collection("todo")
      .doc(id as string)
      .update({
        ...valueToJson,
        updated: new Date().toISOString(),
      });
    return Response.json("Updated");
  } catch (e) {
    console.log("Error", e);
  }
}
