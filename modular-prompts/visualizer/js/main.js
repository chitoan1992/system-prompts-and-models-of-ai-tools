/**
 * Modular Prompts Earth Visualizer
 * A cinematic journey through AI architecture
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    earth: {
        radius: 2,
        segments: 64,
        rotationSpeed: 0.0002,
        hybridTransitionSpeed: 0.001
    },
    atmosphere: {
        radius: 2.15,
        color: 0x64b5f6,
        digitalColor: 0x00d4ff
    },
    particles: {
        count: 2000,
        size: 0.02
    },
    colors: {
        spaceBlack: 0x0a0a0f,
        sunriseGold: 0xf4a261,
        sunriseCoral: 0xe76f51,
        digitalCyan: 0x00d4ff,
        digitalTeal: 0x00bfa5
    },
    stages: {
        primitive: { start: 0, end: 0.15 },
        lights: { start: 0.15, end: 0.30 },
        network: { start: 0.30, end: 0.50 },
        transform: { start: 0.50, end: 0.70 },
        hybrid: { start: 0.70, end: 0.85 },
        landing: { start: 0.85, end: 1.0 }
    }
};

// ============================================
// GLOBAL STATE
// ============================================
let scene, camera, renderer, controls;
let earth, atmosphere, digitalGrid, cityLights, connections;
let particles;
let scrollProgress = 0;
let mouseX = 0, mouseY = 0;
let isLoaded = false;

// ============================================
// INITIALIZATION
// ============================================
async function init() {
    setupScene();
    setupCamera();
    setupRenderer();
    setupLighting();

    await createEarth();
    createAtmosphere();
    createDigitalGrid();
    createCityLights();
    createConnections();
    createParticles();
    createSunriseGlow();

    setupScrollTrigger();
    setupMouseParallax();
    setupEventListeners();

    hideLoader();
    animate();
}

// ============================================
// SCENE SETUP
// ============================================
function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.colors.spaceBlack);
    scene.fog = new THREE.FogExp2(CONFIG.colors.spaceBlack, 0.05);
}

function setupCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, 6);
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    document.getElementById('canvas-container').appendChild(renderer.domElement);
}

function setupLighting() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);

    // Sun light (from right side, creating day/night)
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
    sunLight.position.set(5, 2, 3);
    scene.add(sunLight);

    // Sunrise rim light
    const rimLight = new THREE.DirectionalLight(CONFIG.colors.sunriseGold, 0.5);
    rimLight.position.set(-3, -1, 2);
    scene.add(rimLight);

    // Digital glow light (subtle cyan from digital side)
    const digitalLight = new THREE.PointLight(CONFIG.colors.digitalCyan, 0.3, 10);
    digitalLight.position.set(-3, 0, 2);
    scene.add(digitalLight);
}

// ============================================
// EARTH CREATION
// ============================================
async function createEarth() {
    const geometry = new THREE.SphereGeometry(
        CONFIG.earth.radius,
        CONFIG.earth.segments,
        CONFIG.earth.segments
    );

    // Create procedural earth texture
    const earthTexture = createProceduralEarthTexture();
    const bumpTexture = createProceduralBumpTexture();

    // Custom shader material for hybrid effect
    const material = new THREE.ShaderMaterial({
        uniforms: {
            earthTexture: { value: earthTexture },
            bumpTexture: { value: bumpTexture },
            digitalProgress: { value: 0.0 },
            time: { value: 0.0 },
            sunDirection: { value: new THREE.Vector3(1, 0.3, 0.5).normalize() }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vWorldPosition;

            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                vPosition = position;
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D earthTexture;
            uniform sampler2D bumpTexture;
            uniform float digitalProgress;
            uniform float time;
            uniform vec3 sunDirection;

            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vWorldPosition;

            // Simplex noise for digital effect
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);

                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;

                i = mod289(i);
                vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            // Grid pattern for digital effect
            float gridPattern(vec2 uv, float scale) {
                vec2 grid = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
                return 1.0 - min(min(grid.x, grid.y), 1.0);
            }

            void main() {
                // Sample earth texture
                vec4 earthColor = texture2D(earthTexture, vUv);

                // Lighting calculation
                float diffuse = max(dot(vNormal, sunDirection), 0.0);
                float ambient = 0.1;
                float lighting = ambient + diffuse * 0.9;

                // Calculate which side is "digital" based on world position
                float digitalSide = smoothstep(-0.3, 0.3, -vWorldPosition.x);
                float currentDigital = digitalSide * digitalProgress;

                // Digital grid effect
                float grid1 = gridPattern(vUv, 30.0);
                float grid2 = gridPattern(vUv, 60.0) * 0.5;
                float gridEffect = (grid1 + grid2) * currentDigital;

                // Digital noise for "transformation" effect
                float noise = snoise(vPosition * 3.0 + time * 0.5) * 0.5 + 0.5;
                float digitalNoise = noise * currentDigital * 0.3;

                // Pulsing glow on digital side
                float pulse = sin(time * 2.0) * 0.5 + 0.5;
                float digitalGlow = currentDigital * pulse * 0.2;

                // Mix colors
                vec3 digitalColor = vec3(0.0, 0.83, 1.0); // Cyan
                vec3 realisticColor = earthColor.rgb * lighting;

                // Blend between realistic and digital
                vec3 finalColor = mix(realisticColor, digitalColor * 0.3, currentDigital * 0.5);
                finalColor += vec3(gridEffect) * digitalColor * 0.8;
                finalColor += digitalGlow * digitalColor;

                // Edge glow at transition boundary
                float edgeGlow = smoothstep(0.4, 0.5, currentDigital) * smoothstep(0.6, 0.5, currentDigital);
                finalColor += edgeGlow * digitalColor * 2.0;

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `,
        transparent: false
    });

    earth = new THREE.Mesh(geometry, material);
    earth.rotation.y = -Math.PI / 2; // Position Americas facing camera initially
    scene.add(earth);
}

function createProceduralEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Ocean base
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#1a5276');
    oceanGradient.addColorStop(0.5, '#1e6091');
    oceanGradient.addColorStop(1, '#1a5276');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add continents (simplified shapes)
    ctx.fillStyle = '#2e7d32';

    // North America
    drawContinent(ctx, 200, 150, 300, 250, 0.7);
    // South America
    drawContinent(ctx, 350, 450, 150, 300, 0.6);
    // Europe
    drawContinent(ctx, 900, 150, 200, 150, 0.5);
    // Africa
    drawContinent(ctx, 950, 350, 250, 350, 0.6);
    // Asia
    drawContinent(ctx, 1200, 100, 500, 400, 0.7);
    // Australia
    drawContinent(ctx, 1600, 550, 200, 150, 0.5);

    // Add some noise/texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20;
        imageData.data[i] += noise;
        imageData.data[i + 1] += noise;
        imageData.data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

function drawContinent(ctx, x, y, width, height, irregularity) {
    ctx.beginPath();
    const points = 12;
    for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const radiusX = width / 2 * (1 + (Math.random() - 0.5) * irregularity);
        const radiusY = height / 2 * (1 + (Math.random() - 0.5) * irregularity);
        const px = x + width / 2 + Math.cos(angle) * radiusX;
        const py = y + height / 2 + Math.sin(angle) * radiusY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
}

function createProceduralBumpTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create bump map with noise
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 50 + 100;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);

    return new THREE.CanvasTexture(canvas);
}

// ============================================
// ATMOSPHERE
// ============================================
function createAtmosphere() {
    const geometry = new THREE.SphereGeometry(
        CONFIG.atmosphere.radius,
        CONFIG.earth.segments,
        CONFIG.earth.segments
    );

    const material = new THREE.ShaderMaterial({
        uniforms: {
            digitalProgress: { value: 0.0 },
            time: { value: 0.0 }
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;

            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float digitalProgress;
            uniform float time;

            varying vec3 vNormal;
            varying vec3 vPosition;

            void main() {
                // Fresnel effect for atmosphere glow
                vec3 viewDirection = normalize(cameraPosition - vPosition);
                float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.0);

                // Color blend based on digital progress and position
                vec3 realisticColor = vec3(0.39, 0.71, 0.96); // Light blue
                vec3 digitalColor = vec3(0.0, 0.83, 1.0); // Cyan

                float digitalSide = smoothstep(-0.2, 0.2, -vPosition.x);
                float colorMix = digitalSide * digitalProgress;

                vec3 atmosphereColor = mix(realisticColor, digitalColor, colorMix);

                // Pulsing on digital side
                float pulse = sin(time * 3.0) * 0.5 + 0.5;
                float intensity = fresnel * (0.6 + colorMix * pulse * 0.4);

                gl_FragColor = vec4(atmosphereColor, intensity * 0.5);
            }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    atmosphere = new THREE.Mesh(geometry, material);
    scene.add(atmosphere);
}

// ============================================
// DIGITAL GRID OVERLAY
// ============================================
function createDigitalGrid() {
    const geometry = new THREE.SphereGeometry(
        CONFIG.earth.radius + 0.01,
        32,
        32
    );

    // Create grid lines using wireframe
    const material = new THREE.ShaderMaterial({
        uniforms: {
            digitalProgress: { value: 0.0 },
            time: { value: 0.0 }
        },
        vertexShader: `
            varying vec3 vPosition;
            varying vec3 vWorldPosition;

            void main() {
                vPosition = position;
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float digitalProgress;
            uniform float time;

            varying vec3 vPosition;
            varying vec3 vWorldPosition;

            void main() {
                float digitalSide = smoothstep(-0.3, 0.1, -vWorldPosition.x);
                float alpha = digitalSide * digitalProgress;

                // Animated pulse
                float pulse = sin(time * 2.0 + vPosition.y * 5.0) * 0.5 + 0.5;

                vec3 color = vec3(0.0, 0.83, 1.0);
                gl_FragColor = vec4(color, alpha * 0.3 * pulse);
            }
        `,
        transparent: true,
        wireframe: true,
        depthWrite: false
    });

    digitalGrid = new THREE.Mesh(geometry, material);
    scene.add(digitalGrid);
}

// ============================================
// CITY LIGHTS
// ============================================
function createCityLights() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const intensities = [];

    // City positions (lat/lon converted to 3D)
    const cities = [
        // North America
        { lat: 40.7, lon: -74, size: 1.0 },   // New York
        { lat: 34, lon: -118, size: 0.9 },    // LA
        { lat: 41.8, lon: -87.6, size: 0.7 }, // Chicago
        { lat: 37.7, lon: -122.4, size: 0.8 },// SF
        // Europe
        { lat: 51.5, lon: -0.1, size: 1.0 },  // London
        { lat: 48.8, lon: 2.3, size: 0.9 },   // Paris
        { lat: 52.5, lon: 13.4, size: 0.7 },  // Berlin
        // Asia
        { lat: 35.6, lon: 139.6, size: 1.0 }, // Tokyo
        { lat: 31.2, lon: 121.4, size: 0.9 }, // Shanghai
        { lat: 22.3, lon: 114.1, size: 0.8 }, // Hong Kong
        { lat: 1.3, lon: 103.8, size: 0.7 },  // Singapore
        { lat: 28.6, lon: 77.2, size: 0.8 },  // Delhi
        // South America
        { lat: -23.5, lon: -46.6, size: 0.8 },// Sao Paulo
        { lat: -34.6, lon: -58.3, size: 0.6 },// Buenos Aires
        // Africa
        { lat: -33.9, lon: 18.4, size: 0.5 }, // Cape Town
        { lat: 30, lon: 31.2, size: 0.6 },    // Cairo
        // Australia
        { lat: -33.8, lon: 151.2, size: 0.7 },// Sydney
    ];

    cities.forEach(city => {
        const phi = (90 - city.lat) * (Math.PI / 180);
        const theta = (city.lon + 180) * (Math.PI / 180);

        const x = -CONFIG.earth.radius * Math.sin(phi) * Math.cos(theta);
        const y = CONFIG.earth.radius * Math.cos(phi);
        const z = CONFIG.earth.radius * Math.sin(phi) * Math.sin(theta);

        positions.push(x, y, z);
        sizes.push(city.size * 0.08);
        intensities.push(Math.random());
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('intensity', new THREE.Float32BufferAttribute(intensities, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            lightsProgress: { value: 0.0 },
            time: { value: 0.0 }
        },
        vertexShader: `
            attribute float size;
            attribute float intensity;

            varying float vIntensity;

            uniform float lightsProgress;
            uniform float time;

            void main() {
                vIntensity = intensity;

                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z) * lightsProgress;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying float vIntensity;

            uniform float lightsProgress;
            uniform float time;

            void main() {
                // Circular point with soft edge
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;

                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

                // Twinkling effect
                float twinkle = sin(time * 3.0 + vIntensity * 10.0) * 0.3 + 0.7;

                vec3 color = vec3(1.0, 0.9, 0.7); // Warm white
                gl_FragColor = vec4(color, alpha * lightsProgress * twinkle);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    cityLights = new THREE.Points(geometry, material);
    scene.add(cityLights);
}

// ============================================
// NEURAL CONNECTIONS
// ============================================
function createConnections() {
    connections = new THREE.Group();

    // Create curved lines between major city pairs
    const connectionPairs = [
        [{ lat: 40.7, lon: -74 }, { lat: 51.5, lon: -0.1 }],     // NY - London
        [{ lat: 51.5, lon: -0.1 }, { lat: 35.6, lon: 139.6 }],   // London - Tokyo
        [{ lat: 34, lon: -118 }, { lat: 35.6, lon: 139.6 }],     // LA - Tokyo
        [{ lat: 35.6, lon: 139.6 }, { lat: 31.2, lon: 121.4 }],  // Tokyo - Shanghai
        [{ lat: 51.5, lon: -0.1 }, { lat: 28.6, lon: 77.2 }],    // London - Delhi
        [{ lat: 40.7, lon: -74 }, { lat: -23.5, lon: -46.6 }],   // NY - Sao Paulo
    ];

    connectionPairs.forEach(([start, end]) => {
        const curve = createConnectionCurve(start, end);
        connections.add(curve);
    });

    scene.add(connections);
}

function createConnectionCurve(start, end) {
    const startVec = latLonToVector3(start.lat, start.lon, CONFIG.earth.radius + 0.02);
    const endVec = latLonToVector3(end.lat, end.lon, CONFIG.earth.radius + 0.02);

    // Calculate midpoint with height for arc
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const distance = startVec.distanceTo(endVec);
    midPoint.normalize().multiplyScalar(CONFIG.earth.radius + 0.02 + distance * 0.3);

    const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            connectionProgress: { value: 0.0 },
            time: { value: 0.0 }
        },
        vertexShader: `
            attribute float lineProgress;
            varying float vProgress;

            void main() {
                vProgress = position.x; // Use position as progress indicator
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float connectionProgress;
            uniform float time;

            void main() {
                vec3 color = vec3(0.0, 0.83, 1.0);
                float pulse = sin(time * 5.0) * 0.5 + 0.5;
                gl_FragColor = vec4(color, connectionProgress * (0.3 + pulse * 0.3));
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    return new THREE.Line(geometry, material);
}

function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

// ============================================
// PARTICLES (Stars/Data streams)
// ============================================
function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];
    const sizes = [];

    for (let i = 0; i < CONFIG.particles.count; i++) {
        // Distribute particles in a sphere around the scene
        const radius = 5 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions.push(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );

        velocities.push(
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001
        );

        sizes.push(Math.random() * 2 + 0.5);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            pixelRatio: { value: renderer.getPixelRatio() }
        },
        vertexShader: `
            attribute float size;

            uniform float time;
            uniform float pixelRatio;

            varying float vAlpha;

            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

                // Twinkle effect
                float twinkle = sin(time * 2.0 + position.x * 10.0) * 0.5 + 0.5;
                vAlpha = twinkle * 0.8;

                gl_PointSize = size * pixelRatio * (200.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying float vAlpha;

            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;

                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vAlpha);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// ============================================
// SUNRISE GLOW
// ============================================
function createSunriseGlow() {
    const geometry = new THREE.PlaneGeometry(20, 20);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            glowProgress: { value: 0.0 },
            time: { value: 0.0 }
        },
        vertexShader: `
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float glowProgress;
            uniform float time;

            varying vec2 vUv;

            void main() {
                // Radial gradient from bottom center
                vec2 center = vec2(0.5, -0.2);
                float dist = distance(vUv, center);

                // Sunrise colors
                vec3 gold = vec3(0.96, 0.64, 0.38);
                vec3 coral = vec3(0.91, 0.44, 0.32);
                vec3 orange = vec3(0.96, 0.52, 0.37);

                // Color gradient based on distance
                vec3 color = mix(gold, coral, smoothstep(0.0, 0.5, dist));
                color = mix(color, orange, smoothstep(0.3, 0.8, dist));

                // Intensity falloff
                float intensity = 1.0 - smoothstep(0.0, 1.0, dist);
                intensity *= glowProgress;

                // Subtle animation
                intensity *= 0.8 + sin(time * 0.5) * 0.1;

                gl_FragColor = vec4(color, intensity * 0.4);
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });

    const sunriseGlow = new THREE.Mesh(geometry, material);
    sunriseGlow.position.set(0, 0, -8);
    sunriseGlow.name = 'sunriseGlow';
    scene.add(sunriseGlow);
}

// ============================================
// SCROLL TRIGGER SETUP
// ============================================
function setupScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    // Update scroll progress
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            scrollProgress = self.progress;
            updateScrollProgressBar(self.progress);
            updateStoryActivation(self.progress);
        }
    });

    // Story sections activation
    const storySections = document.querySelectorAll('.story-section');
    storySections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => section.classList.add('active'),
            onLeave: () => section.classList.remove('active'),
            onEnterBack: () => section.classList.add('active'),
            onLeaveBack: () => section.classList.remove('active')
        });
    });
}

function updateScrollProgressBar(progress) {
    const bar = document.querySelector('.scroll-progress-bar');
    if (bar) {
        bar.style.width = `${progress * 100}%`;
    }
}

function updateStoryActivation(progress) {
    // This function updates Earth visuals based on scroll progress
    // The actual updates happen in the animation loop using scrollProgress
}

// ============================================
// MOUSE PARALLAX
// ============================================
function setupMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Resize handler
    window.addEventListener('resize', onWindowResize);

    // Category cards click
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.category));
    });

    // Modal close
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ============================================
// MODAL FUNCTIONS
// ============================================
const moduleData = {
    identity: {
        icon: '🎭',
        title: 'Identity',
        modules: [
            { name: 'agent-role.md', desc: 'Define autonomous agent behavior with persistence until completion' },
            { name: 'expert-persona.md', desc: 'Establish expertise and professionalism with domain knowledge scope' },
            { name: 'capability-scope.md', desc: 'Set clear boundaries for what AI can and cannot do' },
            { name: 'model-awareness.md', desc: 'Model self-knowledge and honest limitations calibration' }
        ]
    },
    communication: {
        icon: '💬',
        title: 'Communication',
        modules: [
            { name: 'concise-response.md', desc: 'Minimize verbosity with forbidden phrases list' },
            { name: 'structured-output.md', desc: 'Formatting guidelines and code citations format' },
            { name: 'tone-professional.md', desc: 'Professional communication with respectful correction' },
            { name: 'code-citations.md', desc: 'Reference code locations using file:line pattern' },
            { name: 'multilingual.md', desc: 'Multi-language support with language matching' }
        ]
    },
    tools: {
        icon: '⚡',
        title: 'Tool Calling',
        modules: [
            { name: 'parallel-execution.md', desc: 'Maximize efficiency with dependency decision matrix' },
            { name: 'tool-selection.md', desc: 'Choose right tools using tool hierarchy' },
            { name: 'context-gathering.md', desc: 'Efficient information gathering with priority order' },
            { name: 'error-recovery.md', desc: 'Handle failures gracefully with recovery strategies' }
        ]
    },
    code: {
        icon: '💻',
        title: 'Code Generation',
        modules: [
            { name: 'clean-code-style.md', desc: 'Code quality standards and naming conventions' },
            { name: 'edit-strategies.md', desc: 'Choose edit approach using three-tier system' },
            { name: 'debugging-workflow.md', desc: 'Systematic debugging with priority order' },
            { name: 'testing-protocol.md', desc: 'Verification requirements - never skip tests' },
            { name: 'design-system.md', desc: 'UI/style consistency with semantic tokens' }
        ]
    },
    tasks: {
        icon: '📋',
        title: 'Task Management',
        modules: [
            { name: 'todo-tracking.md', desc: 'Track task progress with one in-progress rule' },
            { name: 'planning-mode.md', desc: 'Separate planning from doing with two-mode system' },
            { name: 'memory-persistence.md', desc: 'Save important context across memory categories' },
            { name: 'progress-reporting.md', desc: 'Keep user informed with report triggers' }
        ]
    },
    safety: {
        icon: '🛡️',
        title: 'Safety',
        modules: [
            { name: 'git-safety.md', desc: 'Safe git operations with forbidden commands list' },
            { name: 'data-security.md', desc: 'Protect sensitive data with detection patterns' },
            { name: 'refusal-rules.md', desc: 'Know when to decline with direct refusals' },
            { name: 'destructive-actions.md', desc: 'Confirm dangerous operations with protocol' }
        ]
    }
};

function openModal(category) {
    const modal = document.getElementById('module-modal');
    const data = moduleData[category];

    if (!data) return;

    modal.querySelector('.modal-icon').textContent = data.icon;
    modal.querySelector('.modal-title').textContent = data.title;

    const moduleList = modal.querySelector('.module-list');
    moduleList.innerHTML = data.modules.map(m => `
        <div class="module-item">
            <div class="module-item-name">${m.name}</div>
            <div class="module-item-desc">${m.desc}</div>
        </div>
    `).join('');

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('module-modal').classList.remove('active');
}

// ============================================
// LOADER
// ============================================
function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        isLoaded = true;
    }, 2500);
}

// ============================================
// ANIMATION LOOP
// ============================================
function animate() {
    requestAnimationFrame(animate);

    const time = performance.now() * 0.001;

    // Update uniforms based on scroll progress
    updateEarthUniforms(time);

    // Earth rotation
    if (earth) {
        earth.rotation.y += CONFIG.earth.rotationSpeed;

        // Mouse parallax
        earth.rotation.x = mouseY * 0.1;
        earth.rotation.z = mouseX * 0.05;
    }

    // Sync digital grid with earth
    if (digitalGrid) {
        digitalGrid.rotation.copy(earth.rotation);
    }

    // Rotate city lights with earth
    if (cityLights) {
        cityLights.rotation.y = earth.rotation.y;
    }

    // Rotate connections with earth
    if (connections) {
        connections.rotation.y = earth.rotation.y;
    }

    // Animate particles
    if (particles) {
        particles.material.uniforms.time.value = time;
    }

    renderer.render(scene, camera);
}

function updateEarthUniforms(time) {
    const { stages } = CONFIG;

    // Calculate stage-specific progress values
    const lightsProgress = smoothProgress(scrollProgress, stages.lights.start, stages.network.end);
    const digitalProgress = smoothProgress(scrollProgress, stages.transform.start, stages.hybrid.end);
    const connectionProgress = smoothProgress(scrollProgress, stages.network.start, stages.transform.end);
    const glowProgress = smoothProgress(scrollProgress, stages.primitive.start, stages.hybrid.end);

    // Update Earth material
    if (earth && earth.material.uniforms) {
        earth.material.uniforms.digitalProgress.value = digitalProgress;
        earth.material.uniforms.time.value = time;
    }

    // Update atmosphere
    if (atmosphere && atmosphere.material.uniforms) {
        atmosphere.material.uniforms.digitalProgress.value = digitalProgress;
        atmosphere.material.uniforms.time.value = time;
    }

    // Update digital grid
    if (digitalGrid && digitalGrid.material.uniforms) {
        digitalGrid.material.uniforms.digitalProgress.value = digitalProgress;
        digitalGrid.material.uniforms.time.value = time;
    }

    // Update city lights
    if (cityLights && cityLights.material.uniforms) {
        cityLights.material.uniforms.lightsProgress.value = lightsProgress;
        cityLights.material.uniforms.time.value = time;
    }

    // Update connections
    if (connections) {
        connections.children.forEach(line => {
            if (line.material.uniforms) {
                line.material.uniforms.connectionProgress.value = connectionProgress;
                line.material.uniforms.time.value = time;
            }
        });
    }

    // Update sunrise glow
    const sunriseGlow = scene.getObjectByName('sunriseGlow');
    if (sunriseGlow && sunriseGlow.material.uniforms) {
        sunriseGlow.material.uniforms.glowProgress.value = glowProgress;
        sunriseGlow.material.uniforms.time.value = time;
    }

    // Camera zoom on landing stage
    const landingProgress = smoothProgress(scrollProgress, stages.landing.start, stages.landing.end);
    camera.position.z = 6 - landingProgress * 2;
}

function smoothProgress(current, start, end) {
    if (current < start) return 0;
    if (current > end) return 1;
    return (current - start) / (end - start);
}

// ============================================
// START
// ============================================
init();
