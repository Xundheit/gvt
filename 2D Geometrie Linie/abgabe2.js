var InitDemo = function(){
var canvas = document.getElementById('geometrie');
            var gl = canvas.getContext('experimental-webgl');

            // Pipeline setup
            gl.clearColor(1, 1, 1, 1); //Farbe des Canvas wird gesetzt (weiß)

            // Compile a vertex shader
            var vsSource = 'attribute vec2 pos;'+
            'void main(){ gl_Position = vec4(pos * 0.2, 0, 1);}'; //Position des Rechtecks wird gesetzt (mittig)
            var vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);

            // Compile a fragment shader
            fsSouce =  'void main() { gl_FragColor = vec4(0,0,0,1); }'; //Farbe der Linien wird gesetzt (Schwarz)
            var fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSouce);
            gl.compileShader(fs);

            // Link together into a program
            var prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.useProgram(prog);

            // Load vertex data into a buffer
            var vertices = [];
			vertices.push(0,0);
			for(var i = 0; i <= 28; i++){
			  var degree_offset = i * 15.0;
			  var radian_offset = degree_offset * (Math.PI / 180.0);
			  var x_pos = 3* Math.cos(radian_offset);
			  var y_pos = 3* Math.sin(radian_offset);

			  vertices.push(x_pos);
			  vertices.push(y_pos);
			  vertices.push(0,0)
			  console.log(vertices);
			}
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable
            var posAttrib = gl.getAttribLocation(prog, 'pos');
            gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(posAttrib);

            // Clear framebuffer and render primitives
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.LINE_STRIP, 0, 56);

  }
  
InitDemo();