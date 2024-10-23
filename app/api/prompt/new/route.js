import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { prompt, tag, userId } = await req.json();

    try {
        await connectTODB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201});
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}