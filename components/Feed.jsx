'use client';
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    
    <div className="mt-16 prompt_layout">
      { data ? data.map((post)=> (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
      )): <p>Loading...</p>}
    </div>
  )
}

const Feed = ({ initialPrompts }) => {
  const [searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState(initialPrompts || []);
  const [error, setError] = useState(null);
  const [filteredPrompts, setFilteredPrompts] = useState(initialPrompts || []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
        setSearchText(text);

        // Filter posts based on searchText
        const filtered = prompts.filter((prompt) => 
          prompt.creator.username.toLowerCase().includes(text) ||
          prompt.tag.toLowerCase().includes(text) ||
          prompt.prompt.toLowerCase().includes(text)
        );
        setFilteredPrompts(filtered);
  }

  const handleTagClick = (post) => {
    setSearchText(post.tag);

    const filtered = prompts.filter((prompt) => 
      prompt.tag.toLowerCase().includes(post.tag.toLowerCase()) 
    );
    setFilteredPrompts(filtered);
  }

  useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const response = await fetch('/api/prompt');
                if (!response.ok) {
                    throw new Error(`Failed to fetch prompts: ${response.statusText}`);
                }
                const data = await response.json();
                setPrompts(data);
                setFilteredPrompts(data);
            } catch (error) {
                console.error('Error fetching prompts:', error);
                setError('Could not load prompts. Please try again later.');
            }
        };

        // Only fetch if no initial prompts are provided (optional refetching)
        if (!initialPrompts || initialPrompts.length === 0) {
          fetchPrompts();
        }
    }, [initialPrompts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer" />
      </form>

      <PromptCardList 
        data={filteredPrompts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed