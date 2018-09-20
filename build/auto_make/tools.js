'use strict';

const glob = require('glob');
const path = require('path');
const fs = require('fs');
require('shelljs/global');

const srcPath = path.resolve(__dirname, '../../src/pages') + '/';

exports.illegal = function(name) {
  return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}

exports.exist = function(name) {
  let srcModules = glob.sync(srcPath + '*').map(function(item) {
    return item.split('/').pop();
  });
  return srcModules.indexOf(name) > -1;
}

let _autoMakeJs = function(name) {
  fs.writeFileSync(srcPath + name + '/index.js', `import React, { Component } from 'react'
  export default class extends Component {
    constructor(props){
      super(props)
      this.state = {}
    }
    render() {
      return (
        <div className="pg-${name}"></div>
      )
    }
  }
  `);
};

let _autoMakeLess = function(name) {
  fs.writeFileSync(srcPath + name + '/index.less', `.pg-${name}{}`);
}


exports.autoMake = function(useReact, name) {
  if (useReact) {
    mkdir('-p', srcPath + name);
    _autoMakeJs(name);
    _autoMakeLess(name);
  }
}
