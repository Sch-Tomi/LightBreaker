<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Light Breaker</title>
    <link rel='shortcut icon' type='image/x-icon' href='img/favicon.ico' />

    <?php
    foreach($this->styles as $file){?>
        <link rel="stylesheet" href="<?php echo $file; ?>" type="text/css" /><?php
    }
     ?>

    <?php
    foreach($this->scripts as $file){?>
        <script src="<?php echo $file; ?>"></script><?php
    }
     ?>

</head>

<body>
    <div id="main">
        <?php
            if($this->get_section("menu") != ""){
                echo $this->get_section("menu");
            }
        ?>
        <!--close menubar-->

        <div  id="site_content">



            <div id="main_content">

                <?php
                    if (isset($data['errors'])) {
                        ?>
                        <div class="errors">
                            <ul>
                                <?php
                                foreach ($data["errors"] as $error) {
                                    ?>
                                    <li><?= $error; ?></li>
                                    <?php
                                }
                                 ?>
                            </ul>
                        </div>

                        <?php
                    }
                 ?>

                <?php
                    echo $this->get_view($view);
                 ?>
            </div>


            <?php
                if($this->get_section("sidebar") != ""){
                    echo $this->get_section("sidebar");
                }
            ?>
            <!--close sidebar_container-->
            <!--close content-->
        </div>
        <!--close site_content-->

    </div>
    <!--close main-->

    <?php
        if($this->get_section("footer") != ""){
            echo $this->get_section("footer");
        }
     ?>
    <!--close footer-->

</body>

</html>
