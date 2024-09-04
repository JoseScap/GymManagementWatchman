import { app as s, BrowserWindow as t, screen as a } from "electron";
import { fileURLToPath as c } from "node:url";
import o from "node:path";
const r = o.dirname(c(import.meta.url));
process.env.APP_ROOT = o.join(r, "..");
const i = process.env.VITE_DEV_SERVER_URL, R = o.join(process.env.APP_ROOT, "dist-electron"), l = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : l;
let e;
function d() {
  const n = a.getAllDisplays();
  e = new t({
    icon: o.join(process.env.VITE_PUBLIC, "gym_management.ico"),
    webPreferences: {
      preload: o.join(r, "preload.mjs")
    },
    width: n[0].bounds.width,
    height: n[0].bounds.height,
    x: n[0].bounds.x,
    y: n[0].bounds.y
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(l, "index.html"));
}
s.on("window-all-closed", () => {
  process.platform !== "darwin" && (s.quit(), e = null);
});
s.on("activate", () => {
  t.getAllWindows().length === 0 && d();
});
s.whenReady().then(d);
export {
  R as MAIN_DIST,
  l as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
