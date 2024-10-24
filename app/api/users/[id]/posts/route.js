import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectTODB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts", { status: 500 });
    }
}