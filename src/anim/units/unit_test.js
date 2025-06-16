typedef struct tagtwrUNIT_SAMPLE_AT7
{
    TWR_UNIT_BASE_FIELDS;

    twrMATERIAL_PATTERN * MyMtlPat;      /* Test material pattern */
    twrMATERIAL * MyMtl;                 /* Test material */
    twrPRIM * MyPr;                      /* Test primitive */
    twrMODEL * MyModel, * MyModelB;       /* Test models */
    twrMATERIAL_PATTERN * LandMtlPat,    /* Land material pattern */
                      * ForestMtlPat;  /* Forest material pattern */
    twrMATERIAL * LandMtl,               /* Land material */
              * ForestMtl;             /* Forest material */
    twrPRIM * MyLand;                    /* Land primitive */
    twrMODEL * Forest[7];                /* Forest trees models */
  MATR TreeMatrs[TWR_TREES_COUNT];    /* Trees transform matrices */
  CHAR TreeIDs[TWR_TREES_COUNT];      /* Trees library IDs */
    twrLIGHT * Dir;                      /* Directional light */
    twrLIGHT * Dir1;                      /* Directional light */
} twrUNIT_SAMPLE_AT7;

function TWR_UnitInit(Uni) {
}

/* Unit deinitialization function.
 * ARGUMENTS:
 *   - self-pointer to unit object:
 *       twrUNIT_SAMPLE_AT7 *Uni;
 * RETURNS: None.
 */
static VOID TWR_UnitClose(twrUNIT_SAMPLE_AT7 * Uni)
{
  INT i;
    Twr -> PrimFree(Uni -> MyPr);
    Twr -> ModelFree(Uni -> MyModel);
    Twr -> ModelFree(Uni -> MyModelB);
    Twr -> PrimFree(Uni -> MyLand);

    for (i = 0; i < 7; i++)
        Twr -> ModelFree(Uni -> Forest[i]);
} /* End of 'TWR_UnitClose' function */

/* Unit inter frame events handle function.
 * ARGUMENTS:
 *   - self-pointer to unit object:
 *       twrUNIT_SAMPLE_AT7 *Uni;
 * RETURNS: None.
 */
static VOID TWR_UnitResponse(twrUNIT_SAMPLE_AT7 * Uni)
{
} /* End of 'TWR_UnitResponse' function */

/* Unit render function.
 * ARGUMENTS:
 *   - self-pointer to unit object:
 *       twrUNIT_SAMPLE_AT7 *Uni;
 * RETURNS: None.
 */
static VOID TWR_UnitRender(twrUNIT_SAMPLE_AT7 * Uni)
{
  INT i;
    Twr -> LightSetDir(Uni -> Dir, Vec3Set(sin(Twr -> Time), 1, cos(Twr -> Time)));
    Twr -> LightSetDir(Uni -> Dir1, Vec3Set(sin(-Twr -> Time), 1, -cos(Twr -> Time)));
    /*
    twrMATERIAL_PATTERN *MyMtlPat;
    twrMATERIAL *MyMtl;
    twrMODEL *Mdl;
    twrPRIM *Pr;
    twrTEXTURE *Tex;
    twrVERTEX_ATTRS attrs[] =
    {
      {"InPosition", 3, TRUE, TWR_GetFieldOffset(twrVERTEX_STD4, P)},
      {"InTexCoord", 2, TRUE, TWR_GetFieldOffset(twrVERTEX_STD4, T)},
      {"InNormal",   3, TRUE, TWR_GetFieldOffset(twrVERTEX_STD4, N)},
      {"InColor",    4, TRUE, TWR_GetFieldOffset(twrVERTEX_STD4, C)},
    };
    twrVERTEX_STD4 V[] = 
    {
      {{0, 0, 8}, {0, 0}, {0, 0, 1}, {1, 1, 1, 1}},
      {{0, 1, 8}, {0, 0}, {0, 0, 1}, {0, 0, 1, 1}},
      {{1, 0, 8}, {0, 0}, {0, 0, 1}, {0, 1, 0, 1}},
      {{1, 1, 8}, {0, 0}, {0, 0, 1}, {1, 0, 0, 1}},
    };
  
    for (i = 0; i < 5; i++)
    {
      MyMtlPat = Twr->MtlPatCreate("Phong_STD4", "default", 4, sizeof(twrVERTEX_STD4), attrs, 4);
  
      MyMtl = Twr->MtlCreate("MyMtl", MyMtlPat, TWR_MTL_OPAQUE);
      Twr->MtlBindTex(MyMtl, 0, Twr->TexCreateFromVec3("Ka", Vec3Set1(0.1)));
      Twr->MtlBindTex(MyMtl, 1, Twr->TexCreateFromVec4("KdTrans", Vec4SetVec3(Vec3Set1(0.8), 1)));
      Twr->MtlBindTex(MyMtl, 2, Twr->TexCreateFromVec4("KsPh", Vec4SetVec3(Vec3Set1(0.5), 30)));
  
      Pr = Twr->PrimCreate(MyMtl, TWR_RND_PRIM_TRISTRIP, V, 4, NULL, 0);
      Mdl = Twr->ModelLoadG3DM(MyMtlPat, "bin/models/Spaceship.g3dm");
      Twr->PrimDraw(Pr, MatrIdentity());
      Twr->PrimFree(Pr);
  
      Twr->ModelDraw(Mdl, MatrMulMatr(MatrScale(Vec3Set1(0.001)), MatrTranslate(Vec3Set(i * 5, i * 5, i * 5))));
      Twr->ModelFree(Mdl);
  
      Tex = Twr->TexCreateFromVec3("Test", Vec3Set(0, 1, 2));
      Twr->TexFree(Tex);
    }
    */
    Twr -> PrimDraw(Uni -> MyLand, MatrIdentity());
    for (i = 0; i < TWR_TREES_COUNT; i++)
        Twr -> ModelDraw(Uni -> Forest[Uni -> TreeIDs[i]], Uni -> TreeMatrs[i]);
} /* End of 'TWR_UnitRender' function */

twrUNIT * TWR_UnitCreateSampleAT7(twrPARAMS * Params)
{
    twrUNIT * Uni;

    /* Memory allocation */
    if ((Uni = Twr -> UnitCreate(sizeof(twrUNIT_SAMPLE_AT7))) == NULL)
        return NULL;
    /* Setup unit methods */
    Uni -> Init = (VOID *)TWR_UnitInit;
    Uni -> Close = (VOID *)TWR_UnitClose;
    Uni -> Response = (VOID *)TWR_UnitResponse;
    Uni -> Render = (VOID *)TWR_UnitRender;

    return Uni;
}

