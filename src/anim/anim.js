/* AT7, 14.06.2025, animation module */
import * as rnd from "./rnd/rnd.js";
import * as time from "./timer.js";
import * as input from "./input.js";

export class Animation {
  constructor() {
    this.timer = new time.Timer();
    this.render = new rnd.Render();
    this.input = new input.Input();
  }
  animResponse = () => {
    this.timer.response();
    this.input.response();
  }
  animRender = () => {
    console.log(`Current time is ${this.timer.getTime()}`)
  }
}


export function animInit(anim) {

} /* End of 'animInit' function */

export function animClose(anim) {
  /*
  INT i;

  for (i = 0; i < AT7_Anim.NumOfUnits; i++)
  {
    AT7_Anim.Units[i]->Close(AT7_Anim.Units[i], &AT7_Anim);
    free(AT7_Anim.Units[i]);
    AT7_Anim.Units[i] = NULL;
  }
  AT7_RndClose();
  */
} /* End of 'animClose' function */

export function animResize(anim, w, h) {
  /*
  AT7_RndResize(W, H);
  AT7_Anim.W = W;
  AT7_Anim.H = H;
  AT7_AnimRender();
  */
} /* End of 'animResize' function */

///????????????? Ivanich, podumai nado ili net!!!
export function animCopyFrame(anim) {
  /*
 AT7_RndCopyFrame();
 */
} /* End of 'animCopyFrame' function */

export function animRender(anim) {
  /*
  INT i;

  AT7_TimerResponse();
  AT7_AnimInputResponse();

  for( i = 0; i < AT7_Anim.NumOfUnits; i++)
    AT7_Anim.Units[i]->Response(AT7_Anim.Units[i], &AT7_Anim);
  AT7_RndStart();
  for( i = 0; i < AT7_Anim.NumOfUnits; i++)
    AT7_Anim.Units[i]->Render(AT7_Anim.Units[i], &AT7_Anim);

  glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
  for( i = 0; i < AT7_Anim.NumOfUnits; i++)
    AT7_Anim.Units[i]->DeferredRender(AT7_Anim.Units[i], &AT7_Anim);
  glBlendFunc(GL_ONE, GL_ZERO);
  AT7_RndEnd();
  */
} /* End of 'animRender' function */

export function animAddUnit(anim, uni) {
  /*
  if (AT7_Anim.NumOfUnits < AT7_MAX_UNITS)
    AT7_Anim.Units[AT7_Anim.NumOfUnits++] = Uni, Uni->Init(Uni, &AT7_Anim);
  */
} /* End of 'animAddUnit' function */

///?????????
export function animFlipFullScreen(anim) {
  /*
  static BOOL IsFullScreen = FALSE;
  static RECT SaveRC;              
 
  if (!IsFullScreen)
  {
    HMONITOR hMon;
    MONITORINFOEX moninfo;
    RECT rc;
 
    IsFullScreen = TRUE;
 
    GetWindowRect(AT7_Anim.hWnd, &SaveRC);
 
    hMon = MonitorFromWindow(AT7_Anim.hWnd, MONITOR_DEFAULTTONEAREST);
    moninfo.cbSize = sizeof(moninfo);
    GetMonitorInfo(hMon, (MONITORINFO *)&moninfo);

    rc = moninfo.rcMonitor;
    AdjustWindowRect(&rc, GetWindowLong(AT7_Anim.hWnd, GWL_STYLE), FALSE);

    SetWindowPos(AT7_Anim.hWnd, HWND_TOP,
      rc.left, rc.top,
      rc.right - rc.left, rc.bottom - rc.top,
      SWP_NOOWNERZORDER);
  }
  else
  {
    IsFullScreen = FALSE;
 
    SetWindowPos(AT7_Anim.hWnd, HWND_NOTOPMOST,
      SaveRC.left, SaveRC.top,
      SaveRC.right - SaveRC.left, SaveRC.bottom - SaveRC.top,
      SWP_NOOWNERZORDER);
  }
  */
} /* End of 'animFlipFullScreen' function */

///???????
export function animExit(anim) {
  /*
  DestroyWindow(AT7_Anim.hWnd);
  */
} /* End of 'animExit' function */
