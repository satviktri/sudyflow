/**
 * StudyFlow — Google Sheets autosync
 * Paste EVERYTHING below into: Extensions > Apps Script, in your StudyFlow spreadsheet.
 * Then Deploy > New deployment > type: Web app
 *   - Description: "StudyFlow sync"
 *   - Execute as: Me
 *   - Who has access: Anyone with the link   (login is enforced by PIN_KEY below)
 * Click "Deploy", copy the URL, and paste it into the StudyFlow app's Sheet Sync panel.
 */

// Your spreadsheet. Keep this empty to use the spreadsheet this script is bound to
// (recommended). Or paste any Sheet ID to use a different one, e.g.
// "1QcTLStavxkdw3Ayn0bUjsWvbFLG5Gb"
const FIXED_SPREADSHEET_ID = "";

// "Login" PIN: pick a secret word/phrase. StudyFlow must send this to write/read.
// Leave "" to allow anyone with the URL to access (not recommended).
const PIN_P = "ChangeMe123";

const DATA_SHEET = "StudyFlowData";   // keys -> JSON values
const LOG_SHEET = "StudyFlowLog";     // append-only history

function doGet(e)      { return handle_(e ? e.parameter : {}); }
function doPost(e)     {
  var body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { body = {}; }
  return handle_(body);
}

function handle_(p) {
  if (!p.method) return respond_({ ok: false, error: "missing 'method'" });
  if (PIN_P && p.pin !== PIN_P) return respond_({ ok: false, error: "unauthorized" }, 401);
  try {
    if (p.method === "read") return respond_(read_());
    if (p.method === "write") { write_(p.data); log_(p.data); return respond_({ ok: true }); }
    if (p.method === "ping") return respond_({ ok: true });
    return respond_({ ok: false, error: "unknown method" });
  } catch (err) {
    return respond_({ ok: false, error: String(err) });
  }
}

function getSS_() {
  var id = String(FIXED_SPREADSHEET_ID || "").trim();
  return id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
}

function ensureSheet_(name) {
  var ss = getSS_();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); if (name === DATA_SHEET) sh.appendRow(["key", "value"]); }
  return sh;
}

function read_() {
  var sh = ensureSheet_(DATA_SHEET);
  var out = {};
  var v = sh.getDataRange().getValues();
  for (var i = 1; i < v.length; i++) {
    var k = v[i][0], valRaw = v[i][1];
    if (!k) continue;
    try { out[k] = valRaw ? JSON.parse(valRaw) : {}; } catch (e) { out[k] = {}; }
  }
  return { ok: true, data: out };
}

function write_(data) {
  var sh = ensureSheet_(DATA_SHEET);
  var map = {
    progress: data.progress || {},
    settings: data.settings || {},
    tasks: data.tasks || [],
    mind: data.mind || {}
  };
  var rows = sh.getDataRange().getValues();
  var i;
  for (var key in map) {
    var json = JSON.stringify(map[key]);
    var found = false;
    for (i = 1; i < rows.length; i++) {
      if (rows[i][0] === key) { sh.getRange(i + 1, 2).setValue(json); found = true; break; }
    }
    if (!found) sh.appendRow([key, json]);
  }
  // keep the data sheet neat: delete fully-empty tail rows
  return true;
}

function log_(data) {
  var sh = ensureSheet_(LOG_SHEET);
  var who = '';
  try { who = Session.getActiveUser().getEmail(); } catch (e) {}
  var tasks = (data.tasks && data.tasks.length) || 0;
  var days = (data.progress) ? Object.keys(data.progress).length : 0;
  sh.appendRow([new Date(), who, days, tasks]);
  // cap the log at 500 rows so it never bloats
  var last = sh.getLastRow();
  if (last > 500) sh.deleteRows(2, last - 500);
}

function respond_(obj, code) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}