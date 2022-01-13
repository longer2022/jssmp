<<<<<<< HEAD
module.exports = [{
=======
module.exports = {
>>>>>>> f512201 (dev)
  input: './src/jssplaylist.js',
  output: [{
    file: 'dist/import_jssplaylist.js',
    format: 'cjs',
    sourcemap: false,
  }],
  plugins: [require('@rollup/plugin-buble')()],
  external(id) { return id[0] != "." && !require("path").isAbsolute(id) }
}];
