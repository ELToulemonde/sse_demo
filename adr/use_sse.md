# Context

When an event happen in backend, we would like to refresh the data for every connected users.

We want this refresh to happen as quickly as possible. 
Le plus rapidement possible
J'ai un back et un front


# Considered options 💡

## SSE or Websocket
1. Wait for user to refresh their page
    - **More details:** Eventually users will refresh their page and have updated data 
    - ✅ **Advantage:** It doesn't require any code
    - 🚫 **Disadvantage:** Refresh will be too slow
2. Polling 
    - **More details:** Refresh data every X seconds through a `get` request. X can be defined by user. Ex: I want my data refreshed every 10s, and not more often.  
    - ✅ **Advantage:** 
      - If events are more frequent than our refresh rate, it will do the trick.
      - It is the same API calls than what we already have implemented. It is simple
    - 🚫 **Disadvantage:**
      - It might cause a lot of useless `get` request. For exemple if events are every hour, and we `get` every 10s, this will cause 360 -1 useless `get` 
      - For each `get` the connection have to be established, it can take a bit of time
      - To test the code, timer will have to be mocked.
3. Websocket: 
    - **More details:** 
    - ✅ **Advantage:** 
      - It is a market standard
      - It is validated by the W3C (Web 3 consortium)
    - 🚫 **Disadvantage:** 
      - It works in both ways (back to front and front to back), it is overkill in our case
      - It is a different protocol than our `get` it can be blocked
4. Server Sent Event: 
    - **More details:** 
    - ✅ **Advantage:**
      - It works in one way: back to front
      - Connection is established only once
      - It is nice when a quick refresh of an irregular event is expected
      - It looks like event queue implementations (with a different protocol)
    - 🚫 **Disadvantage:** 
      - Not used a lot
5. Event-queue
    - **More details:** Plug the front directly on a queue, often rely on websockets.
    - Example: MQTT, Kafka
    - ✅ **Advantage:**
      - All the frontend to connect directly to the event-queue service
    - 🚫 **Disadvantage:**

[This question on stackoverflow is a good source of inspiration](https://stackoverflow.com/questions/5195452/websockets-vs-server-sent-events-eventsource)

## Types of events
1. Pattern publish/subscribe
    - **More details:** Getting a refresh event, the frontend will send a `get` request to get new data  
    - ✅ **Advantage:** 
      - One can filter on event types before passing data in the network
      - With pagination, it is easier
      - Minimize code duplication, SSE code will be very light
      - One can `get` only when ready. For exemple when user is doing a modification wait. Example: confluence when publishing a new version of page, other users get a refresh notification
    - 🚫 **Disadvantage:**
      - 2 data paquets go through the network
      - If data and events are not in the same place, data might not be available yet when doing the `get`
2. Events with data
    - **More details:** The event would contain data. 
    - ✅ **Advantage:** 
      - 
    - 🚫 **Disadvantage:**
      - Choosing which data to send is not always straight forward
      - Send some useless data in the network
      - Pagination is harder to set in place

   
## Event queue ?

It will depend on where the event come from: another application or a user action. 
1. Kafka: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 
2. Full managé azure: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 
3. Cosmos or datalake gen2 allow to publish writing events
   - **More details:** User do a modification, send it to backend via `post` or `put`, backend write it in the datalake,
   datalake publish a write event, SSE listen to datalake and send it to all users.
4. Event table in database
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:**

# Advices 
- Think of closing connections, stopping polling
- Async API pour créer des API événementielles => système bi-directionnel
- SSE is interesting when data comes from outside your application if and only if your architecture is completely event based
[see Kapa architecture](https://www.kai-waehner.de/blog/2021/09/23/real-time-kappa-architecture-mainstream-replacing-batch-lambda/)
SSE Require http2
- PS http1 limit to 6-8 request by domain en même temps


# Decision 🏆
- SSE 
- Refresh events