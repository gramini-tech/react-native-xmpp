
# rnxmpp

This is a stand in replacement to the react-native-xmpp library. This is still WIP. Currently best set for manual installation.

## Getting started

#### iOS
0. Important! Install libXML and XMPPFramework using cocoapods. (Details soon.)
1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `rnxmpp` and add `RNXMPP.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNXPP.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import rnxmpp.RNXMPPPackage;` to the imports at the top of the file
  - Add `new RNXMPPPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':rnxmpp'
  	project(':rnxmpp').projectDir = new File(rootProject.projectDir, 	'../node_modules/rnxmpp/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-rnxmpp')
  	```

## Usage
```javascript
import XMPP from 'rnxmpp';

```
  