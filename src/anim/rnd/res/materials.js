/* AT7, 14.06.2025, materials module */

/*
typedef struct tagtwrMATERIAL
{
  CHAR Name[TWR_STR_MAX];             
  twrMATERIAL_PATTERN *MtlPat;         
  twrTRANSPARENCY_FLAG IsTrans;        
  FLT Trans;                           
  BOOL IsShadowCast;                   
  INT RefCounter;                      
  UINT64 StoreFrameNo;                 
                                       
  INT NumOfBuffers;                    
  twrBUFFER *Bufs[TWR_MAX_BUFFERS];    
  INT NumOfTextures;                   
  twrTEXTURE *Texs[TWR_MAX_TEXTURES];  
  twrPRIM *FirstDraw;                  
                                       
  twrMATERIAL *NextDraw;                                                      
} twrMATERIAL;
*/

export class Material {
    constructor(name, ka, kd, ks, ph, trans) {
        try {
            if (typeof name === String) {
                this.name = name;
            } else {
                throw new Error("Invalid name");
            }
            this.textures = [];
            this.ka = ka;
            this.kd = kd;
            this.ks = ks;
            this.ph = ph;
            this.trans = trans;
        } catch (err) {
            console.log(err);
        }
    }
}

