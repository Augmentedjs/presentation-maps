const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = (new JSDOM('<!doctype html><html><body></body></html>')).window;

global.document = dom.document;
global.window = dom.window;
global.navigator = {
  userAgent: 'node.js'
};

global.Maps = require("../dist/presentation-maps.js");

const chai = require("chai");
global.chai = chai;
global.expect = chai.expect;
