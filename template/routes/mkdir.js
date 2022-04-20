// const { mkdir, opendir } = require("fs/promises");

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.]
// try {
//     const dir = await opendir("./.tools")
//     for await (const content of dir) {
//         console.log(content);
//     }
// } catch (error) {
//     // console.log(error);
// }


const { mkdir } = require("fs");

// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
mkdir('tmp/a/apple', { recursive: true }, (err) => {
    if (err) throw err;
    console.log("done")
});





/**
 * Make the given dir relative to base.
 *
 * @param {string} base
 * @param {string} dir
 */

 function mkdir (base, dir) {
    var loc = path.join(base, dir)
  
    console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
    mkdirp.sync(loc, MODE_0755)
  }