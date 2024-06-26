import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const token = queryParams.get("t") as string;

    const validTokens = process.env.VALID_TOKENS?.split(",") || [];

    if (!validTokens.includes(token)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());

    if (!formDataEntryValues || formDataEntryValues.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No files provided in the form data.",
      });
    }

    const folderName =
      queryParams.get("name") +
      "_" +
      (Math.random() + 1).toString(36).substring(6);

    if (!folderName) {
      return NextResponse.json({
        success: false,
        message: "Folder name is missing in the query parameters.",
      });
    }

    const baseURL = process.env.API_DOMAIN + process.env.API_USER + "/";
    const authHeader = {
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.API_USER}:${process.env.API_PASS}`).toString(
          "base64",
        ),
    };

    const urlwithFolder = `${baseURL}${folderName}/`;

    // Create the directory
    const dirResponse = await fetch(urlwithFolder, {
      method: "MKCOL",
      headers: authHeader,
    });

    if (!dirResponse.ok) {
      return NextResponse.json({
        success: false,
        message: `Failed to create directory: ${dirResponse.statusText}`,
      });
    }

    const description = queryParams.get("description");

    if (description) {
      // Create the description file
      const descResponse = await fetch(`${urlwithFolder}1description.txt`, {
        method: "PUT",
        headers: {
          ...authHeader,
          "Content-Type": "text/plain",
        },
        body: description,
      });

      if (!descResponse.ok) {
        return NextResponse.json({
          success: false,
          message: `Failed to create description file: ${descResponse.statusText}`,
        });
      }
    }

    const uploadFile = async (formDataEntryValue: FormDataEntryValue) => {
      if (
        typeof formDataEntryValue === "object" &&
        "arrayBuffer" in formDataEntryValue
      ) {
        const uploadResponse = await fetch(
          `${urlwithFolder}${formDataEntryValue.name}`,
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
          return NextResponse.json({
            success: false,
            message: `Failed to upload file ${formDataEntryValue.name}: ${uploadResponse.statusText}`,
          });
        }

        return uploadResponse;
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid file entry in form data.",
        });
      }
    };

    const uploadPromises = formDataEntryValues.map(uploadFile);

    await Promise.all(uploadPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Fal" });
  }
}
