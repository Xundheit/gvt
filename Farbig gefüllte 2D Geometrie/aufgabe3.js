

const canvas = document.getElementById('geometrie');
const gl = canvas.getContext(`webgl`);

const vertices = [];
			vertices.push(0,0,0);
			for(var i = 0; i <= 28; i++){
			  var degree_offset = i * 15.0;
			  var radian_offset = degree_offset * (Math.PI / 180.0);
			  
			  if(isEven(i)){
				  var x_pos = 3* Math.cos(radian_offset);
				  var y_pos = 3* Math.sin(radian_offset);
				  var z_pos = 0;
			  } else {
				  var x_pos = 1.5* Math.cos(radian_offset);
				  var y_pos = 1.5* Math.sin(radian_offset);
				  var z_pos = 0;
			  }
			  vertices.push(x_pos);
			  vertices.push(y_pos);
			  vertices.push(z_pos);
			}

const vertexData = new Float32Array(vertices);

const colors = [];
colors.push(0.9607843137254902, 0.796078431372549, 0.3607843137254902);
			for(var i = 0; i <= 28; i++){
			  var degree_offset = i * 15.0;
			  var radian_offset = degree_offset * (Math.PI / 180.0);
			  
			  if(isEven(i)){
				  colors.push(0.13333333333333333, 0.26666666666666666, 0.13333333333333333);
			  } else {
				  colors.push(0.3137254901960784, 0.3137254901960784, 0.30980392156862746);
			  }
			}
const colorData = new Float32Array(colors);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
precision mediump float;
attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

void main() {
    vColor = color;
    gl_Position = vec4(position*0.2, 1);
}
`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
precision mediump float;

varying vec3 vColor;

void main(){
    gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);


gl.useProgram(program);
gl.drawArrays(gl.TRIANGLE_FAN, 0, 28);


function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}