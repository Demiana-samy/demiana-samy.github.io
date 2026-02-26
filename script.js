// particle background using canvas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
const colors = ['#4fc3f7','#ffffff','#888888'];

function initCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', initCanvas);

class Particle {
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.size = Math.random()*3+1;
        this.speedX = Math.random()*1-0.5;
        this.speedY = Math.random()*1-0.5;
        this.color = colors[Math.floor(Math.random()*colors.length)];
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x<0||this.x>canvas.width) this.speedX *= -1;
        if(this.y<0||this.y>canvas.height) this.speedY *= -1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function handleParticles(){
    if(particlesArray.length < 100) {
        particlesArray.push(new Particle());
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
}

function animateParticles(){
    handleParticles();
    requestAnimationFrame(animateParticles);
}

canvas.addEventListener('mousemove', function(e){
    particlesArray.forEach(p=>{
        const dx = p.x - e.x;
        const dy = p.y - e.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 100){
            const angle = Math.atan2(dy,dx);
            p.speedX += Math.cos(angle);
            p.speedY += Math.sin(angle);
        }
    });
});

// init
initCanvas();
animateParticles();

// scroll reveal animation: elements will fade up when entering viewport
const reveals = document.querySelectorAll('.section, .card, .project-card, .skill, .experience-list li, .achievements-list li');

function reveal(){
    reveals.forEach(el=>{
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150; // trigger point
        if(revealTop < windowHeight - revealPoint){
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal();

// scroll to top button logic
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 500) scrollBtn.style.display='block';
    else scrollBtn.style.display='none';
});
scrollBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0,behavior:'smooth'});
});

// skills progress bars: animate width on load
const progressBars = document.querySelectorAll('.progress-bar');
function animateProgress(){
    progressBars.forEach(bar=>{
        const percent = bar.dataset.percentage;
        bar.style.width = percent + '%';
    });
}
window.addEventListener('load', animateProgress);


// simple testimonials slider rotating every 4s
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial(){
    testimonials.forEach(t=>t.classList.remove('active'));
    testimonials[testimonialIndex].classList.add('active');
    testimonialIndex = (testimonialIndex+1) % testimonials.length;
}
setInterval(showTestimonial, 4000);
showTestimonial();

// contact form front-end simulation (no backend)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    // simple front-end validation done by required attributes
    alert('Message sent (simulated)! Thank you.');
    contactForm.reset();
});
