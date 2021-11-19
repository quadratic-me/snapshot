const fs = require('fs-extra');

const pluginName = process.argv[2].replace(/[-_]/g, '');

(async () => {
  try {
    await fs.copy(
      `${__dirname}/_template`,
      `${__dirname}/${pluginName}`,
      { overwrite: false }
    );
    console.log(`Plugin created! (src/plugins/${pluginName})`);
  } catch (err) {
    console.error(err);
  }
})()