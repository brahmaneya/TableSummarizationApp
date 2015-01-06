var express = require('express');
var router = express.Router();
var sjs = require('shelljs');

/* GET home page. */
router.post('/', function(req, res) {
  	var obj = {'1' : '2'};
	var newRules = [{'vals':[1,'*',3]}, {'vals':[5,6,'*']}];
	var rowNo = req.body.row + 1;
	var rules = req.body.rules;
	var selectedRule = rules[rowNo-1];
	var curDepth = selectedRule.depth;
	console.log(rules);
	if (selectedRule.expanded === 0) {
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
				newRules[i].vals[0] = depthStr + newRules[i].vals[0];
				rules.splice(rowNo, 0, newRules[i]);
				rowNo++;
			}
		}
		while (rowNo < rules.length) {
			rules[rowNo].row = rowNo;
			rowNo++;
		}		
	} else {
		selectedRule.expanded = 0;
		while (rowNo < rules.length && rules[rowNo].depth > curDepth) {
			rules.splice(rowNo, 1);
		}
		while (rowNo < rules.length) {
			rules[rowNo].row = rowNo;
			rowNo++;
		}		
	}
  	res.json(rules);
});

module.exports = router;
