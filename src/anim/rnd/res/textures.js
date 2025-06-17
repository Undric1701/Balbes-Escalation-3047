
import * as mth from "../../../mth/mth.js"

class _texture {
    // possible types: 2d, cube, target
    constructor(nameURL, textureType = "2d") {
        if (typeof nameURL == "object") {
            this.name = nameURL.name;
            console.log(`Texture loading: ${this.name}`);
            this.type = gl.TEXTURE_2D;
            this.id = gl.createTexture();
            gl.bindTexture(this.type, this.id);
            if (nameURL.img) {
                gl.texImage2D(this.type, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
                nameURL.img.onload = () => {
                    gl.bindTexture(this.type, this.id);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texImage2D(this.type, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, nameURL.img);
                    gl.generateMipmap(this.type);
                    gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, gl.REPEAT);
                    gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, gl.REPEAT);
                    gl.texParameteri(this.type, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                    gl.texParameteri(this.type, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                }
            } else {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(this.type, 0, gl.RGBA, nameURL.w, nameURL.h, 0, gl.RGBA, gl.UNSIGNED_BYTE, nameURL.img_data);
                gl.generateMipmap(this.type);
                gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(this.type, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(this.type, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
            return;
        }
        this.name = nameURL;
        console.log(`Texture loading: ${this.name}`);
        this.id = gl.createTexture();
        this.textureType = textureType;
        if (textureType == "2d") {
            this.type = gl.TEXTURE_2D;
            gl.bindTexture(this.type, this.id);
            gl.texImage2D(this.type, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
            // Load image
            const img = new Image();
            img.crossOrigin = "use-credentials";
            img.src = nameURL;
            img.onload = () => {
                gl.bindTexture(this.type, this.id);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(this.type, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                gl.generateMipmap(this.type);
                //gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                //gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                //gl.texParameteri(this.type, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(this.type, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                gl.texParameteri(this.type, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            }
        } else if (textureType == "cube") {
            this.type = gl.TEXTURE_CUBE_MAP;
            gl.bindTexture(this.type, this.id);
            const sideInfos = [
                { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, fileName: "PosX.png" },
                { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, fileName: "NegX.png" },
                { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, fileName: "PosY.png" },
                { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, fileName: "NegY.png" },
                { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, fileName: "PosZ.png" },
                { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, fileName: "NegZ.png" },
            ];
            // Set default cube map
            gl.bindTexture(this.type, this.id);
            sideInfos.forEach((side) => {
                const { target, fileName } = side;
                gl.texImage2D(target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
            });
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            // Load all images
            let is_first = true;
            sideInfos.forEach((side) => {
                const { target, fileName } = side;
                gl.bindTexture(this.type, this.id);
                const img = new Image();
                img.crossOrigin = "use-credentials";
                img.src = this.name + fileName;
                img.onload = () => {
                    gl.bindTexture(this.type, this.id);
                    if (is_first) {
                        is_first = false;
                        sideInfos.forEach((side) => {
                            const { target, fileName } = side;
                            gl.texImage2D(target, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
                        });
                        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                    }
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                    gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                };
            });
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
        }
    } // End of 'constructor' function

    apply(shd, texUnit, name = null) {
        let uniform_name = name ? name : "Texture" + texUnit;
        if (shd == undefined || shd.progId == undefined || shd.progId == null || shd.uniforms[uniform_name] == undefined)
            return;
        gl.activeTexture(gl.TEXTURE0 + texUnit);
        gl.bindTexture(this.type, this.id);
        gl.uniform1i(shd.uniforms[uniform_name].loc, texUnit);
    } // End of 'apply' function

    /*
    apply(shd, texUnit, name = null) {
        let uniform_name = name ? name : "Texture" + texUnit;
        if (shd == undefined || shd.id == undefined || shd.id == null || shd.uniforms[uniform_name] == undefined)
            return;
        gl.activeTexture(gl.TEXTURE0 + texUnit);
        gl.bindTexture(this.type, this.id);
        gl.uniform1i(shd.uniforms[uniform_name].loc, texUnit);
    } // End of 'apply' function
     */
    free = () => {
        if (--this.referenceCount <= 0) {
            window.global.deleteTexture(this.texID);
            console.log()
        }
    }
} // End of '_texture' class

export function texture(...args) {
    if (args[0] instanceof _texture)
        return args[0];
    if (args[0] != undefined && typeof args[0] == "object" && args[0].cube)
        return new _texture(args[0].cube, "cube");
    if (args[0] != undefined && typeof args[0] == "string" && args[0][args[0].length - 1] == '/')
        return new _texture(args[0], "cube");
    return new _texture(...args);
} // End of 'texture' function

export function createTexture(textureName, width, height, isMipmap, glType, pixelsBits) {
    console.log(`Create texture: ${textureName} ${width} x ${height}`);

    let type = gl.UNSIGNED_BYTE;
    let comps = 1;
    let isTransparent = false;

    switch (glType) {
        case gl.R8:
            type = gl.UNSIGNED_BYTE;
            comps = 1;
            break;
        case gl.R32F:
            type = gl.FLOAT;
            comps = 1;
            break;
        case gl.RGB8:
        case gl.RGB8:
            type = gl.UNSIGNED_BYTE;
            comps = 3;
            break;
        case gl.RGB32F:
            type = gl.FLOAT;
            comps = 3;
            break;
        case gl.RGBA8:
            type = gl.UNSIGNED_BYTE;
            comps = 4;
            if (pixelsBits) {
                for (let i = 3; i < pixelsBits.length; i += 4) {
                    if (pixelsBits[i] !== 255) {
                        isTransparent = true;
                        break;
                    }
                }
            }
            break;
        case gl.RGBA32F:
            type = gl.FLOAT;
            comps = 4;
            break;
    }

    const tex = gl.createTexture();
    if (!tex) {
        console.error('Failed to create WebGL texture');
        return null;
    }

    gl.bindTexture(gl.TEXTURE_2D, tex);

    let mips = 1;
    if (isMipmap) {
        mips = Math.floor(Math.log2(Math.max(width, height))) + 1;
        mips = Math.max(mips, 1);
    }

    try {
        gl.texStorage2D(gl.TEXTURE_2D, mips, glType, width, height);
    } catch (e) {
        console.error('texStorage2D failed:', e);
        gl.deleteTexture(tex);
        return null;
    }

    let format;
    if (comps === 4) {
        format = gl.RGBA;
    } else if (comps === 3) {
        format = gl.RGB;
    } else if (comps === 1) {
        format = gl.RED;
    } else {
        format = gl.RGBA;
    }

    if (pixelsBits) {
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        if (type == gl.FLOAT) {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, format, type, new Float32Array(pixelsBits));
        } else {
            gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, format, type, new Uint8Array(pixelsBits));
        }
    }

    if (isMipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    gl.bindTexture(gl.TEXTURE_2D, null);

    let t = texture();
    t.id = tex;
    t.name = textureName;
    t.type = gl.TEXTURE_2D;
    t.textureType = "2d";
    /*
    t.isMipmap = isMipmap;
    t.isTransparent = isTransparent;
    */

    return t;
}

export function texCreateFromVec4(vec4) {
    return createTexture(`tex from vec4: ${vec4}`, 1, 1, false, gl.RGBA32F, vec4.toArray())
}