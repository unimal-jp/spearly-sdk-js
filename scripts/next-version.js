#!/usr/bin/env node
const { program } = require('commander')
const { workspace, updateWorkspace } = require('./utils')

const main = async () => {
  program.parse(process.argv)
  try {
    const ws = await workspace()
    let version

    const major = ws.version.split('.').map((v) => Number(v))[0]

    if (ws.version.search('next') > -1) {
      const preVersions = Number(ws.version.replace(/^\d+?\.\d+?\.\d+?-.+?\.(\d+)$/, '$1'))
      version = `${major}.0.0-next.${preVersions + 1}`
    } else {
      version = `${major + 1}.0.0-next.0`
    }

    await updateWorkspace({
      ...ws,
      version,
    })
  } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    process.exit(2)
  }
}

if (require.main === module) {
  main()
}
