call grunt build
copy config.xml dist
call grunt compress
mkdir bin
call grunt phonegap-build

cmd /K "C:\Program Files (x86)\Microsoft SDKs\Windows Phone\v8.1\Tools\AppDeploy\AppDeployCmd.exe" /installlaunch %~dp0/bin/windowsphone.xap /targetdevice:xd

exit