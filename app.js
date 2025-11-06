// Application data
const appData = {
  services: [
    {
      title: "Turn Your Ideas Into Interactive Experiences",
      description: "Transform static concepts into engaging, interactive web applications that captivate users and drive results.",
      icon: "✨"
    },
    {
      title: "Build Modern Web Applications That Users Love",
      description: "Create responsive, fast, and beautiful applications using the latest technologies and best practices.",
      icon: "⚡"
    },
    {
      title: "Create Stunning 3D Visuals and Animations",
      description: "Bring your website to life with Three.js animations, WebGL effects, and immersive 3D experiences.",
      icon: "🎨"
    },
    {
      title: "Develop Responsive Sites That Work Everywhere",
      description: "Ensure your website looks and functions perfectly on every device, from mobile to desktop.",
      icon: "📱"
    },
    {
      title: "Optimize Performance For Lightning-Fast Loading",
      description: "Deliver blazing-fast websites that keep users engaged and improve search engine rankings.",
      icon: "🚀"
    },
    {
      title: "Integrate Cutting-Edge Technologies",
      description: "Leverage React, Three.js, WebGL, and modern APIs to create next-generation web experiences.",
      icon: "⚙️"
    }
  ],
  technologies: [
    "React", "Three.js", "JavaScript", "TypeScript", "WebGL", "CSS3", "HTML5", "Node.js", "Next.js", "Tailwind CSS"
  ]
};

// Global variables for Three.js scenes
let heroScene, heroRenderer, heroCamera;
let skillsScene, skillsRenderer, skillsCamera, skillsCube;
let contactScene, contactRenderer, contactCamera;
let particleScene, particleRenderer, particleCamera, particles;

// Animation control
let animationId;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initHeroScene();
  initSkillsScene();
  initContactScene();
  initParticleSystem();
  populateServices();
  populateTechnologies();
  initScrollAnimations();
  initContactForm();
  initInteractiveElements();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Show/hide navbar on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      if (scrollTop > lastScrollTop) {
        navbar.classList.remove('visible');
      } else {
        navbar.classList.add('visible');
      }
    } else {
      navbar.classList.remove('visible');
    }
    lastScrollTop = scrollTop;
  });
  
  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Close mobile menu
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Hero Three.js Scene
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  
  // Create geometric shapes
  const shapes = [];
  const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.8, 16, 16),
    new THREE.ConeGeometry(0.8, 1.5, 8),
    new THREE.TorusGeometry(0.8, 0.3, 8, 16)
  ];
  
  const colors = [0x00ffff, 0x8b5cf6, 0x00ff00, 0xff0080];
  
  for (let i = 0; i < 20; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshBasicMaterial({ 
      color: colors[Math.floor(Math.random() * colors.length)],
      transparent: true,
      opacity: 0.6,
      wireframe: Math.random() > 0.5
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    
    shapes.push({
      mesh: mesh,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      }
    });
    scene.add(mesh);
  }
  
  camera.position.z = 15;
  
  // Mouse interaction
  const mouse = { x: 0, y: 0 };
  canvas.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  
  // Animation loop
  function animateHero() {
    requestAnimationFrame(animateHero);
    
    // Rotate shapes
    shapes.forEach(shape => {
      shape.mesh.rotation.x += shape.rotationSpeed.x;
      shape.mesh.rotation.y += shape.rotationSpeed.y;
      shape.mesh.rotation.z += shape.rotationSpeed.z;
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.01;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.01;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
  }
  
  animateHero();
  
  // Store references
  heroScene = scene;
  heroRenderer = renderer;
  heroCamera = camera;
  
  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// Skills Three.js Scene
function initSkillsScene() {
  const canvas = document.getElementById('skills-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x000000, 0);
  
  // Create cube with different materials for each face
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0x8b5cf6 }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff0080 }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff8000 })
  ];
  
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
  
  camera.position.z = 5;
  
  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (event.clientX - rect.left) / rect.width * 2 - 1;
    mouseY = -(event.clientY - rect.top) / rect.height * 2 + 1;
  });
  
  // Animation loop
  function animateSkills() {
    requestAnimationFrame(animateSkills);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Mouse influence
    cube.rotation.x += mouseY * 0.01;
    cube.rotation.y += mouseX * 0.01;
    
    renderer.render(scene, camera);
  }
  
  animateSkills();
  
  skillsScene = scene;
  skillsRenderer = renderer;
  skillsCamera = camera;
  skillsCube = cube;
}

// Contact Three.js Scene
function initContactScene() {
  const canvas = document.getElementById('contact-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  
  // Create floating particles
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.1,
    transparent: true,
    opacity: 0.6
  });
  
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);
  
  camera.position.z = 20;
  
  // Animation loop
  function animateContact() {
    requestAnimationFrame(animateContact);
    
    particleSystem.rotation.y += 0.001;
    
    // Move particles
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
  }
  
  animateContact();
  
  contactScene = scene;
  contactRenderer = renderer;
  contactCamera = camera;
}

