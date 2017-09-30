// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var exec = require('child_process').exec
var fs = require('fs');
const {clipboard} = require('electron');
var os = require('os');

var app = new Vue({
    el: '#app',
    data: {
        path: '',
        passphrase: '',
        pub_key: '',
        err: '',
        copyText: 'Copy To Clipboard'
    },
    methods: {
    	generateKey: function () {

    		this.err = '';
    		this.pub_key = '';
    		this.copyText = 'Copy To Clipboard';

    		const cmd = 'ssh-keygen -N "' + this.passphrase + '" -f' + this.path;

    		const self = this;

    		var child = exec(cmd,
		    (error, stdout, stderr) => {
		        if(stdout!==''){
		            fs.readFile(this.path + '.pub', 'utf8', (err, data) => {
		            	this.pub_key = data
		            })

		            this.path = '';
		            this.passphrase = '';
		        }
		        if(stderr!==''){
		            this.err = stderr;
		        }
		    });
    	},
    	copyToClipboard: function () {

    		this.copyText = 'Copied!'

    		if(os.platform() == 'darwin') {
    			return clipboard.writeText(this.pub_key, 'selection')
    		}

    		clipboard.writeText(this.pub_key);

    	}
    }
})