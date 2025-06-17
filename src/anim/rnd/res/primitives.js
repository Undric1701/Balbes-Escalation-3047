/* AT7, 14.06.2025, primitives module */
import * as mth from "../../../mth/mth.js";
import * as res from "./res.js"

export class Prim {
    constructor(mtl, type, vertArr, indArr) {
        let i;
        this.type = type;

        //gl.GenVertexArrays(1, &Pr->VA);
        this.VA = gl.createVertexArray();
        /* Vertex data */
        if (vertArr != undefined) {
            this.VBuf = gl.createBuffer();
            //gl.bindBuffer(this.VBuf);
            gl.bindVertexArray(this.VA);

            /* Set vertex data to buffer  */
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBuf);
            //glBufferData(GL_ARRAY_BUFFER, Mtl->MtlPat->VertexStride * NoofV, vertArr, GL_STATIC_DRAW);
            gl.bufferData(gl.ARRAY_BUFFER, mth.VertexArray(vertArr), gl.STATIC_DRAW);

            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 48, 0);
            gl.enableVertexAttribArray(1);
            gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 48, 12);
            gl.enableVertexAttribArray(2);
            gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 48, 20);
            gl.enableVertexAttribArray(3);
            gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 48, 36);
            //gl.bindVertexArray(0);
            //Twr->PrimEvalBB(&Pr->MinBB, &Pr->MaxBB, vertArr, NoofV, Mtl->MtlPat);
        }
        /* Index data */
        if (indArr !== undefined && indArr.length > 0) {
            this.numOfElements = indArr.length;
            this.IBuf = gl.createBuffer();
            /* Enable buffer */
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
            /* Put data into memeory (NumOfI - indicies count, Ind - index array) */
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indArr), gl.STATIC_DRAW);
            //Pr->NumOfTriangles = Type == TWR_RND_PRIM_TRIMESH ? NoofI / 3 : Type == TWR_RND_PRIM_TRISTRIP ? NoofI / 2 - 1 : 0;
        }
        else {
            if (vertArr !== undefined) {
                this.numOfElements = vertArr.length;
            }
            else {
                console.error("Tried to create primitive with no vertices");
            }
        }

        this.mtl = mtl;
    }
    free = () => {
        gl.bindVertexArray(this.VA);
        /* Disconnect buffer */
        //gl.bindBuffer(gl.ARRAY_BUFFER, 0);
        gl.deleteBuffer(this.VBuf);
        gl.deleteBuffer(this.IBuf);
        /* Deactivete vertex array */
        //gl.bindVertexArray(0);
        gl.deleteVertexArray(this.VA);
    }
    draw(matrW) {
        this.mtl.apply();
        try {
            if (this.type === undefined) {
                throw new Error("undefined type of primitive");
            }
            if (matrW === undefined && this.matrW === undefined) {
                matrW = mth.unitMatrix;
            } else if (matrW === undefined) {
                matrW = this.matrW;
            }

            gl.uniformMatrix4fv(res.matrWLocation, false, mth.float32ArrayFromMatr(matrW), 0, 16);

            gl.bindVertexArray(this.VA);

            if (this.IBuf == 0) {
                glDrawArrays(this.type, 0, this.numOfElements);
            } else {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
                gl.drawElements(this.type, this.numOfElements, gl.UNSIGNED_INT, 0);
                //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0);
            }
            //glBindVertexArray(0);
        } catch (err) {
            console.log(err)
        }
    }
}