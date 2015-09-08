
<?php
session_start();
?>

<!-- Copyright (c) 2015, Fujana Solutions - Moritz Maleck. All rights reserved. -->
<!-- For licensing, see LICENSE.md -->

<?php

// Don't remove the following two rows
$link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$root = "http://$_SERVER[HTTP_HOST]";

// Including the plugin config file, don't delete the following row!
require(__DIR__ . '/pluginconfig.php');
// Including the functions file, don't delete the following row!
require(__DIR__ . '/function.php');
// Including the check_permission file, don't delete the following row!
require(__DIR__ . '/check_permission.php');

if ($username == "" and $password == "") {
    if(!isset($_SESSION['username'])){
        include(__DIR__ . '/new.php');
        exit;
    }
} else {
    if(!isset($_SESSION['username'])){
        include(__DIR__ . '/loginindex.php');
        exit;
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Image Browser for CKEditor :: Fujana Solutions</title>
    <meta name="author" content="Moritz Maleck">
    <link rel="icon" href="img/cd-ico-browser.ico">

    <link rel="stylesheet" href="styles.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://ibm.bplaced.com/imageuploader/plugininfo.js"></script>
    <script src="dist/jquery.lazyload.min.js"></script>

    <script>
        // Plugin version
        var currentpluginver = "<?php echo $currentpluginver; ?>"
    </script>

    <script src="function.js"></script>

</head>
<body ontouchstart="">

<div id="header">
    <a class="headerA" href="http://imageuploaderforckeditor.altervista.org/" target="_blank"><b>Image Browser</b> for CKEditor</a><br>
    <button class="headerBtn" onclick="window.close();"><img src="img/cd-icon-close.png" class="headerIcon"> Close</button>
    <button class="headerBtn" onclick="location.reload();"><img src="img/cd-icon-refresh.png" class="headerIcon"> Refresh</button>
    <button class="headerBtn" onclick="uploadImg();"><img src="img/cd-icon-upload.png" class="headerIcon"> Upload</button>
    <button class="headerBtn" onclick="pluginSettings();"><img src="img/cd-icon-settings.png" class="headerIcon"> Settings</button>
</div>

<div id="updates"></div>

<p class="folderInfo">In total: <span id="finalcount"></span> Images - <span id="finalsize"></span></p>

<?php
loadImages();
?>

<div class="fileDiv" onclick="window.location.href = 'http://imageuploaderforckeditor.altervista.org';">
    <div class="imgDiv">Image Uploader for CKEditor</div>
    <p class="fileDescription">&copy; 2015 by Moritz Maleck</p>
    <p class="fileTime">imageuploaderforckeditor.altervista.org</p>
    <p class="fileTime">180 KB</p>
</div>

<div id="imageFullSreen">
    <div class="buttonBar">
        <button class="headerBtn" onclick="$('#imageFullSreen').fadeToggle(300); $('#background').fadeToggle(300);"><img src="img/cd-icon-close.png" class="headerIcon"> Close</button>
        <button class="headerBtn" id="imgActionDelete"><img src="img/cd-icon-delete.png" class="headerIcon"> Delete</button>
        <a href="#" id="imgActionDownload" download><button class="headerBtn"><img src="img/cd-icon-download.png" class="headerIcon"> Download</button></a>
        <button class="headerBtn greenBtn" id="imgActionUse" onclick="#" class="imgActionP"><img src="img/cd-icon-use.png" class="headerIcon"> Use</button>
    </div><br><br>
    <img id="imageFSimg" src="#" style="#"><br>
</div>

<div id="uploadImgDiv">
    <div class="buttonBar">
        <button class="headerBtn" onclick="$('#uploadImgDiv').fadeToggle(300); $('#background2').fadeToggle(300);"><img src="img/cd-icon-close.png" class="headerIcon"> Close</button>
        <button class="headerBtn greenBtn" name="submit" onclick="$('#uploadImgForm').submit();"><img src="img/cd-icon-upload.png" class="headerIcon"> Upload</button>
    </div><br><br><br>
    <form action="imgupload.php" method="post" enctype="multipart/form-data" id="uploadImgForm" onsubmit="return checkUpload();">
        <p class="uploadP"><img src="img/cd-icon-select.png" class="headerIcon"> Please select a file:</p>
        <input type="file" name="upload" id="upload">
        <br><h3 class="settingsh3" style="font-size:12px;font-weight:lighter;">The image will be uploaded to:<br><span style="font-weight:bolder;">"<?php echo $useruploadfolder; ?>"</span> (The upload path can be changed in the settings)</h3>
        <br>
    </form>
</div>

<div id="settingsDiv">
    <div class="buttonBar">
        <button class="headerBtn" onclick="$('#settingsDiv').fadeToggle(300); $('#background3').fadeToggle(300);"><img src="img/cd-icon-close.png" class="headerIcon"> Close</button>
    </div><br><br><br>

    <h3 class="settingsh3">Upload path:</h3>
    <p class="settingsh3 saveUploadPathP">Please choose an existing folder:</p>
    <p class="uploadP editable" id="uploadpathEditable"><?php echo $useruploadfolder; ?></p>
    <p class="settingsh3 saveUploadPathP">Path history:</p>
    <?php
    pathHistory();
    ?>
    <button class="headerBtn greyBtn saveUploadPathA" id="pathCancel">Cancel</button>
    <button class="headerBtn saveUploadPathA" onclick="updateImagePath();">Save</button><br class="saveUploadPathA">

    <br><h3 class="settingsh3">Settings &amp; Password:</h3>
    <p class="uploadP" onclick="window.location.href = 'logout.php';"><img src="img/cd-icon-logout.png" class="headerIcon"> Logout</p>

    <br><h3 class="settingsh3">Do you like our plugin?</h3>
    <p class="uploadP" onclick="$( '#donate' ).submit();"><img src="img/cd-icon-coffee.png" class="headerIcon"> Buy Us A Coffee!</p>

    <br><h3 class="settingsh3">Support:</h3>
    <p class="uploadP" onclick="window.open('http://imageuploaderforckeditor.altervista.org/support/','_blank');"><img src="img/cd-icon-faq.png" class="headerIcon"> Plugin FAQ</p>
    <p class="uploadP" onclick="window.open('http://ibm.bplaced.com/contact/index.php?cdproject=Image%20Uploader%20and%20Browser%20for%20CKEditor&cdlink=<?php echo $link; ?>&cdver='+currentpluginver,'_blank');"><img src="img/cd-icon-bug.png" class="headerIcon"> Report a bug</p>

    <br><h3 class="settingsh3">Version:</h3>
    <p class="uploadP"><img src="img/cd-icon-version.png" class="headerIcon"> <?php echo $currentpluginver; ?></p>

    <br><h3 class="settingsh3">Credits:</h3>
    <p class="uploadP"><img src="img/cd-icon-credits.png" class="headerIcon"> Made with love by Moritz Maleck</p>

    <br><h3 class="settingsh3">Icons:</h3>
    <p class="uploadP" onclick="window.open('https://icons8.com','_blank');"><img src="img/cd-icon-images.png" class="headerIcon"> Icon pack by Icons8</p>

    <br>
</div>

<form id="donate" target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="BTEL7F2ZLR3T6">
</form>

<div id="background" class="background" onclick="$('#imageFullSreen').fadeToggle(300); $('#background').fadeToggle(300);"></div>
<div id="background2" class="background" onclick="$('#uploadImgDiv').fadeToggle(300); $('#background2').fadeToggle(300);"></div>
<div id="background3" class="background" onclick="$('#settingsDiv').fadeToggle(300); $('#background3').fadeToggle(300);"></div>

</body>
</html>
