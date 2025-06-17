

export class Texture {
    constructor(...args) {
        ///...
    }
    free = () => {
        if (--this.referenceCount <= 0) {
            window.global.deleteTexture(this.texID);
            console.log()
        }
    }
}