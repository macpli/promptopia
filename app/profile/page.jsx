'use client';

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const fetchPosts = async () => {
          if (session?.user.id) {
              try {
                  const response = await fetch(`/api/users/${session.user.id}/posts`);
                  if (!response.ok) {
                      throw new Error(`Failed to fetch prompts: ${response.statusText}`);
                  }
                  const data = await response.json();
                  setPosts(data);
              } catch (error) {
                  console.error("Error fetching posts:", error);
              }
          }
      };

      // Only fetch posts if the session is not loading
        if (status === "authenticated") {
          fetchPosts();
         }
  }, [session, status]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
       const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

       if(hasConfirmed) {
           try {
              await fetch(`/api/prompt/${post._id}`, {
                  method: 'DELETE',
              });

              const filteredPosts = posts.filter((p) => p._id !== post._id);
              setPosts(filteredPosts);
           } catch (error) {
               console.log(error);
            
           }
       }
    }

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data = {posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile