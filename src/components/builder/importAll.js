export default function importAll(r) {
  const files = {};
  const keys = r.keys();
  for (let i = 0; i < keys.length; i += 1) {
    files[keys[i].replace('./', '')] = r(keys[i]);
  }
  return files;
}
