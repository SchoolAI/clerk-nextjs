const maskSecretKey = (str) => {
  if (!str || typeof str !== "string") {
    return str;
  }
  try {
    return (str || "").replace(/^(sk_(live|test)_)(.+?)(.{3})$/, "$1*********$4");
  } catch (e) {
    return "";
  }
};
const logFormatter = (entry, i) => {
  return (Array.isArray(entry) ? entry : [entry]).map((entry2) => {
    if (typeof entry2 === "string") {
      return { logKey: i, content: maskSecretKey(entry2) };
    }
    const entries = Object.fromEntries(Object.entries(entry2).map(([k, v]) => [k, maskSecretKey(v)]));
    if (!("logKey" in entries)) {
      entries.logKey = i;
    }
    return entries;
  });
};
export {
  logFormatter
};
//# sourceMappingURL=logFormatter.js.map