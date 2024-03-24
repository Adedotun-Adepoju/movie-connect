"use client";

import { cx } from "@/utils";
import { useState } from "react";
import CommunityCard from "./CommunityCard";

// Array of communities the user has joined with "lastActivity", "lastNotification", and "image" properties
const joinedCommunities = [
  {
    name: "Artists Network",
    category: "Art",
    members: 1200,
    lastActivity: "2024-03-20T08:30:00Z",
    lastNotification: "Harold posted a new photo",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Photography Enthusiasts",
    category: "Photography",
    members: 800,
    lastActivity: "2024-03-21T10:45:00Z",
    lastNotification: "",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Book Club",
    category: "Literature",
    members: 600,
    lastActivity: "2024-03-22T13:20:00Z",
    lastNotification: "",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Coding Wizards",
    category: "Technology",
    members: 500,
    lastActivity: "2024-03-23T09:50:00Z",
    lastNotification: "New coding challenge posted by Alex",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Film Buffs",
    category: "Movies",
    members: 900,
    lastActivity: "2024-03-24T11:55:00Z",
    lastNotification: "New movie recommendation from Michael",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Music Maniacs",
    category: "Music",
    members: 700,
    lastActivity: "2024-03-24T01:03:00Z",
    lastNotification: "",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Foodies Unite",
    category: "Food",
    members: 1100,
    lastActivity: "2024-03-26T10:15:00Z",
    lastNotification: "Recipe of the week: Chocolate lava cake by Chef Gordon",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Gaming Gang",
    category: "Gaming",
    members: 1000,
    lastActivity: "2024-03-27T12:20:00Z",
    lastNotification: "Gaming tournament registration is now open",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Fitness Fanatics",
    category: "Fitness",
    members: 1300,
    lastActivity: "2024-03-28T09:40:00Z",
    lastNotification: "New workout plan shared by Rebecca",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "DIY Enthusiasts",
    category: "Crafts",
    members: 400,
    lastActivity: "2024-03-29T13:10:00Z",
    lastNotification: "DIY home decor ideas by Jessica",
    image: "https://via.placeholder.com/150",
  },
];

// Array of communities the user hasn't joined with "lastActivity", "lastNotification", and "image" properties
const notJoinedCommunities = [
  {
    name: "Tech Geeks",
    category: "Technology",
    members: 2000,
    lastActivity: "2024-03-19T08:20:00Z",
    lastNotification: "New tech gadgets review by David",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Travel Lovers",
    category: "Travel",
    members: 1500,
    lastActivity: "2024-03-18T10:35:00Z",
    lastNotification: "Travel photography tips shared by Sarah",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "History Buffs",
    category: "History",
    members: 1800,
    lastActivity: "2024-03-17T13:00:00Z",
    lastNotification: "Discussion on ancient civilizations led by John",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Pet Lovers",
    category: "Pets",
    members: 1400,
    lastActivity: "2024-03-16T09:15:00Z",
    lastNotification: "Pet adoption event this weekend",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Fashionistas",
    category: "Fashion",
    members: 1700,
    lastActivity: "2024-03-15T11:45:00Z",
    lastNotification: "Fashion trends for spring 2024 revealed",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Language Learners",
    category: "Languages",
    members: 1600,
    lastActivity: "2024-03-14T13:30:00Z",
    lastNotification: "Language exchange meetup on Friday",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Environmentalists",
    category: "Environment",
    members: 1900,
    lastActivity: "2024-03-13T09:55:00Z",
    lastNotification: "Discussion on climate change solutions",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Entrepreneurs Network",
    category: "Business",
    members: 2200,
    lastActivity: "2024-03-12T12:10:00Z",
    lastNotification: "Startup funding seminar next week",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Yoga Practitioners",
    category: "Wellness",
    members: 2500,
    lastActivity: "2024-03-11T14:20:00Z",
    lastNotification: "Yoga retreat in the mountains",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Reading Circle",
    category: "Literature",
    members: 300,
    lastActivity: "2024-03-10T10:05:00Z",
    lastNotification: "Book recommendation: 'The Alchemist' by Paulo Coelho",
    image: "https://via.placeholder.com/150",
  },
];

const index = () => {
  const [activeTab, setActiveTab] = useState("myCommunities");
  const [movieRecord, setMovieRecords] = useState("movieRecords");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleJoin = (id: string) => {
    console.log(id);
  };

  return (
    <div className="">
      <div className="relative flex w-full gap-4 border-y border-ash pb-2 pt-6">
        <div
          className={cx(
            "cursor-pointer px-4",
            activeTab === "myCommunities" ? "active" : "",
          )}
          onClick={() => handleTabClick("myCommunities")}
        >
          My Communities
        </div>
        <div
          className={cx(
            "cursor-pointer px-4",
            activeTab === "discover" ? "active" : "",
          )}
          onClick={() => handleTabClick("discover")}
        >
          Discover
        </div>
      </div>
      <div className="tab-content w-full px-4 md:grid grid-cols-2 md:gap-6">
        {activeTab === "myCommunities" && (
          <>
            {/* Content for My Communities tab */}
            {joinedCommunities.map((community, index) => (
              <CommunityCard
                key={index}
                community={community}
                member={true}
                handleJoin={handleJoin}
              />
            ))}
          </>
        )}
        {activeTab === "discover" && (
          <>
            {/* Content for Discover tab */}
            {notJoinedCommunities.map((community, index) => (
              <CommunityCard
                key={index}
                community={community}
                member={false}
                handleJoin={handleJoin}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default index;
