<?php
session_start();

// Including the plugin config file, don't delete the following row!
require(__DIR__ . '/pluginconfig.php');

if(isset($_SESSION['username'])){

    $imgSrc = $_GET["img"];

    // ckeck if file exists
    if(file_exists($imgSrc)){
        // check if file is available to delete
        if (is_writable($imgSrc)) {
            // check if file is a sytem file
            $imgBasepath = pathinfo($imgSrc);
            $imgBasename = $imgBasepath['basename'];
            if(!in_array($imgBasename, $sy_icons)){
                // check if the selected file is in the upload folder
                $imgDirname = $imgBasepath['dirname'];
                $preExamplePath = "$useruploadpath/test.txt";
                $tmpUserUPath = pathinfo($preExamplePath);
                $useruploadpathDirname = $tmpUserUPath['dirname'];
                if($imgDirname == $useruploadpathDirname){
                    // check if file is an image
                    $a = getimagesize($imgSrc);
                    $image_type = $a[2];
                    if(in_array($image_type , array(IMAGETYPE_GIF , IMAGETYPE_JPEG ,IMAGETYPE_PNG))) {
                        unlink(__DIR__ . '/' . $imgSrc);
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    } else {
                        echo '
                            <script>
                            alert("You can only delete images. Please try again or delete another image.");
                            history.back();
                            </script>
                        ';
                    }
                } else {
                    echo '
                        <script>
                        alert("The file you want to delete is not in the selected upload folder.");
                        history.back();
                        </script>
                    ';
                }
            } else {
                echo '
                    <script>
                    alert("You cannot delete sytem files. Please try again or choose another image.");
                    history.back();
                    </script>
                ';
            }
        } else {
            echo '
                <script>
                alert("The selected file cannot be deleted. Please try again or choose another image. Note: Don not forget to set CHMOD writable permission (0777) to the imageuploader folder on your server.");
                history.back();
                </script>
            ';
        }
    } else {
        echo '
            <script>
            alert("The file you want to delete does not exist. Please try again or choose another image.");
            history.back();
            </script>
        ';
    }

}
