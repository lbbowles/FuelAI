# FuelAI

## Content

While the concept of consuming nutritious food and staying a healthy weight is widely appealing, only a small percentage of the population actually does; this is due to three mitigating factors: the seemingly inexplicable amount of effort it takes to actually track one’s macros appropriately, consume them, and simultaneously still actually enjoy the food being eaten. FuelAI is the solution. 

 Our goal is to create an application accessible via the web on computers and mobile devices. For the application to resolve such a grand issue for as many people as physically possible, it has to be simultaneously intuitive and feature-rich. For example, it is imperative that we make the creation of meal plans an inexplicably easy but extremely accurate process that meets not only caloric and macronutrient needs, but accommodates dietary restrictions and preferred flavor palates as well. Moreover, we need to set up the aforementioned meal plans in such a way that they are visually appealing and easy to change if not feasible or desired that day for the user. Lastly, success, while mostly something internalized, is most easily accomplished within a community - due to this, we want to culminate one. We will facilitate this via the creation of a forum page where users can post advice, questions, goals, recipes, etc. In synopsis, our goal is simply stated: make people healthy in an effective way, keep them thriving, and encourages them to come back or recommend it to others. 
 
  Achieving this goal may seem outwardly ostentatious, but it is actually extremely feasible. To manage the goals, dietary restrictions, and preferences of the user, we will utilize our database, which will use PostgreSQL. This aforementioned database will also include all of our recipes—both implemented by the staff and other users along with their nutrition information; from that point, we just create algorithms and functions to gather recipes that fit user specifications and display them back to the applicable user in an easy-to-follow and appealing calendar format.  The user would have the ability to revise or completely alter their plan with utilization of our LLM’s we plan on integrating, which ultimately puts the power the of plan in the users hands, realistically making success more feasible. From a programming perspective, we will utilize Laravel and react for the web application, Swift for mobile application development, and we actually plan on utilizing a multitude of LLMs so that if the user does not appreciate the feedback, recipes, or restructuring of their plan by the LLM, they can simply change it to another for something that works better for them.  
  
 In conclusion, health doesn’t have to be hard; follow FuelAI and stick to your diet, and you’re destined to reach your goals.

## Work Load for 2nd Check-In:

### Arsal: 

fuelai/app/Http/Controllers/ForumController.php
fuelai/app/Http/Controllers/TaskController.php
fuelai/resources/js/pages/* (all but dashboard and auth folder)
fuelai/resources/views/app.blade.php
fuelai/routes/web.php

### Yahir:

fuelai/app/Models/User.php
fuelai/app/Http/Controllers/Api/V1/AuthController.php
fuelai/app/Http/Controllers/Api/V1/SettingsController.php
fuelai/app/Http/Controllers/Api/V1/ForumThreadController.php
fuelai/app/Http/Controllers/Api/V1/MealPlanController.php
fuelai/app/Http/Resources/* (UserResource, ForumThreadResource, ForumPostResource)
fuelai/database/factories/UserFactory.php
fuelai/database/factories/ForumFactory.php
fuelai/database/seeders/DatabaseSeeder.php
fuelai/routes/api.php
fuelai/routes/web.php

### Logan
Updates to the following files completely by me: 
-calendar.tsx, _layout.tsx (app and root layer), index.tsx, food/[date].tsx, images.ts, .env, config.plist, services/appwrite.ts, part of signin.jsx

Other updates: 
-Integration with the backend service Appwrite including creation of 'organization', adding table and authentication.
It also created hundreds of new files within the starter-for-ios directory--therefore, I did not do ANYTHING in those ones besides config.plist which I had to update.
For the other files (which includes signin.jsx, AuthContext.js, App.tsx), I followed documentation and videos posted by AppWrite so not directly my programming--albeit I made slight alterations to signin.jsx to be more tailored to my style.

### Steven
09/09/25

modelApi/*

My responsibility is the image recognition model for food.

app.py:
    The application that will run and provide api services.
        endpoints:
            get(/heath): status of server , what device is being used for computation(mac cpu,gpu,or cpu), model being used.
            put(/predict food): params(int top_k,file file)  will take image file and run it through the model and returns a list of size top_k of the highest confidence score

render.yaml/deploy.sh: scripts that will be used to actually deploy my application. yaml file most likely to be scrapped due to hardware limitations on render. looking into azure and other services to deploy currently using uvicorn to run locally.

Dockerfile: might use instead of deploying from GH repo

req.txt: Dependencies to be installed

09/30/25

image_rec.tsx
working on further training pretrained model using hugging face lib
figuring out how to deploy the first version of the application to azure or anyother web service
