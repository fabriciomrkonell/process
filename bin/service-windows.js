'use strict';

var Service = require('node-windows').Service,
    argument = process.argv[process.argv.length - 1],
    svc = new Service({
      name:'Process Mining',
      description: 'Process Mining Web Application',
      script: require('path').join(__dirname, 'www.js'),
      env: {
        name: "NODE_ENV",
        value: "production"
      }
    });

svc.on('install', function(){
  svc.start();
});

svc.on('uninstall', function(){
  console.log(svc.name + ' finished!');
  if(argument === 'restart'){
    svc.install();
  }
});

svc.on('alreadyinstalled', function(){
  console.log('This service is already installed.');
});

svc.on('start',function(){
  console.log(svc.name + ' started! \nVisit http://127.0.0.1:3000 to see it in action.');
});

switch(argument) {
  case 'uninstall':
    svc.uninstall();
    break;
  case 'restart':
    svc.uninstall();
    break;
  default:
    svc.install();
}