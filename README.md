[logo]: https://github.com/plieb/dreamhouse-bot-messenger/blob/master/assets/SF_RE.png "Salesforce + Recast.AI"
![alt text][logo]

This bot is part of the #[OBAW](https://github.com/plieb/OBAW) project - Week 0x0005 - Salesforce

# Salesforce Bot for Facebook Messenger using Recast.AI

A [Salesforce](https://www.salesforce.com)-powered bot for the [DreamHouse sample application](https://developer.salesforce.com/dreamhouse/) using [Recast.AI](https://recast.ai) NLP and [Bot Connector](https://botconnector.recast.ai)

Follow the instructions below to create your own instance of the bot:

## Step 1: Install the DreamHouse App

If you haven't already done so, follow [these instructions](http://dreamhouse-site.herokuapp.com/installation/) to install the DreamHouse sample application.

## Step 2: Create a Connected App

If you haven't already done so, follow the steps below to create a Salesforce connected app:

1. In Salesforce Setup, type **Apps** in the quick find box, and click the **Apps** link

1. In the **Connected Apps** section, click **New**, and define the Connected App as follows:

    - Connected App Name: MyConnectedApp (or any name you want)
    - API Name: MyConnectedApp
    - Contact Email: enter your email address
    - Enabled OAuth Settings: Checked
    - Callback URL: http://localhost:8200/oauthcallback.html (You'll change this later to **your Heroku URL** at step 3)
    - Selected OAuth Scopes: Full Access (full)
    - Click **Save**

## Step 3: Deploy the Messenger Bot

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com/)
1. Click the button below to deploy the Messenger bot on Heroku:

    [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

1. Fill in the config variables as described.

    - For **SF_CLIENT_ID**, enter the Consumer Key of your Salesforce Connected App
    - For **SF_CLIENT_SECRET**, enter the Consumer Secret of your Salesforce Connected App
    - For **SF_USER_NAME**, enter the the username of your Salesforce integration user
    - For **SF_PASSWORD**, enter the the password + your secret token of your Salesforce integration user
    - For **BC_USER_SLUG** blank for now (filled at step 4)
    - For **BC_BOT_ID** blank for now (filled at step 4)
    - For **BC_USER_TOKEN** blank for now (filled at step 4)
    - For **RE_BOT_TOKEN** blank for now (filled at step 5)
    
1. Time to replace the callback URL from your Salesforce app to your **Heroku URL** 


## Step 4: Create your bot on Bot Connector

1. Make sure you are logged in to your [Bot Connector account](https://botconnector.recast.ai/)
1. Click the button **New Bot** and define the bot as follows
 
    - Bot Name: Salesforce Bot
    - Bot URL: enter your Heroku URL
    
1. In **Settings** find your `slug`, `token` and `bot ID`. Copy paste those values in the **Config Variables** section of your Heroku app to `BC_USER_SLUG`, `BC_USER_TOKEN` and `BC_BOT_ID`
1. Get back to your Bot Connector account and add a Messenger channel. Give it a name and follow step 1 to 4 in order to get your **Secret Key** & **Page Token**

## Step 5: Get your Recast bot

1. Make sure you are logged in to your [Recast.AI account](https://recast.ai/)
1. Follow this link [Salesforce DreamHouse bot](https://recast.ai/pe/salesforce-dreamhouse/learn) and fork the bot to your account
1. Copy paste your `bot request access token` in the **Config Variables** section of your Heroku app to `RE_BOT_TOKEN`
1. You're all set !

## Next steps ideas :

1. Implement `createLead` in salesforce.js when client select a house
1. Enrich the bot to understand more small talk intents
1. Implement `prediction.io` for recommendations


## Author

PE Lieb [@pedward_lieb](https://twitter.com/pedward_lieb)

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## Special thanks

For providing support and resources :
- Gauthier Ginistry [@gginisty](https://twitter.com/gginisty)
- Hervé Mischler [@Dstroii](https://twitter.com/Dstroii)
