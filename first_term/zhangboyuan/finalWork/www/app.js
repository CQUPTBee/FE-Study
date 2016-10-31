/**
 *  Created by boyuan on 8/29/16. 用volo构建
 */

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
require.config({
    baseUrl: 'lib', //lib下的直接调文件名，不用加任何路径
    paths: {
        app: '../app',   //app下的文件前面加上'app/'路径调用	
        api: '../app/api'	 //同理↑
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
require(['app/main']);
