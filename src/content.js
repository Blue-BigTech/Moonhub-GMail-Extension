import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, "sdk_moonhub-inbox_d80d2bf259").then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "Moonhub",
      iconUrl: chrome.runtime.getURL('images/icon.png'),
      onClick(event) {
        let threadID = composeView.getThreadID();
        if(threadID == ''){
          console.log('This is new email. Not reply!');
        }else{
          fetch(`https://email-generation-backend-dev-ggwnhuypbq-uc.a.run.app/ai-emails/${threadID}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
          })
          .then(res => res.json())
          .then(json => {
            console.log(json.ai_emails)
          });  
          // axios.get(`https://api.chucknorris.io/jokes/random`).then(res => {console.log(res.data);});
          // axios.get(`https://email-generation-backend-dev-ggwnhuypbq-uc.a.run.app/thread-emails/${threadID}`, {
          //     headers : {
          //     'Content-Type' : 'application/json'
          //   }
          // })
          // .then(res => {
          //   if (res.status === 200) {
          //     email_contents = res.data.emails[0];
          //     console.log(email_contents);
          //     email_contents = '<pre style="white-space : pre-wrap">' + email_contents + '</pre>';
          //     composeView.setBodyHTML(email_contents);   
          //   } else {
          //     console.log(res.error);
          //   }
          // });
        }
      },
    });
  });
});
