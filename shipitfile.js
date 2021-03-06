'use strict'

module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-cnpm')(shipit)
  require('shipit-pm')(shipit)
  shipit.initConfig({
    default: {
      workspace: '/tmp/deploy/mxx-project',
      deployTo: '/home/work/mxx-project',
      repositoryUrl: 'https://github.com/mengxxSELF/mxx-project.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/path/to/key',
      shallowClone: true,
      cnpm: {
        flags: '--production',
        local: false,
        npm: 'cnpm',
        remote: true
      },
      pm: {
        production: {
          path: '/home/work/mxx-project/current/pm2/production.json'
        }
      }
    },
    production: {
      servers: ['vbird2@101.200.45.254'],
      branch: 'master'
    },
    // production: {
    //   servers: ['root@101.200.45.254'],
    //   branch: 'master'
    // },
    // production: {
    //   servers: ['root@47.104.231.146'],
    //   branch: 'master'
    // }
  })
}
