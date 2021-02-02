---
title: A brief history of deployment
date: 2021-02-02
permalink: false
---

- On-premises
- Infrastructure-as-a-service ("cloud")
- Platform-as-a-service
- Software-as-a-service

Let's take authentication as an example. If you control the entire server and database then this is difficult, but not complex. You have to write a bunch of logic to receive user passwords, hash them, store them in the DB etc, but it's all quite straight forward. You are working with code and standards-based technologies.

If you're building with serverless functions and 3rd party database providers then it gets a lot more complex. You might not have to write much code, but wrangling all the moving parts will take time. It's likely you'll end up with a 3rd party auth provider like Auth0, then reliant on an integration with whichever other 3rd party your database is hosted with (i.e. Fauna).
