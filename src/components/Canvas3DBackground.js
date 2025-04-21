// Vanilla JS implementation of 3D background to ensure cross-browser compatibility
export default class Canvas3DBackground {
  constructor(container) {
    this.container = container;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.isAnimating = false;
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    if (!this.ctx) {
      console.warn('Canvas 2D context not supported');
      return;
    }
    
    this.init();
  }
  
  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '0';
    this.canvas.style.top = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.6';
    
    this.container.appendChild(this.canvas);
    
    // Create particles
    const particleCount = Math.min(100, Math.floor(this.width * this.height / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 1,
        color: '#64ffda',
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      });
    }
    
    // Mouse movement effect
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Start animation
    this.isAnimating = true;
    this.animate();
  }
  
  handleMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  
  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw particles
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around canvas
      if (particle.x > this.width) particle.x = 0;
      if (particle.x < 0) particle.x = this.width;
      if (particle.y > this.height) particle.y = 0;
      if (particle.y < 0) particle.y = this.height;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        // Move away from mouse
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 10000;
        particle.speedX -= Math.cos(angle) * force;
        particle.speedY -= Math.sin(angle) * force;
      }
      
      // Slow down particles
      particle.speedX *= 0.99;
      particle.speedY *= 0.99;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      // Connect to nearest particles
      for (let j = index + 1; j < this.particles.length; j++) {
        const particle2 = this.particles[j];
        const dx2 = particle.x - particle2.x;
        const dy2 = particle.y - particle2.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (distance2 < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(particle2.x, particle2.y);
          this.ctx.strokeStyle = `rgba(100, 255, 218, ${(100 - distance2) / 500})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });
  }
  
  animate() {
    if (!this.isAnimating) return;
    
    this.drawParticles();
    requestAnimationFrame(this.animate.bind(this));
  }
  
  stop() {
    this.isAnimating = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
} 