// Particle System for Demo
function initParticleSystem() {
  const canvas = document.getElementById('particle-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setClearColor(0x0a0a0a);
  
  // Create particle system
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  
  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  camera.position.z = 5;
  
  // Mouse interaction
  let mouse = { x: 0, y: 0 };
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    mouse.y = -(event.clientY - rect.top) / rect.height * 2 + 1;
  });
  
  // Animation loop
  function animateParticles() {
    requestAnimationFrame(animateParticles);
    
    const positions = particles.geometry.attributes.position.array;
    const colors = particles.geometry.attributes.color.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Attract particles to mouse
      const dx = mouse.x * 5 - positions[i];
      const dy = mouse.y * 5 - positions[i + 1];
      
      positions[i] += dx * 0.02;
      positions[i + 1] += dy * 0.02;
      positions[i + 2] += Math.sin(Date.now() * 0.001 + i) * 0.01;
      
      // Update colors
      colors[i] = Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5;
      colors[i + 1] = Math.sin(Date.now() * 0.003 + i + 2) * 0.5 + 0.5;
      colors[i + 2] = Math.sin(Date.now() * 0.007 + i + 4) * 0.5 + 0.5;
    }
    
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
    
    particles.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  }
  
  animateParticles();
  
  particleScene = scene;
  particleRenderer = renderer;
  particleCamera = camera;
}

// Populate services
function populateServices() {
  const servicesGrid = document.getElementById('services-grid');
  
  appData.services.forEach((service, index) => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.style.transitionDelay = `${index * 0.1}s`;
    
    serviceCard.innerHTML = `
      <span class="service-icon">${service.icon}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    
    servicesGrid.appendChild(serviceCard);
  });
}

// Populate technologies
function populateTechnologies() {
  const techList = document.getElementById('tech-list');
  
  appData.technologies.forEach(tech => {
    const techItem = document.createElement('div');
    techItem.className = 'tech-item';
    techItem.textContent = tech;
    
    techItem.addEventListener('click', () => {
      document.querySelectorAll('.tech-item').forEach(item => item.classList.remove('active'));
      techItem.classList.add('active');
    });
    
    techList.appendChild(techItem);
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements
  const elementsToObserve = document.querySelectorAll('.section-title, .service-card');
  elementsToObserve.forEach(el => observer.observe(el));
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const inputs = form.querySelectorAll('.floating-input');
  
  // Floating label effect
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// Interactive elements
function initInteractiveElements() {
  // CTA button scroll functionality
  document.querySelector('.cta-button').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  // Color demo interaction
  const colorDemo = document.getElementById('color-demo');
  colorDemo.addEventListener('click', () => {
    const shape = colorDemo.querySelector('.morphing-shape');
    shape.style.background = `linear-gradient(45deg, 
      hsl(${Math.random() * 360}, 70%, 60%), 
      hsl(${Math.random() * 360}, 70%, 60%))`;
  });
  
  // Auto-rotate skills cube on hover
  const skillsCanvas = document.getElementById('skills-canvas');
  let isHovering = false;
  
  skillsCanvas.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  skillsCanvas.addEventListener('mouseleave', () => {
    isHovering = false;
  });
  
  // Update skills cube rotation based on hover state
  function updateSkillsCube() {
    if (skillsCube && isHovering) {
      skillsCube.rotation.x += 0.02;
      skillsCube.rotation.y += 0.02;
    }
    requestAnimationFrame(updateSkillsCube);
  }
  updateSkillsCube();
}

// Handle window resize
window.addEventListener('resize', () => {
  // Update hero canvas
  if (heroRenderer && heroCamera) {
    heroCamera.aspect = window.innerWidth / window.innerHeight;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  // Update contact canvas
  if (contactRenderer && contactCamera) {
    contactCamera.aspect = window.innerWidth / window.innerHeight;
    contactCamera.updateProjectionMatrix();
    contactRenderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  // Update skills canvas
  if (skillsRenderer && skillsCamera) {
    const skillsCanvas = document.getElementById('skills-canvas');
    skillsCamera.aspect = skillsCanvas.offsetWidth / skillsCanvas.offsetHeight;
    skillsCamera.updateProjectionMatrix();
    skillsRenderer.setSize(skillsCanvas.offsetWidth, skillsCanvas.offsetHeight);
  }
  
  // Update particle canvas
  if (particleRenderer && particleCamera) {
    const particleCanvas = document.getElementById('particle-canvas');
    particleCamera.aspect = particleCanvas.offsetWidth / particleCanvas.offsetHeight;
    particleCamera.updateProjectionMatrix();
    particleRenderer.setSize(particleCanvas.offsetWidth, particleCanvas.offsetHeight);
  }
});

// Performance optimization - pause animations when not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  } else {
    // Resume animations - they're handled by individual loops
  }
});


function initContactForm() {
  const form = document.getElementById('contact-form');
  const inputs = form.querySelectorAll('.floating-input');

  // Floating label effect (unchanged)
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });

  // Form submission via Web3Forms API
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Converts to {name: "...", email: "...", etc.}

    // Basic validation
    let isValid = true;
    if (!data.name || !data.email || !data.message || !data.phone) {
      isValid = false;
    }
    // Optional: Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) isValid = false;

    if (!isValid) {
      // Highlight errors
      inputs.forEach(input => {
        if (!input.value.trim() || (input.name === 'email' && !emailRegex.test(input.value))) {
          input.style.borderColor = '#ff4444';
          setTimeout(() => { input.style.borderColor = ''; }, 3000);
        }
      });
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (response.ok && result.success) {
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.background = '#00ff00';
    form.reset();
  } else {
  //  throw new Error(result.message || 'Failed to send message');
  }
} catch (error) {
  console.error('Form error:', error);
  submitBtn.textContent = 'Error Sending';
  submitBtn.style.background = '#ff4444';
} finally {
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = '';
    submitBtn.disabled = false;
  }, 3000);
}
  });

}
