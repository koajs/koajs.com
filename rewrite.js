#!/usr/bin/env node

/**
 * Module dependencies.
 */

var stdin = require('stdin');

// rewrite

stdin(function(str){
  str = links(str);
  console.log(str);
});

/**
 * Fix links so they target anchors.
 */

function links(str) {
  str = str.replace(/context\.md/g, '#context');
  str = str.replace(/request\.md/g, '#request');
  str = str.replace(/response\.md/g, '#response');
  return str;
}