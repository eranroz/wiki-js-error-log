/*
 * Simple script to go for finding JS errors in wikipedia.
 *
 * Usage:
 * phantomjs testwiki.js LANG_CODE
 *
 *
 * TODOs:
 * use page.onResourceRequested to find external resources loaded
 */

var page = require('webpage').create(),
	system = require('system');

if (system.args.length < 2) {
	console.log('Usage: testwiki.js wikiname');
	phantom.exit();
}

var address = 'https://' + system.args[1] + '.wikipedia.org/wiki/Special:Random';



page.onError = function (msg, trace) {
	var msgStack = ['ERROR: ' + msg];
	if (trace && trace.length) {
		msgStack.push('TRACE:');
		trace.forEach(function(t) {
			msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
		});
	}
	console.error(msgStack.join('\n'));
}

page.open(address, function(status) {
	if (status === 'success') {
		page.open(address+'?action=edit', function(status) {
			phantom.exit();
		});
	} else {
		console.log('Unable to load the address:' + address);
		phantom.exit();
	}
});
