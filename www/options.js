
// JavaScript Document
function new_robot(address)
  {
  //alert(address);
  choice_robot=address;
  con = new Bridge("ws://"+address+":9090");
  //con.advertise('turtlebot_servo', 'std_msgs/Int16');	

  }

function new_camera(topic)
  {
  //alert(topic);alert(choice_robot);
  document.getElementById("camera_robot").src="http://"+choice_robot+":8081/stream?topic="+topic;
  }
    

