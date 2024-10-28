import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

export const dynamic = 'force-dynamic';
export const GET = async (req) => {
    try {
        await connectTODB();

        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to fetch prompts", details: error.message }), { status: 500 });        
    }
}