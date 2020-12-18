import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Channel } from "./Channel/Channel";
// import crypto from 'crypto';
// const DiscordOauth2 = require("discord-oauth2");
// const oauth = new DiscordOauth2({
//     clientId: `${process.env.REACT_APP_CLIENT_ID}`,
//     clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
//     redirectUri: "http://localhost:3000/redirect",
// });
// const url = oauth.generateAuthUrl({
//     scope: ["identify", "messages.read"],
//     state: crypto.randomBytes(16).toString("hex"), // Be aware that randomBytes is sync if no callback is provided
// });
// console.log('Url: ', url);
// const params: any = {};
export interface Message {
  id: string;
  type: number;
  content: string;
  channel_id: string;
  author: {
    id: string;
    username: string;
    avatar?: string | null;
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

let messages: Message[] = [];
// const Redirect: React.FC = () => {
//     const { search } = useLocation();
//     const queryString = search.substring(1).split('&');
//     queryString.forEach(str => {
//         const param: string[] = str.split('=');
//         params[param[0]] = param[1];
//     })
//     console.log('Params: ', params);
//     try {
//         oauth.tokenRequest({
//             code: params.code,
//             scope: "identify messages.read",
//             grantType: "authorization_code",
//             redirectUri: "http://localhost:3000/redirect",
//         }).then(console.log)
//     } catch (e) {
//         console.error(e);
//     }
//
//     return <div>Redirected!</div>;
// }

const getMessages = async () => {
  try {
    const result = await fetch(
      `https://discord.com/api/v7/channels/${process.env.REACT_APP_CHANNEL_ID}/messages`,
      {
        headers: {
          authorization: `Bot ${process.env.REACT_APP_BOT_TOKEN}`,
        },
        method: "GET",
        mode: "no-cors",
      }
    );
    console.log("Result: ", result);
    return result.json();
  } catch (e) {
    console.error(e);
  }
};

getMessages().then((results) => {
  messages = results || [];
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Channel msgs={messages} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
