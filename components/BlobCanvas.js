import { useEffect, useRef } from "react";

// Simple WebGL gradient blob for playful motion without extra deps.
export default function BlobCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    };

    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;

      // Basic random generator for subtle texture.
      float noise(vec2 p){
        return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_res.xy;
        st.x *= u_res.x / u_res.y;

        float t = u_time * 0.25;
        vec2 center = vec2(0.5 + 0.1 * sin(t), 0.5 + 0.08 * cos(t * 1.4));
        float dist = distance(st, center);

        float ripple = sin(10.0 * dist - t * 6.0) * 0.05;
        float blob = smoothstep(0.35 + ripple, 0.0, dist);

        float grain = (noise(st * 40.0 + t) - 0.5) * 0.03;
        float shade = blob + grain;

        vec3 base = mix(vec3(0.85, 0.93, 1.0), vec3(0.3, 0.55, 0.95), shade);
        gl_FragColor = vec4(base, 0.5);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertex);
    const fs = createShader(gl.FRAGMENT_SHADER, fragment);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_res");

    let frame = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      resize();
      gl.uniform1f(timeLoc, frame * 0.016);
      gl.uniform2f(resLoc, width, height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame += 1;
      requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="blob-canvas" aria-hidden="true" />;
}
