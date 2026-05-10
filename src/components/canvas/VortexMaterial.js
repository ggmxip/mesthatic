import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const VortexMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    u_mouse: new THREE.Vector2(0.5, 0.5)
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 vUv;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec2 pos = st - 0.5;
      pos.x *= u_resolution.x / u_resolution.y; 

      float dist = distance(st, u_mouse);
      
      float angle = atan(pos.y, pos.x);
      float radius = length(pos);
      
      angle += sin(radius * 10.0 - u_time * 2.0) * 0.5;
      angle += (1.0 - smoothstep(0.0, 0.5, dist)) * 2.0; 
      
      vec2 warpedPos = vec2(cos(angle), sin(angle)) * radius;

      float r = sin(warpedPos.x * 5.0 + u_time) * 0.5 + 0.5;
      float g = sin(warpedPos.y * 6.0 + u_time * 1.2) * 0.5 + 0.5;
      float b = sin((warpedPos.x + warpedPos.y) * 4.0 - u_time * 0.8) * 0.5 + 0.5;

      vec3 color = vec3(r, g, b);
      color = pow(color, vec3(1.5)); 
      color *= 0.4; 
      
      float glow = exp(-dist * 3.0) * 0.3;
      color += vec3(glow * 0.8, glow, glow * 1.2);

      gl_FragColor = vec4(color, 1.0);
    }
  `
)