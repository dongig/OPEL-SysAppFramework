var OPELCameraAddon = require('../../../nil_camera/OPELRecording');
var faceDetectAddon = require('../../../nil_camera/OPELFaceDetection');
var sensorAddon = require('../../../nil_sensor/nil');
var systemManager = require("../../../nil_system/nil");

require('date-utils');
var sleep = require('sleep');

var recObj = new OPELCameraAddon.OPELRecording();
var count = 30;
var dt, d;
var cnt=0;

var path = '/home/pi/BlackBox/'
var alreadyMotionDetected = false;


sensorAddon.On("MOTION", "NOTIFY", 5000, function() {
		console.log("Motion Detected");
		if(!alreadyMotionDetected)
		{
		
			alreadyMotionDetected = true;
			console.log("FaceDetection Start");		
			faceDetectAddon.faceDetection(count, function(err, numberOfFace){
				dt = new Date();
				d = dt.toFormat('HH24:MI:SS');

			if(numberOfFace > 0)
			{
				recObj.init(function(width, height, buffer_size){
					console.log('Camera Init Success');
				});
				sleep.sleep(2);	
					console.log("Face Detected !!!!!!!!!!!");	
					console.log("Face Detected !!!!!!!!!!!");	
					console.log("Face Detected !!!!!!!!!!!");	
					
				recObj.start(path+'[FaceDetect]['+d+'].mjpeg', 300, function(err, data)
			 	{
			   		if(data)
					{
			     	
		    			console.log(path+'[faceDetected]['+d+'].mjpeg video Saved');
						sleep.sleep(5);
						alreadyMotionDetected = false;
					}
				});

			}
			else
			{
			  	alreadyMotionDetected = false;
			}
		});		
		}
		else
		{
			console.log("aleady working motion");
		}
});

var repeat = setInterval(function(){
//		test();
		},5000);

systemManager.onTermination(function(){

		console.log('<onTermination> Called');
});