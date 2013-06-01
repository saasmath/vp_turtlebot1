                var gamepadSupport={
                   TYPICAL_BUTTON_COUNT:16,
                   TYPICAL_AXIS_COUNT:4,
                   ticking:false,gamepads:[],
                   prevRawGamepadTypes:[],
                   prevTimestamps:[],
                   init:function()
                     {
                     var gamepadSupportAvailable=!!navigator.webkitGetGamepads||!!navigator.webkitGamepads||(navigator.userAgent.indexOf('Firefox/')!=-1);
                     if(!gamepadSupportAvailable)
                       {
                       //tester.showNotSupported();
                       alert("no");
                       }
                     else
                       {
                       alert("yes");
                       window.addEventListener('MozGamepadConnected',gamepadSupport.onGamepadConnect,false);
                       window.addEventListener('MozGamepadDisconnected',gamepadSupport.onGamepadDisconnect,false);
                       if(!!navigator.webkitGamepads||!!navigator.webkitGetGamepads)
                         {gamepadSupport.startPolling();}
                       }
                     },
                   onGamepadConnect:function(event)
                     {
                     alert("add gamepad");
                     gamepadSupport.gamepads.push(event.gamepad);
                     //tester.updateGamepads(gamepadSupport.gamepads);
                     gamepadSupport.startPolling();
                     },
                  onGamepadDisconnect:function(event)
                    {
                    for(var i in gamepadSupport.gamepads)
                      {if(gamepadSupport.gamepads[i].index==event.gamepad.index)
                        {gamepadSupport.gamepads.splice(i,1);break;}
                      }
                    if(gamepadSupport.gamepads.length==0)
                      {gamepadSupport.stopPolling();}
                    //tester.updateGamepads(gamepadSupport.gamepads);
                    },
                  startPolling:function()
                    {
                    //alert("polling");
                    if(!gamepadSupport.ticking)
                      {
                      gamepadSupport.ticking=true;
                      gamepadSupport.tick();
                      }
                    },
                  stopPolling:function()
                    {
                    gamepadSupport.ticking=false;
                    },
                  tick:function()
                    {
                    //alert("polstatus");
                    gamepadSupport.pollStatus();
                    gamepadSupport.scheduleNextTick();
                    },
                  scheduleNextTick:function()
                    {
                    if(gamepadSupport.ticking)
                      {
                      if(window.requestAnimationFrame)
                        {window.requestAnimationFrame(gamepadSupport.tick);}
                      else if(window.mozRequestAnimationFrame)
                        {window.mozRequestAnimationFrame(gamepadSupport.tick);}
                      else if(window.webkitRequestAnimationFrame)
                        {window.webkitRequestAnimationFrame(gamepadSupport.tick);}
                      }
                    },
                  pollStatus:function()
                    {
                    //alert("polstatus1");
                    gamepadSupport.pollGamepads();
                    //alert(555);
                    for(var i in gamepadSupport.gamepads)
                      {
                      //alert(666);
                      var gamepad=gamepadSupport.gamepads[i];
                      if(gamepad.timestamp&&(gamepad.timestamp==gamepadSupport.prevTimestamps[i]))
                        {continue;}
                      gamepadSupport.prevTimestamps[i]=gamepad.timestamp;
                      gamepadSupport.updateDisplay(i);
                      }
                    },
                  pollGamepads:function()
                    {
                    var rawGamepads=(navigator.webkitGetGamepads&&navigator.webkitGetGamepads())||navigator.webkitGamepads;
                      //alert(222);
                    if(rawGamepads)
                      {gamepadSupport.gamepads=[];
                      //alert(333);
                      var gamepadsChanged=false;
                      for(var i=0;i<rawGamepads.length;i++)
                        {
                        if(typeof rawGamepads[i]!=gamepadSupport.prevRawGamepadTypes[i])
                          {gamepadsChanged=true;
                          //alert(i);alert(rawGamepads[i]);
                          gamepadSupport.prevRawGamepadTypes[i]=typeof rawGamepads[i];
                          }
                        if(rawGamepads[i])
                          {gamepadSupport.gamepads.push(rawGamepads[i]);}
                        }
                     if(gamepadsChanged)
                       {
                       //alert(444);
                       ;//tester.updateGamepads(gamepadSupport.gamepads);
                       }
                     }
                    },
                  updateDisplay:function(gamepadId)
                    {
                    //alert(777);
                    var gamepad=gamepadSupport.gamepads[gamepadId];
                    //alert(gamepad.buttons[0]);
                    //joystick_actions(gamepad.axes[0]);
                    if(Item.button1!=gamepad.buttons[0])  //button-1'
                      {Item.button1=gamepad.buttons[0];
                       if(gamepad.buttons[0]!=0)
                         joystick_actions(1);}
                    if(Item.button2!=gamepad.buttons[1])  //button-2'
                      {Item.button2=gamepad.buttons[1];
                       if(gamepad.buttons[1]!=0)
                         joystick_actions(2);}
                    if(Item.button3!=gamepad.buttons[2])  //button-3'
                      {Item.button3=gamepad.buttons[2];
                       if(gamepad.buttons[2]!=0)
                        joystick_actions(3);}
                    if(Item.button4!=gamepad.buttons[3])  //button-4'
                      {Item.button4=gamepad.buttons[3];
                       if(gamepad.buttons[3]!=0)
                         joystick_actions(4);}
                    if(Item.button5!=gamepad.buttons[4])  //button-left-shoulder-top
                      {Item.button5=gamepad.buttons[4];
                       if(gamepad.buttons[4]!=0)
                         joystick_actions(5);}
                    if(Item.button6!=gamepad.buttons[5])  //button-left-shoulder-bottom
                      {Item.button6=gamepad.buttons[5];
                       if(gamepad.buttons[5]!=0)
                         joystick_actions(6);}
                    if(Item.button7!=gamepad.buttons[6])  //button-right-shoulder-top
                      {Item.button7=gamepad.buttons[6];
                       joystick_actions(7);}
                    if(Item.button8!=gamepad.buttons[7])  //button-right-shoulder-bottom
                      {Item.button8=gamepad.buttons[7];
                       joystick_actions(8);}
                    if(Item.button9!=gamepad.buttons[8])  //button-select
                      {Item.button9=gamepad.buttons[8];
                       if(gamepad.buttons[8]!=0)
                         joystick_actions(9);}
                    if(Item.button10!=gamepad.buttons[9])  //button-start
                      {Item.button10=gamepad.buttons[9];
                       if(gamepad.buttons[9]!=0)
                         joystick_actions(10);}
                    if(Item.button11!=gamepad.buttons[10])  //stick-1
                      {Item.button11=gamepad.buttons[10];
                       if(gamepad.buttons[10]!=0)
                         joystick_actions(11);}
                    if(Item.button12!=gamepad.buttons[11])  //stick-2
                      {Item.button12=gamepad.buttons[11];
                       if(gamepad.buttons[11]!=0)
                         joystick_actions(12);}
                    if(Item.button13!=gamepad.buttons[12])  //button-dpad-top
                      {Item.button13=gamepad.buttons[12];
                       if(gamepad.buttons[12]!=0)
                        joystick_actions(13);}
                    if(Item.button14!=gamepad.buttons[13])  //button-dpad-bottom
                      {Item.button14=gamepad.buttons[13];
                       if(gamepad.buttons[13]!=0)
                         joystick_actions(14);}
                    if(Item.button15!=gamepad.buttons[14])  //button-dpad-left
                      {Item.button15=gamepad.buttons[14];
                       if(gamepad.buttons[14]!=0)
                         joystick_actions(15);}
                    if(Item.button16!=gamepad.buttons[15])  //button-dpad-right
                      {Item.button16=gamepad.buttons[15];
                       if(gamepad.buttons[15]!=0)
                         joystick_actions(16);}
                    if(Item.axes1!=gamepad.axes[0])  //stick-1-axis-x');
                      {Item.axes1=gamepad.axes[0];
                       joystick_actions(17);}
                    if(Item.axes2!=gamepad.axes[1])  //stick-1-axis-y');
                      {Item.axes2=gamepad.axes[1];
                       joystick_actions(18);}
                    if(Item.axes3!=gamepad.axes[2])  //stick-2-axis-x');
                      {Item.axes3=gamepad.axes[2];
                       joystick_actions(19);}
                    if(Item.axes4!=gamepad.axes[3])  //stick-2-axis-y');
                      {Item.axes4=gamepad.axes[3];
                       joystick_actions(20);}
                    }
                  };
                  
