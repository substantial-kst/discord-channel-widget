import React from "react";
import type { Message } from "../App";

const ChannelMessage: React.FC<{ username: string; content: string }> = ({
  username,
  content,
}) => <div>{`${username}: ${content}`}</div>;

export const Channel: React.FC<{ msgs: Message[] }> = ({ msgs }) => (
  <>
    {msgs.map(({ content, author }) => (
      <ChannelMessage content={content} username={author.username} />
    ))}
  </>
);
