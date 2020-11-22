var gl;
            var sphere;
            var isWireFrameEnabled = false;
            var recursionDepth = 5;

            function initGL(canvas) {
                    gl = canvas.getContext("experimental-webgl");
                    gl.viewportWidth = canvas.width;
                    gl.viewportHeight = canvas.height;
}

            function getShader(gl, id) {
                var shaderScript = document.getElementById(id);
                if (!shaderScript) {
                    return null;
                }

                var str = "";
                var k = shaderScript.firstChild;
                while (k) {
                    if (k.nodeType == 3) {
                        str += k.textContent;
                    }
                    k = k.nextSibling;
                }

                var shader;
                if (shaderScript.type == "x-shader/x-fragment") {
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                } else if (shaderScript.type == "x-shader/x-vertex") {
                    shader = gl.createShader(gl.VERTEX_SHADER);
                } else {
                    return null;
                }

                gl.shaderSource(shader, str);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    alert(gl.getShaderInfoLog(shader));
                    return null;
                }

                return shader;
            }


            var shaderProgram;

            function initShaders() {
                var fragmentShader = getShader(gl, "shader-fs");
                var vertexShader = getShader(gl, "shader-vs");

                shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);
                gl.linkProgram(shaderProgram);

                gl.useProgram(shaderProgram);

                shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
                gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

                shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
                gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

                shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
                shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
            }


            var mvMatrix = mat4.create();
            var mvMatrixStack = [];
            var pMatrix = mat4.create();

            function mvPushMatrix() {
                var copy = mat4.create();
                mat4.set(mvMatrix, copy);
                mvMatrixStack.push(copy);
            }

            function mvPopMatrix() {
                if (mvMatrixStack.length == 0) {
                    throw "Invalid popMatrix!";
                }
                mvMatrix = mvMatrixStack.pop();
            }


            function setMatrixUniforms() {
                gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
                gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
            }


            function degToRad(degrees) {
                return degrees * Math.PI / 180;
            }

            function drawScene() {
                gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

                mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

                mat4.identity(mvMatrix);

                mat4.translate(mvMatrix, [0, 0, -4]);
                
                mvPushMatrix();
                // draw left sphere
                sphere.draw(isWireFrameEnabled);                
                mvPopMatrix();  
            }


            function tick() {
                requestAnimFrame(tick);
                drawScene();
            }
                      
			
		function initEventHandler() {

		window.onkeydown = function(evt) {
			var sign = evt.shiftKey ? -1 : 1;
			var key = evt.which ? evt.which : evt.keyCode;
			var c = String.fromCharCode(key);
			// console.log(evt);

			// Change projection of scene.
			switch(c) {
				case('P'):
					if(recursionDepth < 5)
                    {
                        recursionDepth += 1;
                        sphere = new Sphere(recursionDepth);
                    }
					break;
					
				case('M'):
                    if(recursionDepth > 1)
                    {
                        recursionDepth -= 1;
                        sphere = new Sphere(recursionDepth);
                    }
                    break;
			}
		};
	}

            function webGLStart() {
                var canvas = document.getElementById("canvas");
		
                initGL(canvas);
                initShaders(); 
				initEventHandler();				
                sphere = new Sphere(recursionDepth);                
                gl.clearColor(1, 1, 1, 1);
                gl.enable(gl.DEPTH_TEST);

                tick();
            }