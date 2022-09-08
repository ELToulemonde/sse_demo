- 📅 Date: 13/09/2022
- 👷 Decision taken by: CoP Software

# Context

<--What is the context of your decision. Example: previous linked ADR, problem the team want to tackle, ...-->

# Considered options 💡

## SSE or Webhook
1. Webhooks: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 
2. Server Sent Event: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 

## Types of events
1. Refresh events: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 
2. Events with data: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 

## Event queue ?
1. Option 1: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 
2. Option 2: 
    - **More details:** 
    - ✅ **Advantage:** 
    - 🚫 **Disadvantage:** 


# Advices 
SSE is useful when you have event less frequent than user needs. 
If events are every 1s and users only need refresh every 10s, just do regular request every 10s.

If events are less frequent than 10s, it will save you a lot of Get requests.

<--Any advices worth mentioning-->

# Decision 🏆
<--Which decision have been taken and what was the decider-->

# Consequences 
<-- Consequences of your decision -->
♻️ Update: <date>. 
