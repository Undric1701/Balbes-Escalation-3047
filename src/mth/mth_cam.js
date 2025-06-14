/* AT7, 13.06.2025, math module: camera module */
//!!!!!!!!!!! Not final version!!! Needs to be talked over

export class Camera {
    constructor(loc, at, up, w, h, projSize, projDist, farClip) {
        this.matrView = MatrView(loc, at, up);
        this.loc = loc;
        this.at = at;
        this.up = Vec3Set(this.matrView.A[0][1], this.matrView.A[1][1], this.matrView.A[2][1]);
        this.Right = Vec3Set(this.matrView.A[0][0], this.matrView.A[1][0], this.matrView.A[2][0]);
        this.Dir = Vec3Set(-this.matrView.A[0][2], -this.matrView.A[1][2], -this.matrView.A[2][2]);
        this.matrProj = CamSetProj(w, h, projSize, projDist, farClip);
        this.matrVP = MatrMulMatr(this.matrView, this.matrProj);
    }
    camUpdate = (loc, at, up) => {
        this.matrView = MatrView(loc, at, up);
        this.loc = loc;
        this.at = at;
        this.up = Vec3Set(this.matrView.A[0][1], this.matrView.A[1][1], this.matrView.A[2][1]);
        this.Right = Vec3Set(this.matrView.A[0][0], this.matrView.A[1][0], this.matrView.A[2][0]);
        this.Dir = Vec3Set(-this.matrView.A[0][2], -this.matrView.A[1][2], -this.matrView.A[2][2]);
        this.matrProj = CamSetProj(w, h, projSize, projDist, farClip);
        this.matrVP = MatrMulMatr(this.matrView, this.matrProj);
    }
    locAdd = (v) => {
        this.loc = Vec3AddVec3(this.loc, v);
        this.camUpdate(this.loc, this.at, this.up);
    }
    atUpdate = (dir) => {
        this.at = Vec3AddVec3(this.loc, dir);
        this.camUpdate(this.loc, this.at, this.up);
    }
}

export function CamSetProj(W, H, ProjSize, ProjDist, ProjFarClip) {
    let Wp = ProjSize, Hp = ProjSize;
    if (W >= H)
        Wp *= W / H;
    else
        Hp *= H / W;
    return MatrFrustum(-Wp / 2, Wp / 2, -Hp / 2, Hp / 2, ProjDist, ProjFarClip);
}