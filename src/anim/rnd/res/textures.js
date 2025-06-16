

export class Texture {
    constructor() {
        ///...
    }
    free = () => {
        if (--this.referenceCount <= 0) {
            window.global.deleteTexture(this.texID);
            console.log()
        }
    }
}