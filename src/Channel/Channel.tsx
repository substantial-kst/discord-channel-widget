import React from "react";
import type { Message } from "../App";

const ChannelMessage: React.FC<{ username: string; content: string }> = ({
  username,
  content,
}) => <div>{`${username}: ${content}`}</div>;

export const Channel: React.FC<{ msgs: Message[]; channelName: string }> = ({
  msgs,
  channelName,
}) => (
  <>
    <h1 id={"watermark"}>{`#${channelName}`}</h1>
    {Array.isArray(msgs) &&
      msgs.map(({ content, author }, index) => (
        <ChannelMessage
          key={`message-${index}`}
          content={content}
          username={author.username}
        />
      ))}
  </>
);
