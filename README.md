# Welcome to SlackX!

### **Live Link: [SlackX](https://theslackx.herokuapp.com/)**

_SlackX_, a pixel perfect [Slack](https://slack.com/) clone, is a single page communication platform that allows users to share messages in public and private channels.

### Home and About View
![Home and Search View](react-app/public/home_about.gif)

### Channels View
![Channels View](react-app/public/channels.gif)

## Prerequisites

Before you begin, please check the following Wiki documents:
* [Feature List](https://github.com/rsdimatulac/SlackX/wiki/Feature-List)
* [Database Schema](https://github.com/rsdimatulac/SlackX/wiki/Database-Schema)
* [API Routes](https://github.com/rsdimatulac/SlackX/wiki/API-Routes)
* [Frontend Routes](https://github.com/rsdimatulac/SlackX/wiki/Frontend-Routes)
* [User Stories](https://github.com/rsdimatulac/SlackX/wiki/User-Stories)

## Technologies used:
#### Backend
* Python
* Flask
* SQLAlchemy
* PostgreSQL
* Docker
* `socket.io` for live chat
* `wtforms`, `wtforms validators`
* `faker` for seed data

#### Frontend
* React.js
* Redux
* JavaScript
* HTML, Vanilla CSS
* Heroku (for hosting services)
* AWS (photo bucket)
* `react-icons`, `date-fns`

### Code Highlights / Challenges

#### Highlights 

* Websocket on the frontend: The `useEffect()` enables a new `chat` socket to be opened. We used the channel's id as an identifier for when we interact with the backend of the `chat` socket. When the channel is changed, the `chat` socket is closed, and then reopens with the next channel's id. Upon submission of a new message, we emit the message to the backend socket and sends the data to create and store the message into the database.

`react-app/src/components/ChannelsPage/Chatbox/Chatbox.js`
```js
useEffect(() => {
    socket = io();
    socket.on(channelId, (chat) => {
        setMessages(messages => [...messages, chat]);
    })
    return (() => socket.disconnect());
}, [channelId]);

const sendChat = (e) => {
    e.preventDefault()
    if (chatInput.length > 0) {
        socket.emit("chat", { user_id: user?.id, body: chatInput, channel_id: channelId, created_at: new Date().toGMTString(), updated_at: new Date().toGMTString() });
    };
    setChatInput("");
};
```
* Websocket on the backend: There's one socket that receives all `chat` events. After adding the emitted message to the database, we `emit` back to the frontend with additional data such as `channel_id`. That `channel_id` will be used to determine which frontend channel's `chat` socket we should broadcast the new message to. The data sent from the backend will now be received as the variable `chat` in the `useEffect()`.

`app/socketIO.py`
```js
@socketio.on("chat")
def handle_chat(data):
    new_message = Message(
        user_id=data['user_id'],
        channel_id=data['channel_id'],
        body=data['body'],
        created_at=data['created_at'],
        updated_at=data['updated_at']
    )

    db.session.add(new_message)
    db.session.commit()
    messages = Message.query.filter(Message.user_id == data['user_id'], Message.body == data['body']).all()
    ourMsg = messages[len(messages) - 1]
    data['id'] = ourMsg.id
    emit(data["channel_id"], data, broadcast=True)
```

* These functions return an updated array of selected users that the user wants to send direct messages to. It features `.some()`, `.map()`, and `.filter()` to check if the selected user is already added on the array, to return an array of selected users, and to filter and return the remaining users when one is removed.

`react-app/src/components/ChannelsPage/ChannelModal/DmModal.js`
```js
const handleAddDM = (e) => {
    const userId = Number(e.target.className[0]);
    
    if (usersToDM.some((user) => user['id'] === userId)) return;

    const user = users.find(user => user['id'] === userId);
    const usersToDMDup = usersToDM.map(user => user);
    usersToDMDup.push(user);
    setUsersToDM(usersToDMDup);
    setDMSearchInput("");
}

const removeUserToDM = (e) => {
    const userId = Number(e.target.className);
    const usersToDMDup = usersToDM.filter(user => user.id !== userId);
    setUsersToDM(usersToDMDup);
}
```

* This `for...in` loop allows our application to dynamically seed new channels and append that channel to the user's subscriptions.

`app/api/seeds/subs.py`   
```python
for sub in subs:
    for user in sub['users']:
        user.channels.append(sub['channel'])
        db.session.commit() 
```

* When a user activates the search bar, the search bar will turn into an input search box. Based on the search input value, the `handleChannelSearch()` function is invoked when an `onChange()` event occurs. It uses `.filter()` to iterate through the channels and dynamically displays what matches the search input value. When a user clicks on the result, they will be redirected to the channel or direct message chatbox.

`react-app/src/components/ChannelsPage/Header.js`
```js
const handleChannelSearch = (e) => {
    if (e.target.value.length > 0) {
        let filteredResults = userChannels.filter(channel => {
            if (channel.channel_type === "dm") {
                let usernames = Object.values(channel.users).map(u => u.name.toLowerCase());
                usernames = usernames.filter(name => name !== `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`);

                for (let username of usernames) {
                    if (username.includes(e.target.value.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            } else {
                return channel['name']?.toLowerCase().includes(e.target.value.toLowerCase())
            }
        });
        setChannelSearchInput(e.target.value);
        setChannels(filteredResults);
    }
}
```

#### Challenges
* One of the team's biggest challenges was implementing `socket.io` in our application for the Live Chat feature. Having zero knowledge of the concept motivated us to find useful documentation and use resources at our disposal. After researching and seeking guidance from our advisors, we succesfully implemented a websocket that listens to a `chat` event which then broadcasts the messages to the channel it was sent to. This resulted to a fully functioning Live Chat which is the main feature of SlackX.

* Populating the subscriptions table with seed data was an initial challenge. After parsing through the documentation, we determined that the model relationships would work in tandem with `append()` to populate the subscriptions table with seed data. After generating the User and Channel tables data, the solution was as simple as implementing a nested `for...in loop` to populate the aforementioned subscriptions table seed data. Refer to the code snippet above.

## Future Implementations 
- Notifications
- Starred channels
- Users can edit their profile.
- Search functionality by users, messages, and channels
- User feature where they can mention and react to a message.

## SlackX Developers
- [@nathanieldcooke](https://github.com/nathanieldcooke) 🌭
- [@earlwoo](https://github.com/earlwoo) 👨‍💻
- [@rsdimatulac](https://github.com/rsdimatulac) 🚁
- [@vivianchen](https://github.com/QCHEN0407) 📹

---
_© 2021 SlackX. No rights reserved._