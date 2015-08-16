console.log("Lumberbot loaded");
//LAST UPDATED: 16th August 2015, 22:39 BST
var commandList = ["!tweet","!twitter","!yt","!caps","!adv","!spam","!eng","!thwack","!quote","!bsg","!beamraid","!twitchraid","!ytraid","!hype","!ip","!shoutout","!whyyt"];
var messages = [
  "Tweet out the stream, tell your friends! <3",
  "Follow @Brhysh on twitter to know when our beloved lumberjack goes live!",
  "If you like what your seeing, leave a like, and if you really love it, then make sure to subscribe! B uploads everyday!",
  "Hey! Easy on the caps! I will time your butt out, ",
  "Please don't advertise here, especially without permission. You have been timed out, do it again and you will be banned, ",
  "Please don't spam the chat. You have been timed out.",
  "English only please! Don't do it again or you will be timed out!",
  "Bai bai troll! THWACK! (>^.^)> --{}",
  "Placeholder",
  "Hey! No back seat gaming! I WILL turn this car around!",
  "We're hopping over to Beam to raid our good friend ...! Go! Go! Go! beam .pro/...",
  "We're going to Twitch to raid the awesome ...! Go naow! DO EET! twitch .tv/...",
  "Time for a YT raid! We're raiding our good friend ...! Go Show them the luffs! youtube.com/c/.../live",
  "Hype hype hype! The hype is real! ALL teh hype! \\o/ \\o/ \\o/ :D :D :D",
  "B is most likely on Hypixel, as per usual! Check it out at mc.hypixel.net!",
  "B doesn't do shoutouts. Please don't ask for them.",
  "B prefers to stream to YouTube over Beam or Twitch. He likes to have all his viewers (fangirls :3) in one place."
]
var quotes = [
  "\"I need to pay in beans. Or kidneys.\" - Brhysh, about currency",
  "\"Hmm, I don't think he's AFK. He's killing people! If he is, though, that's a powerful AFK.\" -Brhysh, about Hypixel chat message",  
  "\"You don\'t believe in logs?! What kinda lumberjack are ya? :P\" -Dminer 2014",
  "\"Brhysh doesn't break the rules first! He's at least the second person to do it.\" -Brhysh, GodivaGaming Holiday UHC",
  "\"Cheese is a noble race\" -Ziyi01 2014",
  "\"Michael! Stop playing games with my heart!\" - Brhysh",
  "\"That's gotta hurt! A fishbowl to the face!\" -B, The Movies",
  "\"I'm a smart guy...sometimes\" - Brhysh",
  "\"Who danced my taco?\" - B, follower",
  "\"Oohhhh! Ohhhhhhhh! This looks WONDERFUL! ... It needs a waterfall.\" -B, pranking Kitt",
  "\"I enjoy being a chicken\" - Crystal",
  "\"The dessert is all mine now!\" - Brhysh talking about deserts",
  "\"2Cubed works so hard on the drunkbot\" - Brhysh",
  "\"I hope you've made yourself happy. You've destroyed a Canadian's heart.\" -B to Rage_Dude - WUT!?! D:",
  "\"This is all I've known for my whole life! My whole life is a milk bag!\" -Brhysh, 2015",
  "\"When NASA sends space missions to mars, do you think they'll send JUGS of milk? No. Bags of milk. You heard it here first!\" -Brhysh, 2015",
  "\"Aww, Rage_Dude! You make me feel so nice! It makes up for when you killed me with those cave spiders!\" -B to Rage, about B being his favorite streamer :)",
  "\"Sorry, I'm a Canadian. Can't be a creep. Not allowed. Would be deported.\" -Brhysh, about... creeps",
  "\"Get rekt, sunshine.\" - B, to the setting sun",
  "\"No, I threw a bucket of lava INTO the lava!\" *throws another one* - B, SMB",
  "\"You're not a blacksmith if you cheat through the Nether!\" -B, SMB",
  "\"You're such a canucklehead\" -Graph to B, because Nether Smelter",
  "\"Borking the sun, 1 piece of glass at a time\" -Aztheus, 2015",
  "\"The sun's not even round! It's a giant ball of gas! Lookit, it's a square!\" -B, about... OCD?",
  "\"All the girls want my trunk\" -B talking about organ donations",
  "\"Let's do it! Let's blow those cave spiders right outta Minecraft!\" -B, about squids Kappa",
  "\"Listen here, I'm lazy! I'm too lazy to go to a grinding farm!\" -B... self explanatory :P",
  "\"its not that great\" -Mrs. Brhysh regarding B's Trunk",
  "\"Until something happens like- SHE DROPS HER PHONE! :D\" \"That wasn't my phone.\" \"Oh. :/\" -B and Ms. B, IRL",
  "\"can I have a kiss Ms. B?\", \"Eww No\" -B trying to get a kiss from Ms. B",
  "\"B now has cuties\" -I_lofty :P",
  "\"Don't put it in your mouth\" - B on strange things",
  "\"Last time on B's stream... Drunk stories, bar crawls and life lessons... 'Dont put it in your mouth'\" -Mechanicalmartian 2015",
  "\"We  have nothing here in Toronto. We have no snow. You stinkin' Americans, stealing our snow!\" -B, Snow blues. ",
  "\"No. No. You can't. You don't. No love from racoons!\" -B, to... Racoon. :P",
  "\"I have freedom! I have right! I have the freedom not to have peanut butter!\" -B, donations",
  "\"This is a beautiful milk bag\" - Brhysh",
  "\"Amber...You don't want none of this.\" - B, Skywars threats",
  "\"If you throw my flag away, I'm reporting you to the government\" - B, to Mrs B, on throwing his Canadian Flag away",
  "\"Wife might kill me\" - B, on streaming.",
  "\"He was like the uncle I never had\" - B, on Mario.",
  "\"You can suck my banhammer, you dirty little potato man\"-B, on a troll",
  "\"You guys are making my sunday..make me a sunday!\" - Brhys, on discovering the locations of chat.",
  "\"I promise, if I'm 98, I'll stream.\" - B, making promises."
]




var inputBox = document.getElementById("live-comments-input-field");
inputBox.addEventListener("keydown", function(e){
    if(commandList.indexOf(inputBox.innerText) !== -1) {
      if(inputBox.innerText == "!quote") {
        inputBox.innerText = "Quote: " + quotes[Math.floor(Math.random()*quotes.length)];
      } else {
        inputBox.innerText = messages[commandList.indexOf(inputBox.innerText)];
      }
    } else {
      console.log("No such command found");
    }
  });
