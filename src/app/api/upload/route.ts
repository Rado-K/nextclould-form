// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    if (!formDataEntryValues || formDataEntryValues.length === 0) {
      throw new Error("No files provided in the form data.");
    }

    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const folderName =
      queryParams.get("name") +
      "_" +
      (Math.random() + 1).toString(36).substring(6);

    if (!folderName) {
      throw new Error("Folder name is missing in the query parameters.");
    }

    const baseURL = process.env.API_DOMAIN + process.env.API_USER;
    const authHeader = {
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.API_USER}:${process.env.API_PASS}`).toString(
          "base64",
        ),
    };

    // Create the directory
    const dirResponse = await fetch(`${baseURL}${folderName}/`, {
      method: "MKCOL",
      headers: authHeader,
    });

    if (!dirResponse.ok) {
      throw new Error(`Failed to create directory: ${dirResponse.statusText}`);
    }

    const description = queryParams.get("description");

    // Create the description file
    const descResponse = await fetch(
      `${baseURL}${folderName}/1description.txt`,
      {
        method: "PUT",
        headers: {
          ...authHeader,
          "Content-Type": "text/plain",
        },
        body: description,
      },
    );

    if (!descResponse.ok) {
      throw new Error(
        `Failed to create description file: ${descResponse.statusText}`,
      );
    }

    const uploadFile = async (formDataEntryValue: FormDataEntryValue) => {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        const uploadResponse = await fetch(
          `${baseURL}${folderName}/${formDataEntryValue.name}`,
          {
            method: "PUT",
            headers: {
              ...authHeader,
              "Content-Type": formDataEntryValue.type,
            },
            body: formDataEntryValue,
          },
        );

        if (!uploadResponse.ok) {
          throw new Error(
            `Failed to upload file ${formDataEntryValue.name}: ${uploadResponse.statusText}`,
          );
        }

        return uploadResponse;
      } else {
        throw new Error("Invalid file entry in form data.");
      }
    };

    const uploadPromises = formDataEntryValues.map(uploadFile);
    await Promise.all(uploadPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Fal" });
  }
}
