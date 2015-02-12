var express = require('express');
var router = express.Router();
var sjs = require('shelljs');

/* GET home page. */
router.post('/', function(req, res) {
	var rowNo = req.body.row + 1;
	var rules = req.body.rules;
	console.log(req.body);
	var selectedRule = rules[rowNo-1];
	var curDepth = selectedRule.depth;
	
	if (selectedRule.expanded === 1) {
		selectedRule.expanded = 0;
		while (rowNo < rules.length && rules[rowNo].depth > curDepth) {
			rules.splice(rowNo, 1);
		}
		while (rowNo < rules.length) {
			rules[rowNo].row = rowNo;
			rowNo++;
		}				
	  	res.json(rules);
	} else {
		var commandStr = 'java -jar TableSummarization.jar';
		if(req.body.k) {
			commandStr = commandStr + " " + req.body.k;
		} else {
			return;
		}
		if(req.body.mw) {
			commandStr = commandStr + " " + req.body.mw;			
		} else {
			return;
		}
		commandStr = commandStr + " " + req.body.W;
		commandStr = commandStr + " " + JSON.stringify(selectedRule.vals);
		commandStr = commandStr + " " + JSON.stringify(req.body.colopt);
		
		sjs.exec(commandStr, function (code, output) {
			var newRules = JSON.parse(output);
			selectedRule.expanded = 1;
			for (var i in newRules) {
				if (true) {
					newRules[i].row = rowNo;
					newRules[i].expanded = 0;
					newRules[i].depth = curDepth + 1;
					var depthStr = "";
					for (var j = 0; j < curDepth + 1; j++) {
						depthStr = depthStr + ">";
					}
					newRules[i].depthStr = depthStr;
					rules.splice(rowNo, 0, newRules[i]);
					rowNo++;
				}
			}
			while (rowNo < rules.length) {
				rules[rowNo].row = rowNo;
				rowNo++;
			}		
		  	res.json(rules);
		});
	}
});

module.exports = router;
