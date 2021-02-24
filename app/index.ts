import document from "document";

let text = document.getElementById("text") as TextElement;
let shadow = document.getElementById("shadow") as TextElement;
let highlight = document.getElementById("highlight") as TextElement;
let main = document.getElementById("main") as TextElement;
let textShadow = document.getElementById("textShadow");



text.text = "shadow-text";
text.style.fontFamily = "Barlow-Bold";
text.style.fontSize = 45;
text.textAnchor = "middle"  ?? "start";
text.letterSpacing = 0 ?? 0;

let fs: number;
fs = 70;

let a: number;
a= 168;

main.x = a;
highlight.x = a - 1;
shadow.x = main.x + 1;

let b: number;

b = 168;

main.y = b;
highlight.y = b - 1;
shadow.y = b + 1;

document.getElementsByClassName("myText").forEach(e => {
  (e as TextElement).text = text.text;
  (e as TextElement).style.fontFamily = text.style.fontFamily;
  (e as TextElement).style.fontSize = text.style.fontSize;
  (e as TextElement).textAnchor = text.textAnchor;
  (e as TextElement).letterSpacing = text.letterSpacing;
  

  
});

/*
import { me as appbit } from "appbit";
import { minuteHistory, dayHistory, today } from 'user-activity'

const steps = today.adjusted.steps
const now = new Date()
console.log(now.getMinutes())
const minuteRecords = minuteHistory.query({ limit: now.getMinutes() })
console.log(JSON.stringify(minuteRecords))
const hourlySteps = minuteRecords.reduce((a, b) => a + (b.steps || 0), 0);
console.log(hourlySteps);

if (appbit.permissions.granted("access_activity")) {
  // query the previous 5 minutes step data
  const minuteRecords = minuteHistory.query({ limit: now.getMinutes() });

  minuteRecords.forEach((minute, index) => {
    console.log(`${minute.steps || 0} steps. ${index + 1} minute(s) ago.`);
  });

  // query all days history step data
  const dayRecords = dayHistory.query();

  dayRecords.forEach((day, index) => {
    console.log(`${day.steps || 0} steps. ${index + 1} day(s) ago.`);
  });
}
*/