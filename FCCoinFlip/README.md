To host a website, you should build your project.

```
npm run build
```

and modify firebase.json file like the following.

```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

this file is created by firebase CLI.

Here are steps of firebase.

run firebase-tools-instant-win.exe

references are

https://firebase.google.com/docs/hosting/full-config

https://console.firebase.google.com/

https://firebase.google.com/docs/hosting/?authuser=0#how_does_it_work

```
> e:
> cd <project directory>
> firebase login
> firebase projects:list
> firebase init
> firebase deploy
```

