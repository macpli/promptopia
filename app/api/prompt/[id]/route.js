import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, {params}) => {
    try {
        await connectTODB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts", { status: 500 });
        
    }
}

// Patch
export const PATCH = async (request, {params}) => {
    const { prompt, tag } = await request.json();

    try {
        await connectTODB();

        const exisitingPrompt = await Prompt.findById(params.id);
        if(!exisitingPrompt) return new Response("Prompt not found", { status: 404 });

        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;

        await exisitingPrompt.save();
        console.log('in patch')
        return new Response(JSON.stringify(exisitingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
}

// DELETE
export const DELETE = async (request, {params}) => {
    try {
        await connectTODB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}