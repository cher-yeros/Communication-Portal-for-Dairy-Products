const { exec } = require('child_process');
const { methodOf } = require('lodash');

let dumpFile = 'assets/dump.sql';	

let exportFrom = {
	host: "localhost",
	user: "root",
	password: "",
	database: "cpdp"
}

let importTo = {
	host: "localhost",
	user: "root",
	password: "",
	database: "cpdp"
}

module.exports = {
	export() {
		exec(`mysqldump -u${exportFrom.user} ${exportFrom.password} -h${exportFrom.host} --compact ${exportFrom.database} > ${dumpFile}`, (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}
		});
	},
	import() {
		exec(`mysql -u${importTo.user} -p${importTo.password} -h${importTo.host} ${importTo.database} < ${dumpFile}`, (err, stdout, stderr) => {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}
		});
	}
}



