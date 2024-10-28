import Feed from "@components/Feed"
import { connectTODB } from "@utils/database"
import Prompt from "@models/prompt"
import User from "@models/user";

const Home = async () => {
  await connectTODB();
  const prompts = await Prompt.find({}).populate("creator").lean();

  return (
      <section className="w-full flex-center flex-col">
          <h1 className="head_text text-center">
              Discover & Share
              <br className="max-md:hidden"/>
              <span className="orange_gradient text-center">AI-Powered Prompts</span>
          </h1>

          <p className="desc text-center">
              Promptopia is an open-source AI prompting tool for the modern world to discover, create, and share creative prompts
          </p>

          {/* Pass prompts directly as initialPosts */}
          <Feed initialPosts={JSON.parse(JSON.stringify(prompts))} />
      </section>
  );
};

export default Home