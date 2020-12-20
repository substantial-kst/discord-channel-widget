import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useHistory,
} from "react-router-dom";
import { Channel } from "./Channel/Channel";

export interface Message {
  id: string;
  type: number;
  content: string;
  channel_id: string;
  author: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
  };
  attachments: any[];
  embeds: any[];
  mentions: any[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  timestamp: string;
  edited_timestamp?: any | null;
  flags: number;
  message_reference?: {
    channel_id: string;
    guild_id: string;
    message_id: string;
  };
  referenced_message?: Message;
}

const App: React.FC = () => {
  const [channelId, setChannelId] = useState<string>();
  const [channelName, setChannelName] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchChannel = async (channelId: string) => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_HOST}/channel?channel=${channelId}`,
          {
            method: "GET",
          }
        );
        const { name } = await result.json();
        console.log("Channel name: ", name);
        setChannelName(name);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchMessages = async (channelId: string) => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_HOST}/messages?channel=${channelId}`,
          {
            method: "GET",
          }
        );
        const msgs = await result.json();
        setMessages(msgs);
      } catch (e) {
        console.error(e);
      }
    };

    if (channelId) {
      fetchChannel(channelId);
      const interval = setInterval(() => fetchMessages(channelId), 1500);
      return () => clearInterval(interval);
    }
  }, [channelId]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {messages && channelName && (
              <>
                <Channel msgs={messages} channelName={channelName} />
              </>
            )}
            {!channelId && (
              <>
              <h2>Channel ID</h2>
              <input
                id="channel-input"
                autoFocus={true}
                type="password"
                onBlur={(event) => setChannelId(event.target.value)}
              />
              </>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
