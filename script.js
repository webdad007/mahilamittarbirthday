
/* ---------- Personal Message ---------- */
const SETTINGS = {
  name: "Gossip Partner",
  messages: [
    "Happy birthday partner! 🎉",
    "May Allah bless you a long life full of happiness 🤲",
    "And you keep sharing all the gossips with me 😄",
    "Best of luck for your future bro 🤜🤛"
  ]
};

// Put name in headline
document.getElementById("name").textContent = SETTINGS.name;

/* ---------- Typewriter (revealed on click) ---------- */
async function typeText(lines, speed=45, pause=700){
  const el = document.getElementById("typewriter");
  el.textContent = "";
  for (const line of lines){
    for (const ch of line){
      el.textContent += ch;
      await new Promise(r => setTimeout(r, speed));
    }
    el.textContent += "\n";
    await new Promise(r => setTimeout(r, pause));
  }
}

/* ---------- Reveal flow ---------- */
const gate = document.getElementById("gate");
const revealBtn = document.getElementById("revealBtn");
const content = document.getElementById("content");

revealBtn.addEventListener("click", () => {
  // Hide gate
  gate.classList.add("hide");
  setTimeout(() => gate.style.display = "none", 450);

  // Show content and start typing
  content.hidden = false;
  typeText(SETTINGS.messages);
});

/* ---------- Background Hearts (Canvas) ---------- */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize(); addEventListener("resize", resize);

class Heart {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20 + Math.random()*150;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = - (0.7 + Math.random()*1.1);
    this.size = 6 + Math.random() * 14;
    this.alpha = 0.3 + Math.random()*0.7;
    this.rot = Math.random()*Math.PI;
    this.hue = 340 + Math.random()*20;
  }
  update(dt){
    this.x += this.vx * dt * 0.06;
    this.y += this.vy * dt * 0.06;
    this.rot += 0.6 * dt/1000;
    this.alpha *= 0.998;
  }
  draw(ctx){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    const s = this.size;
    ctx.beginPath();
    ctx.moveTo(0, -s*0.25);
    ctx.bezierCurveTo(s*0.5, -s*0.9, s*1.2, -s*0.05, 0, s);
    ctx.bezierCurveTo(-s*1.2, -s*0.05, -s*0.5, -s*0.9, 0, -s*0.25);
    ctx.closePath();
    ctx.fillStyle = `hsla(${this.hue} 85% 65% / ${this.alpha})`;
    ctx.fill();
    ctx.restore();
  }
}

const hearts = [];
let last = performance.now();
function loop(now){
  const dt = Math.min(50, now - last);
  last = now;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if (hearts.length < 120) for (let i=0;i<2;i++) hearts.push(new Heart());

  for (let i=hearts.length-1; i>=0; i--){
    const h = hearts[i];
    h.update(dt);
    h.draw(ctx);
    if (h.y < -40 || h.alpha < 0.02) hearts.splice(i,1);
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ---------- Celebrate: burst more hearts ---------- */
document.getElementById("confettiBtn").addEventListener("click", ()=>{
  for (let i=0; i<150; i++) hearts.push(new Heart());
});
