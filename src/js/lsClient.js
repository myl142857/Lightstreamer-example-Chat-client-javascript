/*
  Copyright 2014 Weswit Srl

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

//////////////// Connect to current host (or localhost) and configure a StatusWidget
define(["LightstreamerClient","StatusWidget"],function(LightstreamerClient,StatusWidget) {
    var protocolToUse = document.location.protocol != "file:" ? document.location.protocol : "http:";
    var portToUse = document.location.protocol == "https:" ? "443" : "8080";
    // in accordance with the port configuration in the factory lightstreamer_conf.xml
    // (although the https port is not open by the factory lightstreamer_conf.xml)
    
    var lsClient = new LightstreamerClient(protocolToUse+"//localhost:"+portToUse,"CHAT");
    
    lsClient.connectionSharing.enableSharing("ChatDemoCommonConnection", "ATTACH", "CREATE");
    lsClient.addListener(new StatusWidget("left", "0px", true));
    
    if (document.webkitVisibilityState != "prerender") {
      //non webkit will pass from here
      lsClient.connect();
    } else {
      document.addEventListener("webkitvisibilitychange", function() {
        //don't care which status it is now, the important thing is that is not prerender
        //(as per documentation documents can't go from a non-prerender status to a prerender status,
        //well, it makes sense)
        lsClient.connect(); 
      }, false);
    }
    
    
    
    return lsClient;
});

