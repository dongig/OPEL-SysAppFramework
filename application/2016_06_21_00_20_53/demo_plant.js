console.log("Start Code");

var fs = require('fs');
var sensorManager = require("../../../nil_sensor/nil");
var systemManager = require("../../../nil_system/nil");
var cameraManager = require("../../../nil_camera/OPELRecording");
require('date-utils');

var temp, light;
var dt, d;


var recObj = new cameraManager.OPELRecording();


recObj.init(function(width, height, buffer_size){
			console.log("Camera Initialization Success");
		});

function write_plant_info() {
    temp = sensorManager.Get("TEMP");
    light = sensorManager.Get("LIGHT");

    dt = new Date();
    d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');

    fs.appendFile('plant_data.txt', "[" + d + "]" + "  Temp : " + temp.TEMP + "  /    Light : " + light.LIGHT + "\n", function (err) {
        if (err) throw err;
    });
    
    if(temp.TEMP < 20){
		console.log("Low Temp Event");

		var tempNoti = systemManager.makeNotiPage("Warning low temperature");			//Make notiPage
		tempNoti = systemManager.addNotiText(tempNoti, "low temperature"); 	//Add Text
		tempNoti = systemManager.addNotiImg(tempNoti, "./low_temp.jpg");
		systemManager.sendNotiPage(tempNoti);				//Send notiPage
	}
	else if(temp.TEMP > 35){
		conlose.log("High Temp Event");

		var tempNoti = systemManager.makeNotiPage("Warning high temperature");           //Make notiPage
		tempNoti = systemManager.addNotiText(tempNoti, "high temperature");  //Add Text
		tempNoti = systemManager.addNotiImg(tempNoti, "./high_temp.jpg");
		systemManager.sendNotiPage(tempNoti);               //Send notiPage
	}

    if(light.LIGHT < 3){
		console.log("Low Light Event");

		var lightNoti = systemManager.makeNotiPage("Warning low radiation");			//Make notiPage
		lightNoti = systemManager.addNotiImg(lightNoti, "./low_light.jpg");
        systemManager.sendNotiPage(lightNoti);				//Send notiPage
	}
	else if(light.LIGHT > 5){
		console.log("High Light Event");		
		
		var lightNoti = systemManager.makeNotiPage("Warning high radiation");            //Make notiPage
		lightNoti = systemManager.addNotiImg(lightNoti, "./high_light.jpg");
		systemManager.sendNotiPage(lightNoti);              //Send notiPag
	}

}
/*
sensorManager.On("TOUCH", "NOTIFY", 1000, function () {
		eecObj.start("/home/pi/Desktop/ProtoType/nil_start("/home/pi/Desktop/ProtoType/nil_system/application/ene/testImg.jpg", 1, function(error, data){
			if(data){
			console.log("Touch event Callback!!!!! testImg.jpg saved");

			var photoNoti = systemManager.makeNotiPage("photo");
			photoNoti = systemManager.addNotiText(photoNoti, "Steel shot");
			photoNoti = systemManager.addNotiImg(photoNoti, "./testImg.jpg");
			systemManager.sendNotiPage(photoNoti);

			}
			});				//Send notiPage
		// write_plant_info();
		});
*/
function capture_snapshot(){
	 dt = new Date();
	 d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');

	 
	recObj.start("/home/pi/Desktop/demo/plant/img" + d + ".jpg", 1, function(error, data){
		console.log("Taken snapshot");
		});
}

var repeat = setInterval(function(){
    write_plant_info();
	},5000); //5 sec


var repeat2t = setInterval(function(){
	capture_snapshot();
	},10000); //5 sec

systemManager.onTermination(function(){

		console.log('<onTermination> Called');
});