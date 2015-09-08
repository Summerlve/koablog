<?php

function loadImages() {
    require(__DIR__ . '/pluginconfig.php');
    if(file_exists($useruploadpath)){

        $filesizefinal = 0;
        $count = 0;

        $dir = $useruploadpath;
        $files = glob("$dir*.{jpg,jpeg,png,gif}", GLOB_BRACE);
        usort($files, create_function('$a,$b', 'return filemtime($a) - filemtime($b);'));
        for($i=count($files)-1; $i >= 0; $i--):
            $image = $files[$i];
            $imgname = $bodytag = str_replace($useruploadpath, "", $image);
            $size = getimagesize($image);
            $image_height = $size[0];
            $file_size_byte = filesize($image);
            $file_size_kilobyte = ($file_size_byte/1024);
            $file_size_kilobyte_rounded = round($file_size_kilobyte,1);
            $filesizetemp = $file_size_kilobyte_rounded;
            $filesizefinal = round($filesizefinal + $filesizetemp);
            $count = ++$count;
        ?>

            <div class="fileDiv" onclick="showImage('<?php echo $image; ?>','<?php echo $image_height; ?>');">
                <div class="imgDiv"><img class="fileImg lazy" data-original="<?php echo $image; ?>"></div>
                <p class="fileDescription"><?php echo $imgname; ?></p>
                <p class="fileTime"><?php echo date ("F d Y H:i", filemtime($image)); ?></p>
                <p class="fileTime"><?php echo $filesizetemp; ?> KB</p>
            </div>

        <?php endfor;
        echo "
        <script>
            $( '#finalsize' ).html('$filesizefinal KB');
            $( '#finalcount' ).html('$count');
        </script>
        ";
    } else {
        echo '<div id="folderError">The folder <b>'.$useruploadfolder.'</b> could not be found. Please choose another folder in the settings or <button class="headerBtn" onclick="window.location.href = \'pluginconfig.php?newfoldername='.$useruploadfolder.'\';">create the folder <b>'.$useruploadfolder.'</b></button>.</div>';
    }
}

function pathHistory() {
    require(__DIR__ . '/pluginconfig.php');
    $latestpathes = array_slice($foldershistory, -3);
    $latestpathes = array_reverse($latestpathes);
    foreach($latestpathes as $folder) {
        echo '<p class="pathHistory" onclick="useHistoryPath(\''.$folder.'\');">'.$folder.'</p>';
    }
}
