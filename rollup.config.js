module.exports = {
  input: './src/mainjs.js',
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: false,
  }, {
    //file: 'dist/index.es.js',
    //format: 'es',
    //sourcemap: true
  }],
  plugins: [require('@rollup/plugin-buble')()],
  external(id) { return id[0] != "." && !require("path").isAbsolute(id) }
}
